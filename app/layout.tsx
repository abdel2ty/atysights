import './globals.css';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Progress from '@/components/Progress';
import TabBar from '@/components/TabBar';
import { LINKEDIN, EMAIL, LOGO } from '@/lib/site';
const font = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700','800'], display: 'swap', variable: '--font' });
export const metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), openGraph: { siteName: 'Atysights', type: 'website' }, title: { default: 'Atysights', template: '%s | Atysights' }, description: 'Understand your business beyond the numbers.', icons: { icon: LOGO, apple: LOGO } };
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' as const, themeColor: '#0B5FFF' };
const ext = { target: '_blank', rel: 'noopener noreferrer' };
export default function L({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={`${font.variable} pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0`}><Progress/>
    <header className="mx-auto flex max-w-6xl items-center px-6 pb-2 pt-[calc(.75rem+env(safe-area-inset-top))] md:py-2">
      <Link href="/" aria-label="Atysights home"><img src={LOGO} alt="Atysights" className="h-12 w-auto md:h-16"/></Link>
      <nav className="hidden flex-1 items-center gap-6 text-sm font-semibold md:ml-10 md:flex"><Link className="hover:text-blue" href="/services">Services</Link><Link className="hover:text-blue" href="/projects">Work</Link><Link className="hover:text-blue" href="/about">About</Link><a className="hover:text-blue" href={LINKEDIN} {...ext}>LinkedIn</a><Link className="ml-auto bg-blue px-4 py-2 text-white transition-colors hover:bg-ink" href="/contact">Contact us</Link></nav>
      <a href={LINKEDIN} {...ext} aria-label="LinkedIn" className="ml-auto grid h-10 w-10 place-items-center bg-blue text-white md:hidden"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.75 9.75h3.8v1.6h.06c.53-1 1.83-2 3.77-2 4 0 4.75 2.6 4.75 6V21h-4v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4z"/></svg></a>
    </header>{children}
    <footer className="mt-16 border-t border-rule md:mt-24"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-8">
      <div className="flex items-center gap-4"><img src={LOGO} alt="Atysights" className="h-10 w-auto"/><p className="max-w-xs text-sm text-mute">Business intelligence that explains the numbers.</p></div>
      <div className="flex flex-wrap items-center gap-5 text-sm font-semibold"><a href={`mailto:${EMAIL}`} className="hover:text-blue">{EMAIL}</a><a href={LINKEDIN} {...ext} className="bg-blue px-4 py-2 text-white transition-colors hover:bg-ink">LinkedIn</a></div></div>
      <p className="mx-auto max-w-6xl px-6 pb-6 text-xs text-mute">© {new Date().getFullYear()} Atysights</p></footer>
    <TabBar/></body></html>);
}
