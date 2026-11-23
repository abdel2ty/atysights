import Link from 'next/link';
import { getPublished } from '@/lib/supabase/public';
export const revalidate = 60;
export default async function P({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  const { f } = await searchParams;
  const data = await getPublished();
  const tags = [...new Set((data ?? []).flatMap(p=>[p.industry,p.category]).filter(Boolean))] as string[];
  const list = (data ?? []).filter(p => !f || p.industry===f || p.category===f);
  return (<main className="mx-auto max-w-6xl px-6 py-16"><h1 className="font-serif text-5xl">Work</h1>
    <div className="mt-8 flex flex-wrap gap-2 text-sm"><Link href="/projects" className={`border px-3 py-1 ${!f?'bg-blue text-white border-lime':'border-rule'}`}>All</Link>
      {tags.map(t=><Link key={t} href={`/projects?f=${encodeURIComponent(t)}`} className={`border px-3 py-1 ${f===t?'bg-blue text-white border-lime':'border-rule'}`}>{t}</Link>)}</div>
    <ul className="mt-10 border-t border-ink">{list.map(p=><li key={p.id} className="border-b border-rule"><Link href={`/projects/${p.slug}`} className="grid gap-2 py-6 hover:bg-white/40 md:grid-cols-12">
      <span className="text-sm text-mute md:col-span-2">{p.published_at}</span><h2 className="font-serif text-2xl md:col-span-5">{p.title}{p.featured && <span className="ml-2 bg-blue text-white px-2 text-xs">Featured</span>}</h2>
      <p className="text-sm text-mute md:col-span-5">{p.industry}{p.category && `, ${p.category}`}. {p.short_description}</p></Link></li>)}</ul>
    {!list.length && <p className="mt-10 text-mute">No projects match this filter.</p>}</main>);
}
