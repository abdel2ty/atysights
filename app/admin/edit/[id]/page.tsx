import Link from 'next/link';
import { requireAdmin } from '@/lib/supabase/server';
import ImageField from '@/components/ImageField';
import { save } from '../../actions';
const areas: [string, string, string][] = [['business_context','Business context','Who the client is and what the business does.'],['problem_statement','Problem statement','What was going wrong or unclear.'],['objectives','Objectives','What the analysis set out to answer.'],['methodology','Analytical methodology','The data used and how it was analysed.'],['key_findings','Key findings','What the data revealed.'],['business_insights','Business insights','What the findings mean for the business.'],['recommendations','Recommendations','What to do next.'],['conclusion','Conclusion','']];
function Card({ t, d, children }: { t: string; d?: string; children: React.ReactNode }) { return (<section className="bg-white p-5 shadow-sm md:p-6"><h2 className="text-lg">{t}</h2>{d && <p className="mt-1 text-sm text-mute">{d}</p>}<div className="mt-5 space-y-4">{children}</div></section>); }
export default async function E({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ err?: string }> }) {
  const { id } = await params; const { err } = await searchParams; const s = await requireAdmin();
  const p: any = id === 'new' ? {} : (await s.from('projects').select('*').eq('id', id).single()).data ?? {};
  const Lb = (l: string) => <label className="mb-1 block text-sm font-medium">{l}</label>;
  const T = (n: string, l: string, ph = '') => <div>{Lb(l)}<input name={n} defaultValue={p[n] ?? ''} placeholder={ph} className="field" /></div>;
  return (<form action={save} className="mx-auto max-w-3xl space-y-6 pb-32"><input type="hidden" name="id" value={id} />
    <div><Link href="/admin/projects" className="text-sm font-semibold text-blue">← Projects</Link><h1 className="mt-2 text-3xl md:text-4xl">{id === 'new' ? 'New project' : 'Edit project'}</h1></div>
    {err && <p className="border border-red-700 bg-white p-3 text-sm text-red-700">{err}</p>}
    <Card t="Basics">{T('title', 'Title')}{T('slug', 'URL slug', 'Generated from the title if empty')}
      <div>{Lb('Short description')}<textarea name="short_description" defaultValue={p.short_description ?? ''} rows={2} className="field" /></div>
      <div className="grid gap-4 md:grid-cols-3">{T('industry', 'Industry')}{T('category', 'Category')}<div>{Lb('Publication date')}<input type="date" name="published_at" defaultValue={p.published_at ?? ''} className="field" /></div></div></Card>
    <Card t="Images" d="Paste a link or upload. A preview shows before you save."><ImageField name="cover_image_url" label="Cover image" defaultValue={p.cover_image_url ?? ''} />
      <div>{Lb('Additional images (one https link per line)')}<textarea name="additional_images" defaultValue={(p.additional_images ?? []).join('\n')} rows={2} className="field" /></div>
      <div>{Lb('Gallery images (one https link per line)')}<textarea name="gallery_images" defaultValue={(p.gallery_images ?? []).join('\n')} rows={2} className="field" /></div></Card>
    <Card t="Case study" d="Fill only what you have. Empty sections are hidden on the site.">{areas.map(([k, l, h]) => <div key={k}>{Lb(l)}<textarea name={k} defaultValue={p[k] ?? ''} placeholder={h} rows={4} className="field" /></div>)}</Card>
    <Card t="Dashboard">{T('powerbi_embed_url', 'Power BI embed link', 'https://app.powerbi.com/…')}{T('dashboard_external_url', 'External dashboard link (optional)')}{T('dashboard_title', 'Section title')}
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="show_dashboard" defaultChecked={p.show_dashboard} />Show the dashboard on the project page</label></Card>
    <Card t="Search and options">{T('seo_title', 'SEO title')}{T('seo_description', 'SEO description')}
      <div className="flex flex-wrap items-center gap-6 text-sm"><label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={p.featured} />Featured</label><label className="flex items-center gap-2">Order<input type="number" name="sort_order" defaultValue={p.sort_order ?? 0} className="field w-20" /></label></div></Card>
    <div className="fixed inset-x-0 bottom-[calc(2.9rem+env(safe-area-inset-bottom))] z-20 flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-white px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,.15)] md:bottom-0 md:left-60 md:px-10">
      <select name="status" defaultValue={p.status ?? 'draft'} className="field w-auto"><option value="draft">Draft</option><option value="published">Published</option></select>
      <div className="flex items-center gap-4">{id !== 'new' && <a href={`/admin/preview/${id}`} target="_blank" className="text-sm font-semibold hover:underline">Preview saved version</a>}<button className="btn">Save project</button></div></div></form>);
}
