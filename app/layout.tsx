import './globals.css';
import Link from 'next/link';
import { existsSync } from 'fs';
import path from 'path';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Progress from '@/components/Progress';
import TabBar from '@/components/TabBar';
const font = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap', variable: '--font' });
const logo = ['png','svg','webp','jpg'].map(e => `logo.${e}`).find(f => existsSync(path.join(process.cwd(), 'public', f)));
export const metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), openGraph: { siteName: 'Atysights', type: 'website' }, title: { default: 'Atysights', template: '%s | Atysights' }, description: 'Understand your business beyond the numbers.', icons: logo ? { icon: `/${logo}`, apple: `/${logo}` } : undefined };
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' as const, themeColor: '#0B5FFF' };
export default function L({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={`${font.variable} pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0`}><Progress/>
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-3 pt-[calc(1rem+env(safe-area-inset-top))] md:py-3">
      <Link href="/" aria-label="ATYSIGHTS home" className="text-xl font-extrabold tracking-tight">{logo ? <img src={`/${logo}`} alt="ATYSIGHTS" className="h-12 w-auto md:h-16"/> : <>ATY<span className="text-blue">SIGHTS</span></>}</Link>
      <nav className="hidden flex-1 items-center gap-6 text-sm font-semibold md:ml-10 md:flex"><Link className="hover:text-blue" href="/services">Services</Link><Link className="hover:text-blue" href="/projects">Work</Link><Link className="hover:text-blue" href="/about">About</Link><Link className="ml-auto bg-blue px-4 py-2 text-white transition-colors hover:bg-ink" href="/contact">Contact us</Link></nav>
    </header>{children}
    <footer className="mt-16 bg-ink px-6 py-8 text-sm text-white/60 md:mt-24"><div className="mx-auto max-w-6xl">© ATYSIGHTS. Understand your business beyond the numbers.</div></footer>
    <TabBar/></body></html>);
}
