import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { removeImage, storeImage } from '@/lib/uploads';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = Number((await params).id);
  try {
    const form = await req.formData();
    const { data: old, error: readError } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (readError) throw readError;
    if (!old) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const name = String(form.get('name') ?? old.name).trim().slice(0, 190);
    const category = String(form.get('category') ?? old.category).trim().slice(0, 120);
    const description = String(form.get('description') ?? old.description).trim();
    const isNew = String(form.get('is_new_arrival') ?? old.is_new_arrival) === 'true';
    const published = String(form.get('published') ?? old.published) === 'true';
    let imageUrl = old.image_url;
    let publicId = old.image_public_id;

    const file = form.get('image');
    if (file instanceof File && file.size > 0) {
      const stored = await storeImage(file, 'sarees');
      imageUrl = stored.url;
      publicId = stored.publicId;
      await removeImage(old.image_public_id, old.image_url);
    }

    const { error } = await supabase
      .from('gallery_items')
      .update({ name, category, description, image_url: imageUrl, image_public_id: publicId, is_new_arrival: isNew, published, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Update failed.' }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = Number((await params).id);
  const { data: item, error: readError } = await supabase
    .from('gallery_items')
    .select('image_public_id,image_url')
    .eq('id', id)
    .maybeSingle();
  if (readError) return NextResponse.json({ error: readError.message }, { status: 400 });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { error } = await supabase.from('gallery_items').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await removeImage(item.image_public_id, item.image_url);
  return NextResponse.json({ ok: true });
}
