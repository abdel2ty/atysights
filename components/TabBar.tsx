'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const I = { home: 'M3 11l9-8 9 8v10h-6v-6h-6v6H3z', services: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z', work: 'M5 20V10M12 20V4M19 20v-7', about: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0', contact: 'M3 6h18v12H3zM3 7l9 7 9-7' };
const tabs: [string, string, string][] = [['/', 'Home', I.home], ['/services', 'Services', I.services], ['/projects', 'Work', I.work], ['/about', 'About', I.about], ['/contact', 'Contact', I.contact]];
export default function TabBar() {
  const p = usePathname(); if (p.startsWith('/admin')) return null;
  return (<nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-rule bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
    {tabs.map(([h, l, d]) => { const on = h === '/' ? p === '/' : p.startsWith(h); return (<Link key={h} href={h} className={`flex flex-col items-center gap-1 py-2 text-[11px] font-semibold transition-colors active:scale-95 ${on ? 'text-blue' : 'text-mute'}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d={d} /></svg>{l}</Link>); })}</nav>);
}
