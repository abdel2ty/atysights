'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/admin/actions';
const nav = [['/admin', 'Overview'], ['/admin/projects', 'Projects'], ['/admin/clients', 'Clients'], ['/admin/inquiries', 'Messages'], ['/admin/account', 'Account']];
export default function AdminFrame({ children }: { children: React.ReactNode }) {
  const p = usePathname(); if (p === '/admin/login') return <>{children}</>;
  const on = (h: string) => (h === '/admin' ? p === '/admin' : p.startsWith(h));
  return (<div className="min-h-screen bg-[#F4F6FA] md:pl-60">
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-ink p-5 text-white md:flex"><div className="text-xl font-extrabold">ATY<span className="text-blue">SIGHTS</span></div><p className="mt-1 text-xs text-white/50">Admin studio</p>
      <nav className="mt-8 flex flex-1 flex-col gap-1">{nav.map(([h, l]) => <Link key={h} href={h} className={`px-3 py-2.5 text-sm font-semibold transition-colors ${on(h) ? 'bg-blue text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>{l}</Link>)}</nav>
      <Link href="/" target="_blank" className="text-sm text-white/70 hover:text-white">View site ↗</Link>
      <form action={signOut} className="mt-3"><button className="w-full border border-white/30 px-3 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-ink">Sign out</button></form></aside>
    <div className="sticky top-0 z-30 flex items-center justify-between bg-ink px-4 py-3 text-white md:hidden"><b>ATY<span className="text-blue">SIGHTS</span> <span className="text-xs font-normal text-white/50">Admin</span></b><form action={signOut}><button className="text-xs underline">Sign out</button></form></div>
    <main className="p-4 pb-24 md:p-10 md:pb-10">{children}</main>
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-rule bg-white pb-[env(safe-area-inset-bottom)] md:hidden">{nav.map(([h, l]) => <Link key={h} href={h} className={`py-3 text-center text-[11px] font-semibold ${on(h) ? 'text-blue' : 'text-mute'}`}>{l}</Link>)}</nav></div>);
}
