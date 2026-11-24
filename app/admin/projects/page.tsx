import Link from 'next/link';
import { requireAdmin } from '@/lib/supabase/server';
import { toggle, remove } from '../actions';
export const dynamic = 'force-dynamic';
export default async function P() {
  const s = await requireAdmin();
  const { data } = await s.from('projects').select('id,title,slug,status,featured,cover_image_url,industry').order('sort_order').order('created_at', { ascending: false });
  const hid = (id: string, field: string, cur: unknown) => <><input type="hidden" name="id" value={id} /><input type="hidden" name="field" value={field} /><input type="hidden" name="cur" value={String(cur)} /></>;
  return (<div className="mx-auto max-w-5xl"><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl md:text-4xl">Projects</h1><Link href="/admin/edit/new" className="btn">New project</Link></div>
    <ul className="mt-8 space-y-3">{data?.map(p => <li key={p.id} className="flex flex-wrap items-center gap-4 bg-white p-4 shadow-sm">
      <span className="h-14 w-20 shrink-0 bg-rule">{p.cover_image_url && <img src={p.cover_image_url} alt="" className="h-full w-full object-cover" />}</span>
      <span className="min-w-0 flex-1"><b className="block truncate">{p.title}</b><span className="text-sm text-mute">/{p.slug}{p.industry && ` · ${p.industry}`}</span></span>
      <form action={toggle}>{hid(p.id, 'status', p.status)}<button className={`px-3 py-1.5 text-xs font-semibold ${p.status === 'published' ? 'bg-blue text-white' : 'bg-rule text-mute'}`}>{p.status === 'published' ? 'Published' : 'Draft'}</button></form>
      <form action={toggle}>{hid(p.id, 'featured', p.featured)}<button className={`px-3 py-1.5 text-xs font-semibold ${p.featured ? 'bg-ink text-white' : 'border border-rule text-mute'}`}>{p.featured ? '★ Featured' : 'Feature'}</button></form>
      <span className="flex gap-4 text-sm font-semibold"><Link href={`/admin/edit/${p.id}`} className="text-blue hover:underline">Edit</Link><a href={`/admin/preview/${p.id}`} target="_blank" className="hover:underline">Preview</a></span>
      <form action={remove}><input type="hidden" name="id" value={p.id} /><button className="text-sm text-red-700 hover:underline">Delete</button></form></li>)}</ul>
    {!data?.length && <p className="mt-8 bg-white p-8 text-center text-mute shadow-sm">No projects yet. Add your first one.</p>}</div>);
}
