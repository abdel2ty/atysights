'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/admin/actions';
import { LOGO } from '@/lib/site';
const nav = [['/admin', 'Overview'], ['/admin/projects', 'Projects'], ['/admin/clients', 'Clients'], ['/admin/inquiries', 'Messages'], ['/admin/account', 'Account']];
export default function AdminFrame({ children }: { children: React.ReactNode }) {
  const p = usePathname(); if (p === '/admin/login') return <>{children}</>;
  const on = (h: string) => (h === '/admin' ? p === '/admin' : p.startsWith(h));
  return (<div className="adm min-h-screen bg-white md:pl-60">
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-rule bg-white p-5 md:flex"><Link href="/admin"><img src={LOGO} alt="Atysights" className="h-9 w-auto" /></Link><p className="mt-2 text-xs font-semibold text-mute">Admin studio</p>
      <nav className="mt-8 flex flex-1 flex-col gap-1">{nav.map(([h, l]) => <Link key={h} href={h} className={`flex items-center gap-2 px-3 py-2.5 text-sm font-semibold transition-colors ${on(h) ? 'bg-ink text-white' : 'hover:bg-black/5'}`}>{on(h) && <span className="h-1.5 w-1.5 rounded-full bg-blue" />}{l}</Link>)}</nav>
      <Link href="/" target="_blank" className="text-sm font-semibold text-mute hover:text-blue">View site ↗</Link>
      <form action={signOut} className="mt-3"><button className="w-full border border-ink px-3 py-2 text-sm font-semibold transition-colors hover:bg-ink hover:text-white">Sign out</button></form></aside>
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-rule bg-white px-4 py-2 pt-[calc(.5rem+env(safe-area-inset-top))] md:hidden"><img src={LOGO} alt="Atysights" className="h-8 w-auto" /><form action={signOut}><button className="px-2 py-2 text-xs font-semibold underline">Sign out</button></form></div>
    <main className="px-4 py-6 pb-28 md:p-10 md:pb-10">{children}</main>
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-rule bg-white pb-[env(safe-area-inset-bottom)] md:hidden">{nav.map(([h, l]) => <Link key={h} href={h} className={`border-t-2 py-3.5 text-center text-[11px] font-semibold ${on(h) ? 'border-blue text-ink' : 'border-transparent text-mute'}`}>{l}</Link>)}</nav></div>);
}
