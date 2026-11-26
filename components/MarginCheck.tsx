'use client';
import { useState } from 'react';
import Link from 'next/link';
type R = { n: string; r: string; c: string };
const init: R[] = [{ n: 'Product A', r: '12000', c: '7000' }, { n: 'Product B', r: '9000', c: '8700' }, { n: 'Product C', r: '6000', c: '6500' }];
const pct = (v: number) => (v * 100).toFixed(1) + '%';
export default function MarginCheck() {
  const [rows, setRows] = useState<R[]>(init);
  const up = (i: number, k: keyof R, v: string) => setRows(rows.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const data = rows.map(x => { const r = parseFloat(x.r) || 0, c = parseFloat(x.c) || 0; return { n: x.n || 'Unnamed item', rev: r, profit: r - c, m: r > 0 ? (r - c) / r : 0 }; }).filter(x => x.rev > 0);
  const rev = data.reduce((a, x) => a + x.rev, 0), pr = data.reduce((a, x) => a + x.profit, 0), om = rev > 0 ? pr / rev : 0;
  const sorted = [...data].sort((a, b) => a.m - b.m), flagged = sorted.filter(x => x.m < om * 0.5);
  const top = [...data].sort((a, b) => b.rev - a.rev)[0];
  const inp = 'field';
  return (<div className="grid gap-8 md:grid-cols-12">
    <div className="graph border border-rule p-4 md:col-span-6 md:p-6"><h2 className="text-lg">Your products, services or branches</h2>
      <div className="mt-4 grid grid-cols-[1fr_5.5rem_5.5rem_2rem] gap-2 text-xs font-semibold text-mute"><span>Name</span><span>Revenue</span><span>Cost</span><span /></div>
      <div className="mt-2 space-y-2">{rows.map((x, i) => <div key={i} className="grid grid-cols-[1fr_5.5rem_5.5rem_2rem] gap-2">
        <input aria-label="Name" className={inp} value={x.n} onChange={e => up(i, 'n', e.target.value)} /><input aria-label="Revenue" inputMode="decimal" className={inp} value={x.r} onChange={e => up(i, 'r', e.target.value)} /><input aria-label="Cost" inputMode="decimal" className={inp} value={x.c} onChange={e => up(i, 'c', e.target.value)} />
        <button aria-label="Remove row" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-lg text-mute hover:text-ink">×</button></div>)}</div>
      <button onClick={() => setRows([...rows, { n: '', r: '', c: '' }])} className="btn-o mt-4">Add a row</button>
      <p className="mt-4 text-xs text-mute">Everything stays in your browser. Nothing you type is sent or stored.</p></div>
    <div className="md:col-span-6">
      <div className="grid grid-cols-3 gap-3">{[['Revenue', rev.toLocaleString('en-GB', { maximumFractionDigits: 0 })], ['Profit', pr.toLocaleString('en-GB', { maximumFractionDigits: 0 })], ['Margin', pct(om)]].map(([l, v]) => <div key={l} className="relative border border-rule p-4"><span className="absolute left-0 top-0 h-0.5 w-8 bg-blue" /><p className="text-2xl font-extrabold tabular-nums md:text-3xl">{v}</p><p className="text-sm text-mute">{l}</p></div>)}</div>
      <ul className="mt-6 space-y-4">{sorted.map(x => <li key={x.n + x.rev}><div className="flex justify-between text-sm font-semibold"><span>{x.n}</span><span className={x.m < 0 ? 'text-red-700' : ''}>{pct(x.m)}</span></div>
        <div className="mt-1 h-3 bg-rule"><div className={`h-3 transition-all duration-500 ${x.m < om * 0.5 ? 'bg-ink' : 'bg-blue'}`} style={{ width: `${Math.max(0, Math.min(x.m, 0.6)) / 0.6 * 100}%` }} /></div></li>)}</ul>
      <div className="mt-6 border-l-4 border-blue pl-4">{data.length < 2 ? <p>Add at least two items to compare them.</p> : <>
        <p className="font-semibold">Your overall margin is {pct(om)}.</p>
        {top && <p className="mt-2">{top.n} brings in {pct(top.rev / rev)} of revenue at a {pct(top.m)} margin.</p>}
        <p className="mt-2">{flagged.length ? <>{flagged.map(x => x.n).join(', ')} earn well below your average. These are the first places to look.</> : 'No item sits far below your average margin.'}</p></>}</div>
      <p className="mt-4 text-sm text-mute">This is a first look. A full analysis also accounts for shared costs such as rent, staff and advertising, and for how each item changes over time.</p>
      <Link href="/contact" className="btn mt-6">Discuss the full picture</Link></div></div>);
}
