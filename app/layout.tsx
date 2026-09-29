import type { Metadata } from 'next';
import './globals.css';
import SiteShell from '@/components/SiteShell';
export const metadata: Metadata={title:'Sonali Butik | Sarees & Women’s Fashion in Dhubulia',description:'Explore sarees and women’s fashion from Sonali Butik in Dhubulia, West Bengal. Browse our collection and contact us on WhatsApp for enquiries.',icons:{icon:'/brand/icon.png'},openGraph:{title:'Sonali Butik | Sarees & Women’s Fashion in Dhubulia',description:'Elegant sarees and women’s fashion from Sonali Butik, Dhubulia.',type:'website'}};
export default function RootLayout({children}:{children:import('react').ReactNode}){return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>}
