import Link from 'next/link';
import { requireAdmin, sb } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
export default async function Overview() {
  const s = await sb();
  const [, { data: projs }, m, c, { data: recent }] = await Promise.all([requireAdmin(s), s.from('projects').select('id,title,status,category,cover_image_url,updated_at').order('updated_at', { ascending: false }),
    s.from('inquiries').select('*', { count: 'exact', head: true }), s.from('clients').select('*', { count: 'exact', head: true }), s.from('inquiries').select('id,name,company,need,created_at').order('created_at', { ascending: false }).limit(4)]);
  const all = projs ?? [], pub = all.filter(p => p.status === 'published').length;
  const mix = Object.entries(all.reduce((a: Record<string, number>, p) => { const k = p.category || 'Uncategorised'; a[k] = (a[k] || 0) + 1; return a; }, {}));
  const stats: [string, number][] = [['Published', pub], ['Drafts', all.length - pub], ['Messages', m.count ?? 0], ['Clients', c.count ?? 0]];
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  return (<div className="mx-auto max-w-5xl"><p className="text-sm text-mute">{today}</p>
    <div className="mt-1 flex flex-wrap items-end justify-between gap-4"><h1 className="text-3xl md:text-4xl">Overview</h1><div className="flex flex-wrap gap-3"><Link href="/admin/edit/new" className="btn">New project</Link><Link href="/admin/site" className="btn-o">Edit site text</Link></div></div>
    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{stats.map(([l, n]) => <div key={l} className="relative border border-rule p-4 md:p-5"><span className="absolute left-0 top-0 h-0.5 w-8 bg-blue" /><p className="text-4xl font-extrabold tabular-nums">{n}</p><p className="mt-1 text-sm text-mute">{l}</p></div>)}</div>
    {mix.length > 0 && <section className="mt-6 border border-rule p-4 md:p-5"><h2 className="text-lg">Portfolio mix</h2><div className="mt-4 space-y-3">{mix.map(([l, n]) => <div key={l}><div className="flex justify-between text-sm font-semibold"><span>{l}</span><span>{n}</span></div><div className="mt-1 h-2 bg-rule"><div className="h-2 bg-blue" style={{ width: `${n / all.length * 100}%` }} /></div></div>)}</div></section>}
    <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
      <section className="border border-rule p-4 md:p-5"><div className="flex items-center justify-between"><h2 className="text-lg">Latest projects</h2><Link href="/admin/projects" className="text-sm font-semibold text-blue">View all</Link></div>
        <ul className="mt-3 divide-y divide-rule">{all.slice(0, 4).map(p => <li key={p.id}><Link href={`/admin/edit/${p.id}`} className="flex items-center gap-3 py-3 hover:text-blue"><span className="h-10 w-14 shrink-0 border border-rule">{p.cover_image_url && <img src={p.cover_image_url} alt="" className="h-full w-full object-cover" />}</span><span className="min-w-0 flex-1 truncate font-semibold">{p.title}</span><span className={`px-2 py-0.5 text-xs font-semibold ${p.status === 'published' ? 'bg-blue/10 text-blue' : 'border border-rule text-mute'}`}>{p.status}</span></Link></li>)}</ul>
        {!all.length && <p className="mt-3 text-sm text-mute">No projects yet.</p>}</section>
      <section className="border border-rule p-4 md:p-5"><div className="flex items-center justify-between"><h2 className="text-lg">Latest messages</h2><Link href="/admin/inquiries" className="text-sm font-semibold text-blue">View all</Link></div>
        <ul className="mt-3 divide-y divide-rule">{recent?.map(x => <li key={x.id} className="py-3"><p className="font-semibold">{x.name}{x.company && <span className="font-normal text-mute"> · {x.company}</span>}</p><p className="truncate text-sm text-mute">{x.need}</p></li>)}</ul>
        {!recent?.length && <p className="mt-3 text-sm text-mute">No messages yet.</p>}</section></div></div>);
}
