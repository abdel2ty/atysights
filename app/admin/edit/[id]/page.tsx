import Link from 'next/link';
import { requireAdmin } from '@/lib/supabase/server';
import ImageField from '@/components/ImageField';
import { save } from '../../actions';
const areas: [string,string][] = [['business_context','Business context'],['problem_statement','Problem statement'],['objectives','Objectives'],['methodology','Analytical methodology'],['key_findings','Key findings'],['business_insights','Business insights'],['recommendations','Recommendations'],['conclusion','Conclusion']];
export default async function E({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ err?: string }> }) {
  const { id } = await params; const { err } = await searchParams; const s = await requireAdmin();
  const p: any = id === 'new' ? {} : (await s.from('projects').select('*').eq('id', id).single()).data ?? {};
  const T = (n: string, l: string, extra = '') => <div className={extra}><label className="mb-1 block text-sm font-medium">{l}</label><input name={n} defaultValue={p[n] ?? ''} className="field"/></div>;
  return (<main className="mx-auto max-w-3xl px-6 py-12"><Link href="/admin/projects" className="text-sm underline">Back to projects</Link>
    <h1 className="mt-4 font-serif text-4xl">{id === 'new' ? 'Add project' : 'Edit project'}</h1>
    {err && <p className="mt-4 border border-red-700 p-3 text-sm text-red-700">{err}</p>}
    <form action={save} className="mt-8 space-y-5"><input type="hidden" name="id" value={id}/>
      {T('title','Title')}{T('slug','URL slug (leave empty to generate from the title)')}
      <div><label className="mb-1 block text-sm font-medium">Short description</label><textarea name="short_description" defaultValue={p.short_description ?? ''} rows={2} className="field"/></div>
      <div className="grid gap-4 md:grid-cols-3">{T('industry','Industry')}{T('category','Category')}<div><label className="mb-1 block text-sm font-medium">Publication date</label><input type="date" name="published_at" defaultValue={p.published_at ?? ''} className="field"/></div></div>
      <ImageField name="cover_image_url" label="Cover image" defaultValue={p.cover_image_url ?? ''}/>
      <div><label className="mb-1 block text-sm font-medium">Additional images (one https URL per line)</label><textarea name="additional_images" defaultValue={(p.additional_images ?? []).join('\n')} rows={2} className="field"/></div>
      <div><label className="mb-1 block text-sm font-medium">Gallery images (one https URL per line)</label><textarea name="gallery_images" defaultValue={(p.gallery_images ?? []).join('\n')} rows={2} className="field"/></div>
      {areas.map(([k,l])=><div key={k}><label className="mb-1 block text-sm font-medium">{l}</label><textarea name={k} defaultValue={p[k] ?? ''} rows={4} className="field"/></div>)}
      <fieldset className="space-y-3 border border-rule p-4"><legend className="px-2 text-sm font-medium">Dashboard</legend>
        {T('powerbi_embed_url','Power BI embed URL (https://app.powerbi.com/…)')}{T('dashboard_external_url','External dashboard URL (optional)')}{T('dashboard_title','Dashboard section title')}
        <label className="flex gap-2 text-sm"><input type="checkbox" name="show_dashboard" defaultChecked={p.show_dashboard}/>Show dashboard on the project page</label></fieldset>
      <div className="grid gap-4 md:grid-cols-2">{T('seo_title','SEO title')}{T('seo_description','SEO description')}</div>
      <div className="flex flex-wrap items-center gap-6 text-sm"><label><input type="checkbox" name="featured" defaultChecked={p.featured}/> Featured</label>
        <label>Order <input type="number" name="sort_order" defaultValue={p.sort_order ?? 0} className="field ml-2 inline w-20"/></label>
        <select name="status" defaultValue={p.status ?? 'draft'} className="field w-auto"><option value="draft">Draft</option><option value="published">Published</option></select></div>
      <div className="flex gap-3"><button className="btn">Save project</button>{id !== 'new' && <a className="border border-ink px-5 py-3 text-sm" target="_blank" href={`/admin/preview/${id}`}>Preview saved version</a>}</div>
      
    </form></main>);
}
