'use client';
import {usePathname} from 'next/navigation';
import SiteNav from './SiteNav';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
export default function SiteShell({children}:{children:import('react').ReactNode}){const p=usePathname();const privateArea=p.startsWith('/client-gallery')||p.startsWith('/admin');return <>{!privateArea&&<SiteNav/>}{children}{!privateArea&&<><WhatsAppFloat/><Footer/></>}</>}
