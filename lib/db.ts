import { isSupabaseConfigured, signedImageUrl } from './supabase';
import { supabase } from './supabase';

const localGalleryFiles = [
  '1.jpeg', '2.jpeg', '3..jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg',
  '10.jpeg', '11.jpeg', '12.jpeg', '13.jpeg', '14.jpeg', '15.jpeg', '16.jpeg',
  '17.jpeg', '18.jpeg', '20.jpeg', '21.jpeg', '22.jpeg', '23.jpeg', '24.jpeg',
  '25.jpeg', '26.jpeg', '27.jpeg',
];

const localGalleryNames = [
  'Rangoli Silk', 'Neelambari Grace', 'Gulnaar Banarasi', 'Mehfil Zari', 'Rani Gulab', 'Kesar Katha', 'Madhuri Resham', 'Chandni Booti',
  'Mor Pankh Silk', 'Padma Rekha', 'Sonali Katan', 'Mogra Motif', 'Rajrani Weave', 'Kashish Border', 'Aabha Tissue',
  'Genda Phool', 'Jamuna Jaal', 'Mayura Pallu', 'Indrani Silk', 'Bela Noor', 'Koyal Katha', 'Amrapali Zari', 'Vasanti Loom',
  'Champa Resham', 'Gulabi Chandni',
];

const localGallery = localGalleryFiles.map((file, index) => ({
  id: index + 1,
  name: localGalleryNames[index],
  category: 'Sarees',
  description: 'Contact Sonali Boutique for fabric, price and availability details.',
  image_url: `/gallery/${encodeURIComponent(file)}`,
  image_public_id: null,
  sort_order: index,
  is_new_arrival: index < 4 ? 1 : 0,
  published: 1,
}));

const localOwner = {
  id: 1,
  name: 'Sonali Boutique',
  biography: 'At Sonali Boutique, every saree is chosen with an eye for elegance, beauty and individuality. The boutique is built around a simple belief — every customer deserves to find something that feels truly special.',
  image_url: '/owner/owner.jpeg',
  image_public_id: null,
};

export interface OwnerProfile {
  id: number;
  name: string;
  biography: string;
  image_url: string | null;
  image_public_id: string | null;
}

async function withSignedImage<T extends { image_url?: string | null; image_public_id?: string | null }>(item: T) {
  return { ...item, image_url: await signedImageUrl(item.image_public_id || item.image_url || null, item.image_url) };
}

export async function getPublishedGallery(limit?: number) {
  if (!isSupabaseConfigured) return typeof limit === 'number' ? localGallery.slice(0, limit) : localGallery;
  let query = supabase
    .from('gallery_items')
    .select('id,name,category,description,image_url,image_public_id,sort_order,is_new_arrival,published')
    .eq('published', true)
    .order('is_new_arrival', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });
  if (typeof limit === 'number') query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return Promise.all((data || []).map(withSignedImage));
}

export async function getOwnerProfile(): Promise<OwnerProfile | null> {
  if (!isSupabaseConfigured) return localOwner;
  const { data, error } = await supabase
    .from('owner_profile')
    .select('id,name,biography,image_url,image_public_id')
    .eq('id', 1)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return withSignedImage<OwnerProfile>(data);
}

export async function getGalleryForAdmin() {
  if (!isSupabaseConfigured) return localGallery;
  const { data, error } = await supabase
    .from('gallery_items')
    .select('id,name,category,description,image_url,image_public_id,sort_order,is_new_arrival,published')
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });
  if (error) throw error;
  return Promise.all((data || []).map(withSignedImage));
}
