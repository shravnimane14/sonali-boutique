import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getOwnerProfile } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { removeImage, storeImage } from '@/lib/uploads';

export async function GET() {
  try {
    return NextResponse.json((await getOwnerProfile()) || { id: 1, name: '', biography: '', image_url: null });
  } catch {
    return NextResponse.json({ error: 'Could not load owner profile.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const form = await req.formData();
    const name = String(form.get('name') || '').trim().slice(0, 190);
    const biography = String(form.get('biography') || '').trim();
    const old = await getOwnerProfile();
    let imageUrl = old?.image_url || null;
    let publicId = old?.image_public_id || null;
    const remove = String(form.get('remove_image') || 'false') === 'true';

    if (remove) {
      await removeImage(publicId, old?.image_url || null);
      imageUrl = null;
      publicId = null;
    }

    const file = form.get('image');
    if (file instanceof File && file.size > 0) {
      const stored = await storeImage(file, 'owner');
      await removeImage(old?.image_public_id || null, old?.image_url || null);
      imageUrl = stored.url;
      publicId = stored.publicId;
    }

    const { error } = await supabase
      .from('owner_profile')
      .upsert({ id: 1, name, biography, image_url: imageUrl, image_public_id: publicId, updated_at: new Date().toISOString() });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Owner update failed.' }, { status: 400 });
  }
}
