'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type Item = {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  is_new_arrival: number;
};

type Owner = {
  name?: string;
  biography?: string;
  image_url?: string | null;
} | null;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const gallery = ['/gallery/12.jpeg', '/gallery/4.jpeg', '/gallery/7.jpeg', '/gallery/10.jpeg', '/gallery/14.jpeg', '/gallery/16.jpeg'];
const occasions = [
  { title: 'Wedding', image: '/gallery/3..jpeg', text: 'Bridal colour, heirloom borders.' },
  { title: 'Festive', image: '/gallery/5.jpeg', text: 'Rich silk for glowing evenings.' },
  { title: 'Celebration', image: '/gallery/20.jpeg', text: 'Joyful drapes, made to move.' },
  { title: 'Everyday', image: '/gallery/8.jpeg', text: 'Easy elegance for real life.' },
];

export default function HomeExperience({ items, owner }: { items: Item[]; owner: Owner }) {
  const featured = items.slice(0, 6);
  const hero = '/gallery/1.jpeg';
  const heroName = items[0]?.name || 'Rangoli Silk';

  return <main className="luxury-home">
    <section className="luxury-hero">
      <div className="luxury-hero-copy">
        <motion.div initial="hidden" animate="visible" variants={reveal}>
          <div className="luxury-kicker">SONALI BOUTIQUE</div>
          <h1>Elegance woven<br /><em>into every drape.</em></h1>
          <p>Thoughtfully chosen sarees for the moments you want to remember, from our boutique in Dhubulia.</p>
          <div className="luxury-actions"><a className="luxury-gold-button" href="https://wa.me/918900622771" target="_blank" rel="noreferrer">Contact Boutique <span>↗</span></a><Link className="luxury-line-link" href="/collection">Explore collection <span>↗</span></Link></div>
        </motion.div>
        <div className="luxury-scroll">Scroll to discover <span>↓</span></div>
      </div>
      <motion.div className="luxury-hero-image" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }}>
        <img src={hero} alt="Saree 01 from Sonali Boutique" />
        <div className="luxury-hero-note">{heroName} <small>Featured drape</small></div>
      </motion.div>
    </section>

    <motion.section className="luxury-intro" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
      <div className="luxury-section-index">01 / Our point of view</div>
      <div><h2>Where tradition meets<br /><em>timeless elegance.</em></h2><p>Sonali Boutique brings together sarees chosen for colour, craft and character. Every piece is an invitation to feel beautifully yourself.</p></div>
    </motion.section>

    <section className="luxury-section luxury-collection-section">
      <motion.div className="luxury-heading-row" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><div><div className="luxury-kicker dark">02 / Featured collection</div><h2>Pieces worth<br /><em>pausing for.</em></h2></div><Link className="luxury-line-link dark-link" href="/collection">View all sarees <span>↗</span></Link></motion.div>
      <div className="luxury-product-grid">{featured.map((item, index) => <motion.article className={`luxury-product luxury-product-${index + 1}`} key={item.id} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ delay: index * 0.08 }}><Link href="/collection"><div className="luxury-product-image"><img src={item.image_url} alt={`${item.name} at Sonali Boutique`} /></div><div className="luxury-product-meta"><span>{item.category}{item.is_new_arrival ? ' · New arrival' : ''}</span><h3>{item.name}</h3><p>{item.description}</p></div></Link><a className="luxury-enquire" href={`https://wa.me/918900622771?text=Hello%20Sonali%20Boutique%2C%20I%20am%20interested%20in%20${encodeURIComponent(item.name)}`} target="_blank" rel="noreferrer">Enquire now <span>↗</span></a></motion.article>)}</div>
    </section>

    <section className="luxury-founder">
      <motion.div className="luxury-founder-image" initial="hidden" whileInView="visible" variants={reveal} viewport={{ once: true, amount: 0.2 }}><img src={owner?.image_url || '/owner/owner.jpeg'} alt="Sonali Pal, founder of Sonali Boutique" /></motion.div>
      <motion.div className="luxury-founder-copy" initial="hidden" whileInView="visible" variants={reveal} viewport={{ once: true, amount: 0.2 }}><div className="luxury-kicker">03 / The woman behind the boutique</div><h2>Meet<br /><em>Sonali Pal.</em></h2><blockquote>“Every saree should feel like it was waiting for you.”</blockquote><p>{owner?.biography || 'Every saree is chosen with an eye for elegance, beauty and individuality.'}</p><div className="luxury-signature">Sonali Pal</div><Link className="luxury-line-link" href="/about">Read our story <span>↗</span></Link></motion.div>
    </section>

    <section className="luxury-section luxury-values"><motion.div className="luxury-heading-row" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><div><div className="luxury-kicker dark">04 / Our promise</div><h2>Chosen with<br /><em>intention.</em></h2></div><p>The details matter. From the first thread to the final drape, we choose with care.</p></motion.div><div className="luxury-value-grid">{[['01', 'Carefully curated', 'Pieces chosen for quality, colour and character.'], ['02', 'Timeless style', 'Traditional craft with a point of view that feels now.'], ['03', 'Personal experience', 'Honest guidance when you find the one.'], ['04', 'Occasion ready', 'A beautiful answer for every gathering.']].map(([number, title, text]) => <motion.div key={number} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}><b>{number}</b><h3>{title}</h3><p>{text}</p></motion.div>)}</div></section>

    <section className="luxury-section luxury-occasions"><motion.div className="luxury-heading-row" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><div><div className="luxury-kicker dark">05 / Find your moment</div><h2>For every<br /><em>occasion.</em></h2></div></motion.div><div className="luxury-occasion-grid">{occasions.map((occasion) => <Link className="luxury-occasion" href="/collection" key={occasion.title}><img src={occasion.image} alt={`${occasion.title} sarees`} /><div><h3>{occasion.title}</h3><p>{occasion.text}</p><span>Explore <b>↗</b></span></div></Link>)}</div></section>

    <section className="luxury-section luxury-gallery"><motion.div className="luxury-heading-row" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><div><div className="luxury-kicker dark">06 / The details</div><h2>Details worth<br /><em>remembering.</em></h2></div><p>Texture, border, colour and the little things that make a drape yours.</p></motion.div><div className="luxury-gallery-grid">{gallery.map((image, index) => <motion.img key={image} src={image} alt={`Saree detail ${index + 1}`} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} />)}</div></section>

    <section className="luxury-contact"><div className="luxury-contact-copy"><div className="luxury-kicker">07 / Visit the boutique</div><h2>Find your<br /><em>perfect drape.</em></h2><p>Come by Sonali Boutique in Dhabalia, West Bengal, or message us for a private saree conversation.</p><div className="luxury-contact-links"><a href="tel:+918900622771">089006 22771</a><a href="mailto:sonalipal1556@gmail.com">sonalipal1556@gmail.com</a><a href="https://www.google.com/maps/search/?api=1&query=Sonali%20Boutique%2C%20Dhubulia%2C%20West%20Bengal%20741139" target="_blank" rel="noreferrer">Get directions ↗</a></div><div className="luxury-rating"><strong>★★★★★</strong><span>4.5 Google rating · Based on 4 reviews</span></div></div><div className="luxury-map"><iframe title="Sonali Boutique location map" loading="lazy" src="https://www.google.com/maps?q=Sonali%20Boutique%2C%20Dhubulia%2C%20West%20Bengal%20741139&output=embed" /></div></section>
  </main>;
}
