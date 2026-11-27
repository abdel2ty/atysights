'use client';
import { useEffect, useState } from 'react';
type N = { id: string; label: string; cap: string; col: 'in' | 'hub' | 'out' };
const NODES: N[] = [
  { id: 'pos', label: 'Point of sale', cap: 'Sales, shifts and receipts, captured cleanly at the source.', col: 'in' },
  { id: 'inv', label: 'Inventory', cap: 'Stock levels, suppliers and costs in one reliable record.', col: 'in' },
  { id: 'cus', label: 'Orders & customers', cap: 'Who bought what, when, and how often they come back.', col: 'in' },
  { id: 'hub', label: 'Your data', cap: 'One clean foundation. Everything else depends on it.', col: 'hub' },
  { id: 'dash', label: 'Dashboards', cap: 'Live Power BI and web dashboards for owners and managers.', col: 'out' },
  { id: 'fc', label: 'Forecasts', cap: 'Models that estimate demand, stock needs and revenue.', col: 'out' },
  { id: 'ai', label: 'AI assistant', cap: 'Answers from your data and cites the record each answer came from.', col: 'out' },
];
type Box = { x: number; y: number; w: number; h: number };
function box(n: N, v: boolean): Box {
  const ins = NODES.filter(a => a.col === 'in'), outs = NODES.filter(a => a.col === 'out');
  if (n.col === 'hub') return v ? { x: 80, y: 200, w: 180, h: 64 } : { x: 225, y: 170, w: 150, h: 82 };
  const list = n.col === 'in' ? ins : outs, i = list.indexOf(n);
  if (v) return { x: 6 + i * 112, y: n.col === 'in' ? 14 : 398, w: 104, h: 48 };
  return { x: n.col === 'in' ? 16 : 434, y: 56 + i * 130, w: 150, h: 50 };
}
function path(n: N, v: boolean) {
  const b = box(n, v), h = box(NODES[3], v);
  if (v) { const inn = n.col === 'in', x1 = inn ? b.x + b.w / 2 : h.x + h.w / 2, y1 = inn ? b.y + b.h : h.y + h.h, x2 = inn ? h.x + h.w / 2 : b.x + b.w / 2, y2 = inn ? h.y : b.y, m = (y1 + y2) / 2; return `M${x1},${y1} C${x1},${m} ${x2},${m} ${x2},${y2}`; }
  const inn = n.col === 'in', x1 = inn ? b.x + b.w : h.x + h.w, y1 = inn ? b.y + b.h / 2 : h.y + h.h / 2, x2 = inn ? h.x : b.x, y2 = inn ? h.y + h.h / 2 : b.y + b.h / 2, m = (x1 + x2) / 2;
  return `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`;
}
function Svg({ v, active, setActive }: { v: boolean; active: string; setActive: (id: string) => void }) {
  return (<svg viewBox={v ? '0 0 340 460' : '0 0 600 422'} className={v ? 'mx-auto w-full max-w-sm md:hidden' : 'hidden w-full md:block'} role="group" aria-label="How systems, data and AI connect" style={{ fontFamily: 'var(--font), system-ui, sans-serif' }}>
    {NODES.filter(n => n.col !== 'hub').map(n => { const on = active === n.id || active === 'hub'; return <g key={n.id}><path d={path(n, v)} fill="none" stroke="#E3E6EE" strokeWidth="2" /><path d={path(n, v)} fill="none" stroke={on ? '#0B5FFF' : '#B9C4DA'} strokeWidth={on ? 3 : 2} className="flow" /></g>; })}
    {NODES.map(n => { const b = box(n, v), on = active === n.id, hub = n.col === 'hub', words = n.label.split(' '), two = v && words.length > 1 && n.label.length > 10, mid = Math.ceil(words.length / 2);
      const lines = two ? [words.slice(0, mid).join(' '), words.slice(mid).join(' ')] : [n.label];
      return (<g key={n.id} tabIndex={0} role="button" aria-label={`${n.label}. ${n.cap}`} onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)} onClick={() => setActive(n.id)} style={{ cursor: 'pointer', outline: 'none' }}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={on ? '#0B5FFF' : hub ? '#0A0A0A' : '#fff'} stroke={on ? '#0B5FFF' : '#0A0A0A'} strokeWidth="1.5" style={{ transition: 'fill .3s' }} />
        {lines.map((t, k) => <text key={k} x={b.x + b.w / 2} y={b.y + b.h / 2 + (k - (lines.length - 1) / 2) * 15 + 5} textAnchor="middle" fontSize={hub ? 15 : 13} fontWeight={700} fill={on || hub ? '#fff' : '#0A0A0A'}>{t}</text>)}
      </g>); })}
  </svg>);
}
export default function SystemMap() {
  const [active, setActive] = useState('pos'); const [manual, setManual] = useState(false);
  useEffect(() => { if (manual) return; const ids = NODES.map(n => n.id); const t = setInterval(() => setActive(a => ids[(ids.indexOf(a) + 1) % ids.length]), 2600); return () => clearInterval(t); }, [manual]);
  const pick = (id: string) => { setManual(true); setActive(id); }; const n = NODES.find(x => x.id === active)!;
  return (<div className="fig"><div className="cap"><span className="mono">Fig. 01 · System map</span><span className="mono">Select a part</span></div>
    <div className="bd"><Svg v={false} active={active} setActive={pick} /><Svg v active={active} setActive={pick} />
      <p aria-live="polite" style={{ marginTop: 14, minHeight: '3.2rem', fontSize: '.92rem' }}><b>{n.label}.</b> {n.cap}</p></div></div>);
}
