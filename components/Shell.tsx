'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Progress from '@/components/Progress';
import TabBar from '@/components/TabBar';
import { LINKEDIN, EMAIL, LOGO } from '@/lib/site';
const ext = { target: '_blank', rel: 'noopener noreferrer' };
export default function Shell({ children }: { children: React.ReactNode }) {
  if (usePathname().startsWith('/admin')) return <>{children}</>;
  return (<div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0"><Progress/>
    <header className="mx-auto flex max-w-6xl items-center px-6 pb-2 pt-[calc(1.25rem+env(safe-area-inset-top))] md:pb-2 md:pt-5">
      <Link href="/" aria-label="Atysights home"><img src={LOGO} alt="Atysights" className="h-10 w-auto md:h-11"/></Link>
      <nav className="hidden flex-1 items-center gap-6 text-sm font-semibold md:ml-10 md:flex"><Link className="hover:text-blue" href="/services">Services</Link><Link className="hover:text-blue" href="/projects">Work</Link><Link className="hover:text-blue" href="/about">About</Link><Link className="ml-auto bg-blue px-4 py-2 text-white transition-colors hover:bg-ink" href="/contact">Contact us</Link></nav>
    </header>{children}
    <footer className="mt-16 border-t border-rule md:mt-24"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-8">
      <div className="flex items-center gap-4"><img src={LOGO} alt="Atysights" className="h-10 w-auto"/><p className="max-w-xs text-sm text-mute">Business intelligence for owners in Egypt and worldwide.</p></div>
      <div className="flex flex-wrap items-center gap-5 text-sm font-semibold"><a href={`mailto:${EMAIL}`} className="hover:text-blue">{EMAIL}</a><a href={LINKEDIN} {...ext} className="bg-blue px-4 py-2 text-white transition-colors hover:bg-ink">LinkedIn</a></div></div>
      <p className="mx-auto max-w-6xl px-6 pb-6 text-xs text-mute">© {new Date().getFullYear()} Atysights</p></footer>
    <TabBar/></div>);
}
