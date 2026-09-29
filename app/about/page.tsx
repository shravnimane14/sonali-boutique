import { getOwnerProfile as fetchOwnerProfile } from '@/lib/db';

async function getOwnerProfile() {
  return (await fetchOwnerProfile()) ?? {
    id: 0,
    name: '',
    biography: '',
    image_url: null,
    image_public_id: null,
  };
}
export const dynamic='force-dynamic';
export default async function About(){const owner=await getOwnerProfile()||{};return <main><section className="page-hero"><div className="container"><div className="eyebrow">Our story</div><h1>About Sonali Butik</h1><p className="section-copy">A warm, personal approach to sarees and women's fashion in Dhubulia.</p></div></section><section className="section"><div className="container owner-grid"><div className="owner-photo">{owner.image_url?<img src={owner.image_url} alt={owner.name?`Portrait of ${owner.name}`:'Sonali Butik owner'}/>:<div><div className="eyebrow">Owner portrait</div><p>Add the real owner photograph from the client gallery.</p></div>}</div><div className="owner-copy"><div className="eyebrow">The woman behind the boutique</div><h2 className="section-title">Meet the Owner</h2>{owner.name&&<h3 className="serif" style={{fontSize:'1.7rem'}}>{owner.name}</h3>}<p>{owner.biography||'At Sonali Butik, every saree is chosen with an eye for elegance, beauty and individuality. The boutique is built around a simple belief — every customer deserves to find something that feels truly special.'}</p><p>Explore the current collection and connect directly with the boutique whenever a saree catches your eye.</p></div></div></section><section className="section feature"><div className="container"><div className="eyebrow">What you can expect</div><h2 className="section-title">Simple, personal, and style-led.</h2><div className="feature-list"><div className="feature-item"><strong>Curated Saree Collection</strong><span>Real photographs from the boutique's current gallery.</span></div><div className="feature-item"><strong>Personal Customer Experience</strong><span>Ask directly about a saree before you decide.</span></div><div className="feature-item"><strong>Traditional & Contemporary Styles</strong><span>Browse the styles that are actually part of the current collection.</span></div><div className="feature-item"><strong>Easy WhatsApp Enquiries</strong><span>Fast, direct customer communication.</span></div></div></div></section></main>}
