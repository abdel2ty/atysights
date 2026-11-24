import Link from 'next/link';
import { requireAdmin } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
export default async function Overview() {
  const s = await requireAdmin();
  const count = async (t: string, col?: string, val?: string) => { let q = s.from(t).select('*', { count: 'exact', head: true }); if (col) q = q.eq(col, val!); return (await q).count ?? 0; };
  const [total, pub, msgs, clients] = await Promise.all([count('projects'), count('projects', 'status', 'published'), count('inquiries'), count('clients')]);
  const { data: recent } = await s.from('inquiries').select('id,name,company,need,created_at').order('created_at', { ascending: false }).limit(4);
  const { data: projs } = await s.from('projects').select('id,title,status,cover_image_url').order('updated_at', { ascending: false }).limit(4);
  const stats: [string, number][] = [['Published projects', pub], ['Drafts', total - pub], ['Messages', msgs], ['Clients', clients]];
  return (<div className="mx-auto max-w-5xl"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl md:text-4xl">Overview</h1><p className="mt-1 text-sm text-mute">Everything on your site, in one place.</p></div>
    <div className="flex flex-wrap gap-3"><Link href="/admin/edit/new" className="btn">New project</Link><Link href="/admin/clients" className="btn-o">Add client</Link></div></div>
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{stats.map(([l, n]) => <div key={l} className="border-l-4 border-blue bg-white p-5 shadow-sm"><p className="text-4xl font-extrabold tabular-nums">{n}</p><p className="mt-1 text-sm text-mute">{l}</p></div>)}</div>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <section className="bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-lg">Latest projects</h2><Link href="/admin/projects" className="text-sm text-blue underline">All</Link></div>
        <ul className="mt-4 divide-y divide-rule">{projs?.map(p => <li key={p.id}><Link href={`/admin/edit/${p.id}`} className="flex items-center gap-3 py-3 hover:text-blue"><span className="h-10 w-14 shrink-0 bg-rule">{p.cover_image_url && <img src={p.cover_image_url} alt="" className="h-full w-full object-cover" />}</span><span className="min-w-0 flex-1 truncate font-semibold">{p.title}</span><span className={`px-2 py-0.5 text-xs font-semibold ${p.status === 'published' ? 'bg-blue text-white' : 'bg-rule text-mute'}`}>{p.status}</span></Link></li>)}</ul>
        {!projs?.length && <p className="mt-4 text-sm text-mute">No projects yet.</p>}</section>
      <section className="bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-lg">Latest messages</h2><Link href="/admin/inquiries" className="text-sm text-blue underline">All</Link></div>
        <ul className="mt-4 divide-y divide-rule">{recent?.map(m => <li key={m.id} className="py-3"><p className="font-semibold">{m.name}{m.company && <span className="font-normal text-mute"> · {m.company}</span>}</p><p className="truncate text-sm text-mute">{m.need}</p></li>)}</ul>
        {!recent?.length && <p className="mt-4 text-sm text-mute">No messages yet.</p>}</section></div></div>);
}
