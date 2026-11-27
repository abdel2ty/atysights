import Link from 'next/link';
import WorkCard from '@/components/WorkCard';
import { getPublished } from '@/lib/supabase/public';
import { KINDS } from '@/lib/content';
export const revalidate = 60;
export const metadata = { title: 'Work' };
export default async function P({ searchParams }: { searchParams: Promise<{ k?: string; f?: string }> }) {
  const { k, f } = await searchParams; const all = await getPublished();
  const inKind = all.filter((p: any) => !k || p.kind === k);
  const tags = [...new Set(inKind.map((p: any) => p.industry).filter(Boolean))] as string[];
  const list = inKind.filter((p: any) => !f || p.industry === f);
  const q = (kk?: string, ff?: string) => { const s = new URLSearchParams(); if (kk) s.set('k', kk); if (ff) s.set('f', ff); const t = s.toString(); return t ? `/projects?${t}` : '/projects'; };
  const chip = (on: boolean) => `border px-3 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-ink bg-ink text-white' : 'border-rule hover:border-ink'}`;
  return (<main className="mx-auto max-w-6xl px-6 py-12 md:py-16"><h1 className="text-4xl md:text-6xl">Work</h1><p className="mt-4 max-w-xl text-lg text-mute">Systems, data projects and AI. Where a project is live, you can open it.</p>
    <div className="mt-8 flex flex-wrap gap-2"><Link href={q()} className={chip(!k)}>All</Link>{Object.entries(KINDS).map(([key, l]) => <Link key={key} href={q(key)} className={chip(k === key)}>{l}</Link>)}</div>
    {tags.length > 1 && <div className="mt-3 flex flex-wrap gap-2 text-sm">{tags.map(t => <Link key={t} href={q(k, f === t ? undefined : t)} className={`px-3 py-1 ${f === t ? 'bg-blue text-white' : 'bg-blue/10 text-blue'}`}>{t}</Link>)}</div>}
    <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{list.map((p: any) => <WorkCard key={p.id} p={p} />)}</div>
    {!list.length && <p className="mt-10 text-mute">No projects here yet.</p>}</main>);
}
