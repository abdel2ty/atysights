'use client';
import { useState } from 'react';
type L = { label: string; url: string };
export default function LinksEditor({ defaultValue }: { defaultValue: L[] }) {
  const [rows, setRows] = useState<L[]>(defaultValue.length ? defaultValue : [{ label: '', url: '' }]);
  const up = (i: number, k: keyof L, v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  return (<div><input type="hidden" name="links_json" value={JSON.stringify(rows)} />
    <div className="space-y-2">{rows.map((r, i) => <div key={i} className="grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[12rem_1fr_auto]">
      <input aria-label="Link name" placeholder="Name, e.g. Coffee shop 1" value={r.label} onChange={e => up(i, 'label', e.target.value)} className="field col-span-2 sm:col-span-1" />
      <input aria-label="Link address" placeholder="https://" value={r.url} onChange={e => up(i, 'url', e.target.value)} className="field" />
      <button type="button" aria-label="Remove link" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="px-3 text-xl text-mute hover:text-ink">×</button></div>)}</div>
    <button type="button" onClick={() => setRows([...rows, { label: '', url: '' }])} className="btn-o mt-3">Add a link</button></div>);
}
