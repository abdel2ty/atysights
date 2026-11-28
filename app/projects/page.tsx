import Link from 'next/link';
import { getPublished } from '@/lib/supabase/public';
import CategoryBadge from '@/components/CategoryBadge';
export const revalidate = 60;
export const metadata = { title: 'Work' };
export default async function P({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams; const data = await getPublished();
  const cats = [...new Map(data.filter((p: any) => p.cat).map((p: any) => [p.cat.id, p.cat] as [string, any])).values()] as { id: string; name: string; logo_url: string }[];
  const list = data.filter((p: any) => !c || p.cat?.name === c);
  const chip = (on: boolean) => `flex items-center gap-2 border pr-3 text-sm font-semibold transition-colors ${on ? 'border-ink bg-ink text-white' : 'border-rule hover:border-ink'}`;
  return (<main className="mx-auto max-w-6xl px-6 py-12 md:py-16"><h1 className="text-4xl md:text-6xl">Work</h1>
    <div className="mt-8 flex flex-wrap gap-2"><Link href="/projects" className={`${chip(!c)} px-3 py-2`}>All</Link>
      {cats.map(k => <Link key={k.id} href={`/projects?c=${encodeURIComponent(k.name)}`} className={chip(c === k.name)}><img src={k.logo_url} alt="" className="h-9 w-9 aspect-square object-cover" />{k.name}</Link>)}</div>
    <ul className="mt-10 border-t border-ink">{list.map((p: any) => <li key={p.id} className="border-b border-rule"><Link href={`/projects/${p.slug}`} className="grid items-center gap-3 py-6 transition-colors hover:bg-black/[.03] md:grid-cols-12">
      <span className="md:col-span-3"><CategoryBadge cat={p.cat} /></span>
      <h2 className="text-2xl font-extrabold md:col-span-5">{p.title}{p.featured && <span className="ml-2 bg-blue px-2 text-xs text-white">Featured</span>}</h2>
      <p className="text-sm text-mute md:col-span-4">{[p.industry, String(p.published_at ?? '').slice(0, 4)].filter(Boolean).join(' · ')}. {p.short_description}</p></Link></li>)}</ul>
    {!list.length && <p className="mt-10 text-mute">No projects match this filter.</p>}</main>);
}
