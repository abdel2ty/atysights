import Image from 'next/image';
import { KINDS, labelsByKind, type Kind } from '@/lib/content';
const order = ['business_context', 'problem_statement', 'objectives', 'methodology', 'key_findings', 'business_insights', 'recommendations', 'conclusion'];
export default function ProjectView({ p }: { p: any }) {
  const kind: Kind = p.kind in KINDS ? p.kind : 'system', L = labelsByKind[kind];
  const embed: string = p.powerbi_embed_url ?? '', okEmbed = /^https:\/\//.test(embed), pbi = embed.startsWith('https://app.powerbi.com/');
  const links: { label: string; url: string }[] = Array.isArray(p.links) ? p.links : [], tech: string[] = p.tech ?? [];
  const extra: string[] = [...(p.additional_images ?? []), ...(p.gallery_images ?? [])];
  return (<main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
    <p className="text-sm font-semibold text-blue">{[KINDS[kind], p.industry, p.published_at].filter(Boolean).join(' · ')}</p>
    <h1 className="mt-2 text-4xl md:text-6xl">{p.title}</h1><p className="mt-4 max-w-2xl text-lg text-mute">{p.short_description}</p>
    {links.length > 0 && <div className="mt-8 flex flex-wrap gap-3">{links.map((l, i) => <a key={l.url + i} href={l.url} target="_blank" rel="noopener noreferrer" className={i === 0 ? 'btn' : 'btn-o'}>Open {l.label}</a>)}</div>}
    {tech.length > 0 && <ul className="mt-6 flex flex-wrap gap-2">{tech.map(t => <li key={t} className="border border-rule px-2.5 py-1 text-sm text-mute">{t}</li>)}</ul>}
    {p.cover_image_url && <div className="relative my-10 aspect-[16/8]"><Image src={p.cover_image_url} alt={p.title} fill priority sizes="100vw" className="object-cover" /></div>}
    {order.map(k => p[k] && <section key={k} className="grid gap-4 border-t border-rule py-8 md:grid-cols-12"><h2 className="text-2xl md:col-span-4">{L[k]}</h2><div className="whitespace-pre-line leading-relaxed md:col-span-8">{p[k]}</div></section>)}
    {p.show_dashboard && <section className="border-t border-rule py-8"><h2 className="mb-4 text-2xl">{p.dashboard_title || (kind === 'analytics' ? 'Interactive dashboard' : 'Live demo')}</h2>
      {okEmbed && <div className="aspect-video w-full border border-rule"><iframe src={embed} title={p.dashboard_title || 'Embedded view'} className="h-full w-full" allowFullScreen loading="lazy" {...(pbi ? {} : { sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups' })} /></div>}
      {p.dashboard_external_url && <a className="btn mt-4" href={p.dashboard_external_url} target="_blank" rel="noopener noreferrer">Open in a new tab</a>}</section>}
    {extra.length > 0 && <div className="grid gap-4 md:grid-cols-2">{extra.map(u => <div key={u} className="relative aspect-video"><Image src={u} alt="" fill sizes="50vw" className="object-cover" /></div>)}</div>}
  </main>);
}
