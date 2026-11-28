'use client';
import { useState } from 'react';
const total: [string, number, number][] = [['All products', 100, 18]];
const deep: [string, number, number][] = [['Product A', 100, 35], ['Product B', 75, 22], ['Product C', 50, 2], ['Product D', 25, 0]];
export default function Lens() {
  const [d, setD] = useState(false); const rows = d ? deep : total;
  return (<div className="border-2 border-ink p-6 md:p-8">
    <div className="flex flex-wrap items-center justify-between gap-4"><p className="font-bold">{d ? 'Revenue and profit, product by product' : 'Revenue and profit, all products'}</p>
      <button onClick={() => setD(!d)} aria-pressed={d} className="btn">{d ? 'Back to the total' : 'Look closer'}</button></div>
    <div key={String(d)} className="mt-8 space-y-6">{rows.map(([n, r, p], i) => (<div key={n}>
      <div className="mb-2 flex justify-between text-sm font-semibold"><span>{n}</span><span className="text-blue">{d && p === 0 ? 'loses money' : d && p < 5 ? 'barely profitable' : ''}</span></div>
      <div className="h-4 bg-rule"><div className="barx h-4 bg-ink" style={{ width: `${r}%`, ['--d' as any]: `${i * .12}s` }} /></div>
      <div className="mt-1 h-4 bg-rule"><div className="barx h-4 bg-blue" style={{ width: `${p}%`, ['--d' as any]: `${.2 + i * .12}s` }} /></div></div>))}</div>
    <div className="mt-8 flex flex-wrap gap-6 text-sm"><span><b className="mr-2 inline-block h-3 w-3 bg-ink" />Revenue</span><span><b className="mr-2 inline-block h-3 w-3 bg-blue" />Profit</span></div>
    <p className="mt-4 text-lg font-semibold">{d ? 'Product C earns almost nothing and D loses money. The total hid both.' : 'Revenue looks healthy. Profit looks acceptable.'}</p>
    <p className="mt-1 text-xs text-mute">Illustrative example, not client data.</p></div>);
}
