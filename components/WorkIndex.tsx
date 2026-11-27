'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { Item } from '@/lib/content';
export default function WorkIndex({ items }: { items: Item[] }) {
  const pv = useRef<HTMLDivElement>(null); const [cur, setCur] = useState<Item | null>(null);
  const move = (e: React.PointerEvent) => { if (e.pointerType !== 'mouse' || !pv.current) return; pv.current.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 98}px, 0)`; };
  return (<div className="idx" onPointerMove={move} onPointerLeave={() => setCur(null)}>
    {items.map((it, i) => <Link key={it.slug} href={`/projects/${it.slug}`} className="row" onPointerEnter={() => setCur(it)}>
      <span className="n">{String(i + 1).padStart(2, '0')}</span>
      <span><span className="ti">{it.title}</span>{it.tech.length > 0 && <span className="tech">{it.tech.slice(0, 4).join(' · ')}</span>}</span>
      <span className="c mono-v">{it.category}{it.industry && <><br />{it.industry}</>}</span>
      <span className="y mono-v">{it.year}</span>
      <span className="lv">{it.live && <><i className="live-dot" />Live</>}</span></Link>)}
    <div ref={pv} className={`pv ${cur?.cover ? 'on' : ''}`} aria-hidden>{cur?.cover && <img src={cur.cover} alt="" />}</div></div>);
}
