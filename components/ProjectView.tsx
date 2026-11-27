import Image from 'next/image';
const legacy: [string, string][] = [['business_context', 'Context'], ['problem_statement', 'The need'], ['objectives', 'Goals'], ['methodology', 'Approach'], ['key_findings', 'Results'], ['business_insights', 'Insights'], ['recommendations', 'Next steps'], ['conclusion', 'Summary']];
export default function ProjectView({ p }: { p: any }) {
  const embed: string = p.powerbi_embed_url ?? '', okEmbed = /^https:\/\//.test(embed), pbi = embed.startsWith('https://app.powerbi.com/');
  const links: { label: string; url: string }[] = Array.isArray(p.links) ? p.links : [], tech: string[] = Array.isArray(p.tech) ? p.tech : [], facts: { label: string; value: string }[] = Array.isArray(p.facts) ? p.facts : [];
  const blocks: { title: string; body: string }[] = [...legacy.filter(([k]) => p[k]).map(([k, t]) => ({ title: t, body: p[k] as string })), ...(Array.isArray(p.blocks) ? p.blocks : [])];
  const extra: string[] = [...(p.additional_images ?? []), ...(p.gallery_images ?? [])];
  return (<main className="wrap"><div className="sh"><span className="mono">{p.category || 'Project'}</span><span className="mono">{String(p.published_at ?? '').slice(0, 4)}</span></div>
    <div className="proj"><aside className="meta">
      <dl>{p.industry && <div><dt>Client</dt><dd>{p.industry}</dd></div>}{facts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
      {tech.length > 0 && <div><p className="mono" style={{ marginBottom: 8 }}>Built with</p><ul className="chips">{tech.map(t => <li key={t}>{t}</li>)}</ul></div>}
      {links.length > 0 && <div style={{ display: 'grid', gap: 8 }}>{links.map((l, i) => <a key={l.url + i} href={l.url} target="_blank" rel="noopener noreferrer" className={`bt ${i ? 'o' : ''}`} style={{ justifyContent: 'space-between' }}>{l.label}<span className="live-dot" style={i ? { background: '#0a0a0a' } : { background: '#fff' }} /></a>)}</div>}</aside>
      <article><h1 className="l">{p.title}</h1><p className="lead" style={{ marginTop: 16 }}>{p.short_description}</p>
        {p.cover_image_url && <figure style={{ margin: '32px 0 0' }}><div className="fig"><div className="cap"><span className="mono">Fig. 01</span><span className="mono">{p.title}</span></div><div style={{ position: 'relative', aspectRatio: '16/9' }}><Image src={p.cover_image_url} alt={p.title} fill priority sizes="(min-width:900px) 900px, 100vw" className="object-cover" /></div></div></figure>}
        <div style={{ marginTop: 32 }}>{blocks.map((b, i) => <section key={i} className="blk"><span className="mono">{String(i + 1).padStart(2, '0')}</span><div><h2>{b.title}</h2><div className="tx">{b.body}</div></div></section>)}</div>
        {p.show_dashboard && okEmbed && <section style={{ marginTop: 16 }}><div className="win"><div className="bar"><i /><i /><i /><span className="mono">{p.dashboard_title || 'Live view'}</span></div><div style={{ aspectRatio: '16/9' }}><iframe src={embed} title={p.dashboard_title || 'Embedded view'} style={{ width: '100%', height: '100%', border: 0 }} allowFullScreen loading="lazy" {...(pbi ? {} : { sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups' })} /></div></div>
          {p.dashboard_external_url && <a className="bt o" style={{ marginTop: 14 }} href={p.dashboard_external_url} target="_blank" rel="noopener noreferrer">Open in a new tab</a>}</section>}
        {extra.length > 0 && <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>{extra.map((u, i) => <figure key={u} style={{ margin: 0 }}><div className="fig"><div className="cap"><span className="mono">Fig. {String(i + 2).padStart(2, '0')}</span></div><div style={{ position: 'relative', aspectRatio: '16/9' }}><Image src={u} alt="" fill sizes="(min-width:900px) 900px, 100vw" className="object-cover" /></div></div></figure>)}</div>}
      </article></div></main>);
}
