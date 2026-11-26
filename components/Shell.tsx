'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Progress from '@/components/Progress';
import TabBar from '@/components/TabBar';
import { LINKEDIN, EMAIL, LOGO } from '@/lib/site';
const ext = { target: '_blank', rel: 'noopener noreferrer' };
export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname(); const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 8); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  if (path.startsWith('/admin')) return <>{children}</>;
  return (<div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0"><Progress/>
    <div className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${sc ? 'shadow-[0_1px_0_#E3E6EE]' : ''}`}><header className={`mx-auto flex max-w-6xl items-center px-6 pb-2 pt-[calc(1.25rem+env(safe-area-inset-top))] transition-all duration-300 md:pb-2 ${sc ? 'md:pt-2' : 'md:pt-5'}`}>
      <Link href="/" aria-label="Atysights home"><img src={LOGO} alt="Atysights" className="h-10 w-auto md:h-11"/></Link>
      <nav className="hidden flex-1 items-center gap-6 text-sm font-semibold md:ml-10 md:flex"><Link className="nl hover:text-blue" href="/services">Services</Link><Link className="nl hover:text-blue" href="/projects">Work</Link><Link className="nl hover:text-blue" href="/about">About</Link><Link className="ml-auto bg-blue px-4 py-2 text-white transition-colors hover:bg-ink" href="/contact">Contact us</Link></nav>
    </header></div>{children}
    <footer className="mt-16 border-t border-rule md:mt-24"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-8">
      <div className="flex items-center gap-4"><img src={LOGO} alt="Atysights" className="h-10 w-auto"/><p className="max-w-xs text-sm text-mute">Business intelligence for owners in Egypt and worldwide.</p></div>
      <div className="flex flex-wrap items-center gap-5 text-sm font-semibold"><a href={`mailto:${EMAIL}`} className="nl hover:text-blue">{EMAIL}</a><a href={LINKEDIN} {...ext} className="bg-blue px-4 py-2 text-white transition-colors hover:bg-ink">LinkedIn</a></div></div>
      <p className="mx-auto max-w-6xl px-6 pb-6 text-xs text-mute">© {new Date().getFullYear()} Atysights</p></footer>
    <TabBar/></div>);
}
