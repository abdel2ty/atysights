import Link from 'next/link';
import { requireAdmin } from '@/lib/supabase/server';
import { toggle, remove, signOut } from './actions';
export const dynamic = 'force-dynamic';
export default async function A() {
  const s = await requireAdmin();
  const { data } = await s.from('projects').select('id,title,slug,status,featured,sort_order').order('sort_order').order('created_at',{ascending:false});
  return (<main className="mx-auto max-w-5xl px-6 py-12"><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="font-serif text-4xl">Projects</h1>
    <div className="flex flex-wrap gap-3"><Link className="btn" href="/admin/edit/new">Add project</Link><Link className="border border-ink px-5 py-3 text-sm" href="/admin/inquiries">Messages</Link><Link className="border border-ink px-5 py-3 text-sm" href="/admin/account">Account</Link><form action={signOut}><button className="border border-ink px-5 py-3 text-sm">Sign out</button></form></div></div>
    <ul className="mt-8 border-t border-ink">{data?.map(p=><li key={p.id} className="flex flex-wrap items-center gap-3 border-b border-rule py-4">
      <span className="min-w-0 flex-1 font-medium">{p.title}<span className="ml-2 text-sm text-mute">/{p.slug}</span></span>
      <form action={toggle}><input type="hidden" name="id" value={p.id}/><input type="hidden" name="field" value="status"/><input type="hidden" name="cur" value={p.status}/><button className={`px-3 py-1 text-sm ${p.status==='published'?'bg-blue text-white':'border border-rule'}`}>{p.status==='published'?'Published · Unpublish':'Draft · Publish'}</button></form>
      <form action={toggle}><input type="hidden" name="id" value={p.id}/><input type="hidden" name="field" value="featured"/><input type="hidden" name="cur" value={String(p.featured)}/><button className="border border-rule px-3 py-1 text-sm">{p.featured?'Unfeature':'Feature'}</button></form>
      <Link className="text-sm underline" href={`/admin/edit/${p.id}`}>Edit</Link>
      <form action={remove}><input type="hidden" name="id" value={p.id}/><button className="text-sm text-red-700 underline">Delete</button></form></li>)}</ul>
    {!data?.length && <p className="mt-8 text-mute">No projects yet. Add your first one.</p>}</main>);
}
