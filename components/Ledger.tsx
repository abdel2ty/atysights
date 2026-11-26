'use client';
import { useEffect, useState } from 'react';
const R = [['Product A','128,400','31%','Strong margin and steady. The reference point.'],['Product B','97,250','4%','Sells well. Earns little.'],['Product C','76,900','22%','Healthy, but watch the trend.'],['Branch North','64,100','−3%','Short of target, every quarter.'],['Branch South','58,730','19%','On target.'],['Delivery costs','41,200','—','Growing, and nobody noticed.'],['Support costs','35,800','—','Small today. Rising each quarter.']];
const AUTO = [1, 3, 5]; const ROW = 48;
export default function Ledger() {
  const [row, setRow] = useState(1); const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto) return; let k = 0; const t = setInterval(() => { k = (k + 1) % AUTO.length; setRow(AUTO[k]); }, 3200); return () => clearInterval(t); }, [auto]);
  return (<div className="relative md:-rotate-2 md:transition-transform md:duration-500 md:hover:rotate-0">
    <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rotate-2 bg-blue/30" />
    <div className="graph border border-rule p-3 text-ink shadow-[0_1px_2px_rgba(0,0,0,.08),0_6px_14px_-8px_rgba(0,0,0,.18)] sm:p-5 md:shadow-[0_1px_2px_rgba(0,0,0,.08),0_14px_28px_-10px_rgba(0,0,0,.2),0_44px_90px_-24px_rgba(0,0,0,.3)]">
      <div className="flex items-baseline justify-between border-b-2 border-ink pb-3 text-sm font-bold"><span>Quarterly statement</span><span className="text-xs font-medium text-mute">Illustrative. Select a row.</span></div>
      <div className="flex px-2 py-2 text-xs font-semibold text-mute"><span className="flex-1">Item</span><span className="w-20 text-right sm:w-24">Revenue</span><span className="w-14 text-right sm:w-16">Margin</span></div>
      <div className="relative">
        <div aria-hidden className="absolute inset-x-0 border-l-4 border-blue bg-blue/20 transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]" style={{ height: ROW, transform: `translateY(${row * ROW}px)` }} />
        {R.map(([a, b, c], k) => <button key={a} onClick={() => { setAuto(false); setRow(k); }} aria-pressed={row === k} className="relative flex w-full items-center border-b border-rule px-2 text-left text-sm tabular-nums" style={{ height: ROW }}><span className="flex-1 font-semibold">{a}</span><span className="w-20 text-right sm:w-24">{b}</span><span className="w-14 text-right sm:w-16">{c}</span></button>)}
        <span key={row} className="pop pointer-events-none absolute right-0 z-10 max-w-[80%] bg-blue px-3 py-1.5 text-xs font-bold text-white shadow-lg" style={{ top: row * ROW - 14 }}>{R[row][3]}</span>
      </div></div></div>);
}
