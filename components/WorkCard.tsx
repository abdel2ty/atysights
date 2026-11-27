import Link from 'next/link';
import Image from 'next/image';
import { KINDS, type Kind } from '@/lib/content';
export default function WorkCard({ p }: { p: any }) {
  const kind: string = KINDS[p.kind as Kind] ?? KINDS.system, live = Array.isArray(p.links) && p.links.length > 0, tech: string[] = (p.tech ?? []).slice(0, 3);
  return (<Link href={`/projects/${p.slug}`} className="group block">
    <div className={`relative mb-4 aspect-[4/3] overflow-hidden ${p.cover_image_url ? 'bg-ink' : 'graph border border-rule'}`}>
      {p.cover_image_url && <Image src={p.cover_image_url} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
      <span className="absolute left-0 top-0 z-10 bg-ink px-3 py-1 text-xs font-bold text-white">{kind}</span>
      {live && <span className="absolute right-3 top-3 z-10 flex items-center gap-1.5 bg-white px-2 py-1 text-xs font-bold"><i className="live-dot" />Live</span>}
    </div>
    <p className="text-sm font-semibold text-blue">{p.industry}</p><h3 className="text-2xl group-hover:underline">{p.title}</h3><p className="mt-2 text-sm text-mute">{p.short_description}</p>
    {tech.length > 0 && <ul className="mt-3 flex flex-wrap gap-1.5">{tech.map(t => <li key={t} className="border border-rule px-2 py-0.5 text-xs text-mute">{t}</li>)}</ul>}
  </Link>);
}
