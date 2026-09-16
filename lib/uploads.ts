import { randomUUID } from 'node:crypto';
import { STORAGE_BUCKET, supabase } from './supabase';

const MAX = 6 * 1024 * 1024;
const ALLOWED = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
]);

export async function storeImage(file: File, folder: string) {
  if (!ALLOWED.has(file.type)) throw new Error('Only JPG, JPEG, PNG and WEBP images are allowed.');
  if (file.size > MAX) throw new Error('Image must be 6 MB or smaller.');

  const ext = ALLOWED.get(file.type)!;
  const storagePath = `${folder}/${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, bytes, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: false,
    });

  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return { url: storagePath, publicId: storagePath };
}

export async function removeImage(publicId: string | null, url: string | null) {
  const path = publicId || (url && !/^https?:\/\//i.test(url) ? url : null);
  if (!path) return;
  try {
    await supabase.storage.from(STORAGE_BUCKET).remove([path]);
  } catch {
    // Deleting the database record should not fail because an old image is already missing.
  }
}
