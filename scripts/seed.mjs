import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'sonali-gallery';
if (!url || !serviceRoleKey) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');

const supabase = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
const email = (process.env.ADMIN_EMAIL || 'owner@sonaliboutique.local').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || 'change-this-before-production';
const hash = await bcrypt.hash(password, 12);

const { error: userError } = await supabase.from('users').upsert({ email, password_hash: hash, role: 'admin' }, { onConflict: 'email' });
if (userError) throw userError;

const { data: owner, error: ownerReadError } = await supabase.from('owner_profile').select('id').eq('id', 1).maybeSingle();
if (ownerReadError) throw ownerReadError;
if (!owner) {
  const { error } = await supabase.from('owner_profile').insert({
    id: 1,
    name: '',
    biography: 'At Sonali Boutique, every saree is chosen with an eye for elegance, beauty and individuality. The boutique is built around a simple belief — every customer deserves to find something that feels truly special.'
  });
  if (error) throw error;
}

const { count, error: countError } = await supabase.from('gallery_items').select('*', { count: 'exact', head: true });
if (countError) throw countError;

if ((count || 0) === 0) {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  const files = (await fs.readdir(galleryDir))
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f) && f !== 'sonali_contact_sheet.jpg')
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = path.extname(file).toLowerCase() === '.jpg' ? 'jpg' : path.extname(file).toLowerCase().replace('.', '');
    const storagePath = `sarees/${randomUUID()}.${ext}`;
    const bytes = await fs.readFile(path.join(galleryDir, file));
    const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(storagePath, bytes, { contentType, cacheControl: '31536000', upsert: false });
    if (uploadError) throw uploadError;

    const { error: insertError } = await supabase.from('gallery_items').insert({
      name: `Saree ${String(i + 1).padStart(2, '0')}`,
      category: 'Sarees',
      description: 'Contact Sonali Boutique for fabric, price and availability details.',
      image_url: storagePath,
      image_public_id: storagePath,
      sort_order: i,
      is_new_arrival: false,
      published: true,
    });
    if (insertError) throw insertError;
  }
}

console.log(`Seed complete. Admin: ${email}`);
console.log(`Storage bucket: ${bucket}`);
