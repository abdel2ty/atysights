import { requireAdmin, sb } from '@/lib/supabase/server';
import ImageField from '@/components/ImageField';
import { addCategory, updateCategory, removeCategory } from '../actions';
export const dynamic = 'force-dynamic';
export default async function Cats({ searchParams }: { searchParams: Promise<{ err?: string }> }) {
  const { err } = await searchParams; const s = await sb();
  const [, { data, error }] = await Promise.all([requireAdmin(s), s.from('categories').select('*').order('sort_order').order('created_at')]);
  return (<div className="mx-auto max-w-5xl"><h1 className="text-3xl md:text-4xl">Categories</h1>
    <p className="mt-1 max-w-2xl text-sm text-mute">Each project belongs to a category, for example a personal app, an assigned task, or a freelance job on a platform. The category logo shows on the project card so visitors see where it came from. Use a square (1:1) logo from Cloudinary.</p>
    {error && <p className="mt-4 border border-red-700 p-3 text-sm text-red-700">Categories are not set up yet. Run 005_categories.sql in the Supabase SQL Editor first.</p>}
    {err && <p className="mt-4 border border-red-700 p-3 text-sm text-red-700">{err}</p>}
    <form action={addCategory} className="mt-8 grid gap-4 border border-rule p-5 md:grid-cols-2 md:p-6"><h2 className="text-lg md:col-span-2">Add a category</h2>
      <div><label className="mb-1 block text-sm font-medium">Name</label><input name="name" required placeholder="e.g. Freelance on Upwork" className="field" /></div>
      <div><label className="mb-1 block text-sm font-medium">Order</label><input name="sort_order" type="number" defaultValue={0} className="field" /></div>
      <div className="md:col-span-2"><ImageField name="logo_url" label="Logo (square 1:1): paste a Cloudinary link, or upload" /></div>
      <div><button className="btn">Add category</button></div></form>
    <ul className="mt-8 grid gap-4 md:grid-cols-2">{data?.map(c => <li key={c.id} className="border border-rule p-4">
      <form action={updateCategory} className="space-y-3"><input type="hidden" name="id" value={c.id} />
        <div className="flex items-center gap-3"><img src={c.logo_url} alt="" className="h-16 w-16 aspect-square shrink-0 border border-rule object-cover" /><input name="name" defaultValue={c.name} required aria-label="Name" className="field" /></div>
        <input name="logo_url" defaultValue={c.logo_url} aria-label="Logo link" placeholder="https://" className="field" />
        <div className="flex items-center gap-3"><label className="text-sm">Order</label><input name="sort_order" type="number" defaultValue={c.sort_order} className="field w-20" /><button className="btn ml-auto">Save</button></div></form>
      <form action={removeCategory} className="mt-2"><input type="hidden" name="id" value={c.id} /><button className="text-sm font-semibold text-red-700">Delete</button></form></li>)}</ul>
    {!data?.length && !error && <p className="mt-8 border border-rule p-8 text-center text-mute">No categories yet. Add your first one above.</p>}</div>);
}
