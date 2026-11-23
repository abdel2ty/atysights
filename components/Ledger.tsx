'use client';
import { useEffect, useState } from 'react';
const R = [['Product A','128,400','31%'],['Product B','97,250','4%'],['Product C','76,900','22%'],['Branch North','64,100','−3%'],['Branch South','58,730','19%'],['Delivery costs','41,200','—'],['Support costs','35,800','—']];
const H: [number, string][] = [[1, 'Sells well. Earns little.'], [3, 'Short of target, every quarter.'], [5, 'Growing, and nobody noticed.']];
const ROW = 48;
export default function Ledger() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % H.length), 3200); return () => clearInterval(t); }, []);
  const [row, note] = H[i];
  return (<div className="relative md:-rotate-2 md:transition-transform md:duration-500 md:hover:rotate-0">
    <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rotate-2 bg-blue/30" />
    <div className="graph border border-rule p-5 text-ink shadow-[0_1px_2px_rgba(0,0,0,.08),0_6px_14px_-8px_rgba(0,0,0,.18)] md:shadow-[0_1px_2px_rgba(0,0,0,.08),0_14px_28px_-10px_rgba(0,0,0,.2),0_44px_90px_-24px_rgba(0,0,0,.3)]">
      <div className="flex items-baseline justify-between border-b-2 border-ink pb-3 text-sm font-bold"><span>Quarterly statement</span><span className="font-medium text-mute">Illustrative data</span></div>
      <div className="flex px-2 py-2 text-xs font-semibold text-mute"><span className="flex-1">Item</span><span className="w-24 text-right">Revenue</span><span className="w-16 text-right">Margin</span></div>
      <div className="relative">
        <div aria-hidden className="absolute inset-x-0 border-l-4 border-blue bg-blue/20 transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]" style={{ height: ROW, transform: `translateY(${row * ROW}px)` }} />
        {R.map(([a, b, c]) => <div key={a} className="relative flex items-center border-b border-rule px-2 text-sm tabular-nums" style={{ height: ROW }}><span className="flex-1 font-semibold">{a}</span><span className="w-24 text-right">{b}</span><span className="w-16 text-right">{c}</span></div>)}
        <span key={i} className="pop absolute right-0 z-10 bg-blue px-3 py-1.5 text-xs font-bold text-white shadow-lg" style={{ top: row * ROW - 14 }}>{note}</span>
      </div></div></div>);
}
