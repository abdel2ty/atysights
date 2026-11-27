import { requireAdmin, sb } from '@/lib/supabase/server';
import RowsEditor from '@/components/RowsEditor';
import { DEFAULTS } from '@/lib/content';
import { saveSite } from '../actions';
export const dynamic = 'force-dynamic';
export default async function Site({ searchParams }: { searchParams: Promise<{ err?: string; ok?: string }> }) {
  const { err, ok } = await searchParams; const s = await sb();
  const [, { data }] = await Promise.all([requireAdmin(s), s.from('site_settings').select('value').eq('key', 'site').maybeSingle()]);
  const v = { ...DEFAULTS, ...((data?.value as object) ?? {}) } as typeof DEFAULTS;
  return (<form action={saveSite} className="mx-auto max-w-3xl space-y-6 pb-28"><div><h1 className="text-3xl md:text-4xl">Site text</h1><p className="mt-1 text-sm text-mute">The words on your homepage. Change them whenever your work changes.</p></div>
    {ok && <p className="border border-blue p-3 text-sm text-blue">Saved. The site updates within a minute.</p>}{err && <p className="border border-red-700 p-3 text-sm text-red-700">{err}</p>}
    <section className="space-y-4 border border-rule p-5 md:p-6"><h2 className="text-lg">Headline</h2>
      <div className="grid gap-3 sm:grid-cols-3">{[0, 1, 2].map(i => <input key={i} name={`hero${i + 1}`} defaultValue={v.hero[i]} aria-label={`Headline word ${i + 1}`} className="field" />)}</div>
      <div><label className="mb-1 block text-sm font-medium">Intro</label><textarea name="intro" defaultValue={v.intro} rows={3} className="field" /></div>
      <div><label className="mb-1 block text-sm font-medium">Status</label><input name="status" defaultValue={v.status} className="field" /></div></section>
    <section className="border border-rule p-5 md:p-6"><h2 className="text-lg">Disciplines</h2><p className="mb-4 mt-1 text-sm text-mute">Each one becomes a column on the homepage. Add any new area of work. Items are separated by commas. The category links to your projects of that category.</p>
      <RowsEditor name="caps_json" addLabel="Add a discipline" fields={[{ k: 'code', label: 'Short code', ph: 'e.g. SYS' }, { k: 'title', label: 'Title' }, { k: 'text', label: 'One line', area: true }, { k: 'items', label: 'Items', ph: 'Point of sale, Inventory, Ordering' }, { k: 'category', label: 'Project category', ph: 'e.g. Business systems' }]} defaultValue={v.capabilities} /></section>
    <div className="fixed inset-x-0 bottom-[calc(2.9rem+env(safe-area-inset-bottom))] z-20 flex justify-end border-t border-rule bg-white px-4 py-3 md:bottom-0 md:left-60 md:px-10"><button className="btn">Save</button></div></form>);
}
