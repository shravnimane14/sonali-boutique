import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { ids } = await req.json();
  if (!Array.isArray(ids)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  for (let i = 0; i < ids.length; i++) {
    const { error } = await supabase.from('gallery_items').update({ sort_order: i }).eq('id', Number(ids[i]));
    if (error) return NextResponse.json({ error: 'Reorder failed.' }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
