export default function ClientsMarquee({ clients }: { clients: any[] }) {
  if (!clients.length) return null;
  let half = [...clients]; while (half.length < 8) half = [...half, ...clients];
  const row = (k: string) => half.map((c, i) => {
    const img = <img src={c.logo_url} alt={c.name} loading="lazy" className="h-10 w-auto max-w-[9rem] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-12" />;
    return <div key={k + i} className="mx-8 flex shrink-0 items-center md:mx-12">{c.website_url ? <a href={c.website_url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>{img}</a> : img}</div>;
  });
  return (<section className="border-b border-rule py-10"><p className="mb-6 text-center text-sm font-semibold text-mute">Businesses we have worked with</p>
    <div className="mq fade-x overflow-hidden"><div className="marquee" style={{ animationDuration: `${half.length * 5}s` }}>{row('a')}{row('b')}</div></div></section>);
}
