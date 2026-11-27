'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Progress from '@/components/Progress';
import TabBar from '@/components/TabBar';
import { LINKEDIN, EMAIL, LOGO } from '@/lib/site';
export default function Shell({ children }: { children: React.ReactNode }) {
  if (usePathname().startsWith('/admin')) return <>{children}</>;
  return (<div className="ds pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0"><Progress />
    <header className="hd"><div className="in"><Link href="/" aria-label="Atysights home"><img src={LOGO} alt="Atysights" style={{ height: 34, width: 'auto' }} /></Link>
      <nav><Link className="lk" href="/projects">Work</Link><Link className="lk" href="/services">Services</Link><Link className="lk" href="/about">About</Link><Link className="cta" href="/contact">Contact</Link></nav></div></header>
    {children}
    <footer className="wrap"><div className="tb">
      <div><img src={LOGO} alt="Atysights" style={{ height: 30, width: 'auto' }} /><p className="mono" style={{ marginTop: 12 }}>Business systems, data and AI</p></div>
      <div><p className="mono">Contact</p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
      <div><p className="mono">Elsewhere</p><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
      <div><p className="mono">Rev.</p><b>{new Date().getFullYear()}</b></div></div>
      <p className="mono" style={{ padding: '14px 0 28px' }}>© Atysights. Egypt and worldwide.</p></footer>
    <TabBar /></div>);
}
