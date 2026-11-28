'use client';
import { useEffect, useState } from 'react';
const D = { Revenue: [42, 55, 48, 70, 64, 88], Margin: [28, 26, 25, 21, 19, 15], Cost: [30, 34, 39, 47, 52, 61] } as const;
const N = { Revenue: 'Revenue keeps climbing.', Margin: 'Margin shrinks as it does.', Cost: 'Costs outgrow sales.' } as const;
const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
type K = keyof typeof D;
const KEYS = Object.keys(D) as K[];
export default function MiniDash() {
  const [s, setS] = useState<{ t: K; h: number }>({ t: 'Revenue', h: 0 }); const [manual, setManual] = useState(false);
  useEffect(() => { if (manual) return; const id = setInterval(() => setS(c => (c.h < 5 ? { t: c.t, h: c.h + 1 } : { t: KEYS[(KEYS.indexOf(c.t) + 1) % KEYS.length], h: 0 })), 1300); return () => clearInterval(id); }, [manual]);
  const { t, h } = s; const v: readonly number[] = D[t]; const max = Math.max(...v);
  const pickTab = (k: K) => { setManual(true); setS({ t: k, h: 5 }); }; const pickBar = (i: number) => { setManual(true); setS({ t, h: i }); };
  return (<div className="relative z-20 bg-ink p-4 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,.5)]">
    <div className="flex gap-1 text-xs font-semibold">{KEYS.map(k => <button key={k} onClick={() => pickTab(k)} aria-pressed={t === k} className={`px-2.5 py-1 transition-colors ${t === k ? 'bg-blue' : 'text-white/60 hover:text-white'}`}>{k}</button>)}</div>
    <p className="mt-3 text-3xl font-extrabold tabular-nums">{v[h]}{t === 'Margin' ? '%' : 'k'}<span className="ml-2 text-xs font-medium text-white/50">{M[h]}</span></p>
    <div className="mt-3 flex h-24 items-end gap-2">{v.map((x, i) => <button key={i} aria-label={`${M[i]} ${x}`} onMouseEnter={() => pickBar(i)} onFocus={() => pickBar(i)} onClick={() => pickBar(i)} className="flex h-full flex-1 items-end"><span className={`block w-full transition-all duration-500 ${i === h ? 'bg-blue' : 'bg-white/25'}`} style={{ height: `${x / max * 100}%` }} /></button>)}</div>
    <div className="mt-1 flex gap-2 text-[10px] text-white/40">{M.map(m => <span key={m} className="flex-1 text-center">{m}</span>)}</div>
    <p className="mt-3 text-xs font-semibold">{N[t]} <span className="font-normal text-white/40">Illustrative.</span></p></div>);
}
