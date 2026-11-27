import Link from 'next/link';
import { requireAdmin, sb } from '@/lib/supabase/server';
import ImageField from '@/components/ImageField';
import RowsEditor from '@/components/RowsEditor';
import { save } from '../../actions';
const legacy: [string, string][] = [['business_context', 'Context'], ['problem_statement', 'The need'], ['objectives', 'Goals'], ['methodology', 'Approach'], ['key_findings', 'Results'], ['business_insights', 'Insights'], ['recommendations', 'Next steps'], ['conclusion', 'Summary']];
function Card({ t, d, children }: { t: string; d?: string; children: React.ReactNode }) { return (<section className="border border-rule p-5 md:p-6"><h2 className="text-lg">{t}</h2>{d && <p className="mt-1 text-sm text-mute">{d}</p>}<div className="mt-5 space-y-4">{children}</div></section>); }
export default async function E({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ err?: string }> }) {
  const { id } = await params; const { err } = await searchParams; const s = await sb();
  const [, one, cats] = await Promise.all([requireAdmin(s), id === 'new' ? Promise.resolve({ data: null }) : s.from('projects').select('*').eq('id', id).single(), s.from('projects').select('category')]);
  const p: any = one.data ?? {}; const catList = [...new Set([...(cats.data ?? []).map((c: any) => c.category).filter(Boolean), 'Business systems', 'Data & analytics', 'AI systems'])] as string[];
  const Lb = (l: string) => <label className="mb-1 block text-sm font-medium">{l}</label>;
  const T = (n: string, l: string, ph = '') => <div>{Lb(l)}<input name={n} defaultValue={p[n] ?? ''} placeholder={ph} className="field" /></div>;
  const legacyHas = legacy.some(([k]) => p[k]);
  const blocks = Array.isArray(p.blocks) && p.blocks.length ? p.blocks : id === 'new' ? [{ title: 'The need', body: '' }, { title: 'What I built', body: '' }, { title: 'Result', body: '' }] : [];
  return (<form action={save} className="mx-auto max-w-3xl space-y-6 pb-32"><input type="hidden" name="id" value={id} />
    <div><Link href="/admin/projects" className="text-sm font-semibold text-blue">← Projects</Link><h1 className="mt-2 text-3xl md:text-4xl">{id === 'new' ? 'New project' : 'Edit project'}</h1></div>
    {err && <p className="border border-red-700 p-3 text-sm text-red-700">{err}</p>}
    <Card t="Essentials" d="Enough to publish. Everything else is optional.">
      {T('title', 'Title')}
      <div>{Lb('Category')}<input name="category" list="cats" defaultValue={p.category ?? ''} placeholder="Pick one or type a new one" className="field" /><datalist id="cats">{catList.map(c => <option key={c} value={c} />)}</datalist></div>
      {T('industry', 'Client or industry', 'e.g. Coffee shops')}
      <div>{Lb('Short description')}<textarea name="short_description" defaultValue={p.short_description ?? ''} rows={2} className="field" /></div>
      <ImageField name="cover_image_url" label="Cover image" defaultValue={p.cover_image_url ?? ''} />
      <div>{Lb('Live links')}<p className="mb-2 text-xs text-mute">Anything a visitor can open: a system, a site, a dashboard. The first one is the main button.</p><RowsEditor name="links_json" addLabel="Add a link" fields={[{ k: 'label', label: 'Name', ph: 'e.g. Coffee shop 1' }, { k: 'url', label: 'Address', ph: 'https://' }]} defaultValue={Array.isArray(p.links) ? p.links : []} /></div></Card>
    <Card t="The story" d="Add any sections you like, in any order. A section without text is left out.">
      <RowsEditor name="blocks_json" addLabel="Add a section" fields={[{ k: 'title', label: 'Section title' }, { k: 'body', label: 'Text', area: true }]} defaultValue={blocks} /></Card>
    <details className="border border-rule p-5 md:p-6"><summary className="cursor-pointer text-lg font-extrabold">More options</summary>
      <div className="mt-5 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">{T('slug', 'URL slug', 'Generated from the title if empty')}<div>{Lb('Date')}<input type="date" name="published_at" defaultValue={p.published_at ?? ''} className="field" /></div></div>
        {T('tech', 'Tech stack (comma separated)', 'Next.js, PostgreSQL, Power BI')}
        <div>{Lb('Facts shown beside the project')}<RowsEditor name="facts_json" addLabel="Add a fact" fields={[{ k: 'label', label: 'Label', ph: 'e.g. Role' }, { k: 'value', label: 'Value', ph: 'e.g. Design and development' }]} defaultValue={Array.isArray(p.facts) ? p.facts : []} /></div>
        <div className="space-y-3"><p className="text-sm font-medium">Embedded view (dashboard or live demo)</p>{T('powerbi_embed_url', 'Embed link', 'https://')}{T('dashboard_external_url', 'Open-in-new-tab link', 'https://')}{T('dashboard_title', 'Title')}<label className="flex items-center gap-2 text-sm"><input type="checkbox" name="show_dashboard" defaultChecked={p.show_dashboard} />Show it on the project page</label></div>
        <div>{Lb('More images (one https link per line)')}<textarea name="additional_images" defaultValue={[...(p.additional_images ?? []), ...(p.gallery_images ?? [])].join('\n')} rows={3} className="field" /><input type="hidden" name="gallery_images" value="" /></div>
        <div className="grid gap-4 md:grid-cols-2">{T('seo_title', 'SEO title')}{T('seo_description', 'SEO description')}</div>
        <div className="flex flex-wrap items-center gap-6 text-sm"><label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={p.featured} />Featured (shown first)</label><label className="flex items-center gap-2">Order<input type="number" name="sort_order" defaultValue={p.sort_order ?? 0} className="field w-20" /></label></div>
        {legacyHas && <div className="space-y-3 border-t border-rule pt-4"><p className="text-sm font-medium">Older sections (still shown on the site)</p>{legacy.map(([k, l]) => <div key={k}>{Lb(l)}<textarea name={k} defaultValue={p[k] ?? ''} rows={3} className="field" /></div>)}</div>}
      </div></details>
    <div className="fixed inset-x-0 bottom-[calc(2.9rem+env(safe-area-inset-bottom))] z-20 flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-white px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,.15)] md:bottom-0 md:left-60 md:px-10">
      <select name="status" defaultValue={p.status ?? 'draft'} className="field w-auto"><option value="draft">Draft</option><option value="published">Published</option></select>
      <div className="flex items-center gap-4">{id !== 'new' && <a href={`/admin/preview/${id}`} target="_blank" className="text-sm font-semibold hover:underline">Preview saved version</a>}<button className="btn">Save project</button></div></div></form>);
}
