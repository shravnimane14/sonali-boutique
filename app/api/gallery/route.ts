import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getGalleryForAdmin } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { storeImage } from '@/lib/uploads';

export async function GET() {
  try {
    return NextResponse.json(await getGalleryForAdmin());
  } catch {
    return NextResponse.json({ error: 'Could not load gallery.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const form = await req.formData();
    const file = form.get('image');
    if (!(file instanceof File)) throw new Error('Image is required.');
    const name = String(form.get('name') || 'Untitled Saree').trim().slice(0, 190);
    const category = String(form.get('category') || 'Sarees').trim().slice(0, 120);
    const description = String(form.get('description') || 'Contact Sonali Boutique for fabric, price and availability details.').trim();
    const isNew = String(form.get('is_new_arrival') || 'false') === 'true';
    const published = String(form.get('published') || 'true') === 'true';

    const stored = await storeImage(file, 'sarees');
    const { data: lastRows, error: orderError } = await supabase
      .from('gallery_items')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1);
    if (orderError) throw orderError;
    const nextOrder = (lastRows?.[0]?.sort_order ?? -1) + 1;

    const { data, error } = await supabase
      .from('gallery_items')
      .insert({
        name,
        category,
        description,
        image_url: stored.url,
        image_public_id: stored.publicId,
        sort_order: nextOrder,
        is_new_arrival: isNew,
        published,
      })
      .select('id,name,category,description,image_url,image_public_id,sort_order,is_new_arrival,published')
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Upload failed.' }, { status: 400 });
  }
}
