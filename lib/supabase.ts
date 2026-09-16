import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && serviceRoleKey);

export const supabase = createClient(url || 'https://demo.invalid', serviceRoleKey || 'demo-key', {
  auth: { autoRefreshToken: false, persistSession: false },
});

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'sonali-gallery';

export async function signedImageUrl(path: string | null, fallback?: string | null) {
  if (!path) return fallback || null;
  if (/^https?:\/\//i.test(path)) return path;
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, 60 * 60 * 24 * 7);
  if (error) return fallback || null;
  return data.signedUrl;
}

export async function withGalleryImageUrl<T extends { image_url?: string | null; image_public_id?: string | null }>(item: T) {
  return { ...item, image_url: await signedImageUrl(item.image_public_id || item.image_url || null, item.image_url) };
}
