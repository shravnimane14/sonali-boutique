import Link from 'next/link';
import { getOwnerProfile, getPublishedGallery } from '@/lib/db';
import CollectionCard, { Item } from '@/components/CollectionCard';
import ScrollReveal from '@/components/ScrollReveal';
import HomeExperience from '@/components/HomeExperience';

export const dynamic = 'force-dynamic';

export default async function Home() {
	const [items, owner] = await Promise.all([getPublishedGallery(6), getOwnerProfile()]);
	return <HomeExperience items={items as never[]} owner={owner} />;
}

async function LegacyHome() {
	const [items, owner] = await Promise.all([
		getPublishedGallery(4) as Promise<Item[]>,
		getOwnerProfile(),
	]);
	const hero = '/gallery/1.jpeg';

	return <main className="editorial-home">
		<ScrollReveal />
		<section className="editorial-hero">
			<div className="editorial-hero-copy reveal">
				<div className="eyebrow editorial-eyebrow">Sonali Butik · Dhubulia</div>
				<h1>Find your<br /><em>perfect drape.</em></h1>
				<p>Thoughtfully chosen sarees for the moments you want to remember.</p>
				<div className="hero-actions">
					<Link className="editorial-button editorial-button-light" href="/collection">Explore collection</Link>
					<a className="editorial-text-link" href="https://wa.me/916297737301" target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a>
				</div>
				<div className="editorial-location"><span>●</span> Dhubulia, West Bengal</div>
			</div>
			<div className="editorial-hero-art">
				<img src={hero} alt="Saree 01 from Sonali Butik" />
				<div className="editorial-location-card"><span>●</span><strong>Dhubulia</strong><small>West Bengal, India</small><i>FFV2+QX6</i></div>
				<div className="editorial-art-label">Saree 01<br /><small>Featured drape · 01</small></div>
			</div>
		</section>

		<section className="editorial-intro scroll-target">
			<div className="editorial-narrow-label">01 / Our point of view</div>
			<div><h2>Where tradition meets<br /><em>intention.</em></h2><p>Every saree in our collection is selected for its colour, craft and the feeling it leaves behind.</p></div>
		</section>

		<section className="editorial-collection scroll-target">
			<div className="editorial-section-head"><div><div className="eyebrow">02 / The collection</div><h2>Our featured<br /><em>edit.</em></h2></div><Link className="editorial-text-link editorial-dark-link" href="/collection">View all sarees <span>↗</span></Link></div>
			{items.length > 0 && <div className="editorial-grid">{items.slice(0, 3).map((item, index) => <div className={`editorial-card-wrap editorial-card-${index + 1}`} key={item.id}><CollectionCard item={item} /></div>)}</div>}
		</section>

		<section className="editorial-intention scroll-target">
			<div className="editorial-section-head"><div><div className="eyebrow">03 / Our promise</div><h2>Chosen with<br /><em>intention.</em></h2></div><p>The details matter. From the first thread to the final drape, we choose with care.</p></div>
			<div className="editorial-values"><div><b>01</b><h3>Carefully curated</h3><p>Pieces chosen for quality, colour and character.</p></div><div><b>02</b><h3>Timeless style</h3><p>Traditional craft with a point of view that feels now.</p></div><div><b>03</b><h3>Personal experience</h3><p>Honest guidance when you find the one.</p></div><div><b>04</b><h3>One conversation</h3><p>Message us directly for price and availability.</p></div></div>
		</section>

		<section className="editorial-owner scroll-target">
			<div className="editorial-owner-image">{owner?.image_url && <img src={owner.image_url} alt="Portrait of Sonali Butik owner" />}</div>
			<div><div className="eyebrow">04 / The woman behind the boutique</div><h2>Made personal,<br /><em>by Sonali.</em></h2><p>{owner?.biography || 'Every saree is chosen with an eye for elegance, beauty and individuality.'}</p><Link className="editorial-text-link editorial-dark-link" href="/about">Discover our story <span>↗</span></Link></div>
		</section>
	</main>;
}
