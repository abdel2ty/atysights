import { requireAdmin } from '@/lib/supabase/server';
import ImageField from '@/components/ImageField';
import { addClient, toggleClient, removeClient } from '../actions';
export const dynamic = 'force-dynamic';
export default async function C({ searchParams }: { searchParams: Promise<{ err?: string }> }) {
  const { err } = await searchParams; const s = await requireAdmin();
  const { data } = await s.from('clients').select('*').order('sort_order').order('created_at');
  return (<div className="mx-auto max-w-5xl"><h1 className="text-3xl md:text-4xl">Clients</h1><p className="mt-1 text-sm text-mute">Logos appear in the moving strip on your homepage. Paste a Cloudinary link or upload.</p>
    <form action={addClient} className="mt-8 grid gap-4 bg-white p-5 shadow-sm md:grid-cols-2">
      {err && <p className="border border-red-700 p-3 text-sm text-red-700 md:col-span-2">{err}</p>}
      <div><label className="mb-1 block text-sm font-medium">Company name</label><input name="name" required className="field" /></div>
      <div><label className="mb-1 block text-sm font-medium">Website (optional)</label><input name="website_url" placeholder="https://" className="field" /></div>
      <div className="md:col-span-2"><ImageField name="logo_url" label="Logo link or upload" /></div>
      <div><label className="mb-1 block text-sm font-medium">Order</label><input name="sort_order" type="number" defaultValue={0} className="field" /></div>
      <div className="flex items-end"><button className="btn w-full md:w-auto">Add client</button></div></form>
    <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{data?.map(c => <li key={c.id} className="bg-white p-4 shadow-sm"><div className="grid h-20 place-items-center bg-[#F4F6FA]"><img src={c.logo_url} alt={c.name} className="max-h-14 max-w-full object-contain" /></div>
      <p className="mt-3 truncate font-semibold">{c.name}</p>
      <div className="mt-3 flex items-center justify-between text-xs font-semibold"><form action={toggleClient}><input type="hidden" name="id" value={c.id} /><input type="hidden" name="cur" value={String(c.visible)} /><button className={`px-2.5 py-1 ${c.visible ? 'bg-blue text-white' : 'bg-rule text-mute'}`}>{c.visible ? 'Visible' : 'Hidden'}</button></form>
        <form action={removeClient}><input type="hidden" name="id" value={c.id} /><button className="text-red-700 hover:underline">Delete</button></form></div></li>)}</ul>
    {!data?.length && <p className="mt-8 bg-white p-8 text-center text-mute shadow-sm">No clients yet. The homepage strip stays hidden until you add one.</p>}</div>);
}
