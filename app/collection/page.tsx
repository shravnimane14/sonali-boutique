import { getPublishedGallery } from '@/lib/db';
import CollectionBrowser from './CollectionBrowser';
import {Item} from '@/components/CollectionCard';
export const dynamic='force-dynamic';
export default async function Collection(){const rows=await getPublishedGallery();return <main><section className="page-hero"><div className="container"><div className="eyebrow">Sonali Butik</div><h1>Collection</h1><p className="section-copy">A visual look at the boutique's current saree collection. For price, fabric and availability, enquire directly on WhatsApp.</p></div></section><section className="section"><div className="container"><CollectionBrowser items={rows as Item[]}/></div></section></main>}
