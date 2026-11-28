import Image from 'next/image';
import CategoryBadge from '@/components/CategoryBadge';
const secs: [string, string][] = [['business_context','Business context'],['problem_statement','The challenge'],['objectives','Objectives'],['methodology','Analytical approach'],['key_findings','Key findings'],['business_insights','Business insights'],['recommendations','Recommendations'],['conclusion','Conclusion']];
export default function ProjectView({ p }: { p: any }) {
  const ok = p.powerbi_embed_url?.startsWith('https://app.powerbi.com/');
  const extra: string[] = [...(p.additional_images ?? []), ...(p.gallery_images ?? [])];
  return (<main className="mx-auto max-w-5xl px-6 py-16">
    {p.cat && <div className="mb-4 inline-block border border-rule"><CategoryBadge cat={p.cat} size="md" /></div>}
    <p className="text-sm font-semibold text-blue">{[p.industry, p.cat ? '' : p.category, p.published_at].filter(Boolean).join(' · ')}</p>
    <h1 className="mt-2 text-4xl md:text-6xl">{p.title}</h1><p className="mt-4 max-w-2xl text-lg text-mute">{p.short_description}</p>
    {p.cover_image_url && <div className="relative my-10 aspect-[16/8]"><Image src={p.cover_image_url} alt={p.title} fill priority sizes="100vw" className="object-cover"/></div>}
    {secs.map(([k, l]) => p[k] && <section key={k} className="grid gap-4 border-t border-rule py-8 md:grid-cols-12"><h2 className="text-2xl md:col-span-4">{l}</h2><div className="whitespace-pre-line leading-relaxed md:col-span-8">{p[k]}</div></section>)}
    {p.show_dashboard && <section className="border-t border-rule py-8"><h2 className="mb-4 text-2xl">{p.dashboard_title || 'Interactive dashboard'}</h2>
      {ok && <div className="aspect-video w-full border border-rule"><iframe src={p.powerbi_embed_url} title={p.dashboard_title || 'Dashboard'} className="h-full w-full" allowFullScreen loading="lazy"/></div>}
      {p.dashboard_external_url && <a className="btn mt-4" href={p.dashboard_external_url} target="_blank" rel="noopener noreferrer">Open dashboard in a new tab</a>}</section>}
    {extra.length > 0 && <div className="grid gap-4 md:grid-cols-2">{extra.map(u => <div key={u} className="relative aspect-video"><Image src={u} alt="" fill sizes="50vw" className="object-cover"/></div>)}</div>}
  </main>);
}
