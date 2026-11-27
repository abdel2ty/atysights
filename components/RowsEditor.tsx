'use client';
import { useState } from 'react';
type F = { k: string; label: string; ph?: string; area?: boolean };
type Row = Record<string, string>;
export default function RowsEditor({ name, fields, defaultValue, addLabel = 'Add' }: { name: string; fields: F[]; defaultValue: Row[]; addLabel?: string }) {
  const blank = (): Row => Object.fromEntries(fields.map(f => [f.k, '']));
  const [rows, setRows] = useState<Row[]>(defaultValue.length ? defaultValue : [blank()]);
  const up = (i: number, k: string, v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const mv = (i: number, d: number) => { const n = [...rows]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; setRows(n); };
  return (<div><input type="hidden" name={name} value={JSON.stringify(rows)} />
    <div className="space-y-3">{rows.map((r, i) => <div key={i} className="border border-rule p-3">
      <div className="grid gap-2 sm:grid-cols-2">{fields.map(f => <div key={f.k} className={f.area ? 'sm:col-span-2' : ''}>{f.area
        ? <textarea aria-label={f.label} placeholder={f.label + (f.ph ? ': ' + f.ph : '')} rows={4} value={r[f.k]} onChange={e => up(i, f.k, e.target.value)} className="field" />
        : <input aria-label={f.label} placeholder={f.ph ?? f.label} value={r[f.k]} onChange={e => up(i, f.k, e.target.value)} className="field" />}</div>)}</div>
      <div className="mt-2 flex gap-4 text-xs font-semibold"><button type="button" disabled={i === 0} onClick={() => mv(i, -1)} className="disabled:opacity-30">Move up</button><button type="button" disabled={i === rows.length - 1} onClick={() => mv(i, 1)} className="disabled:opacity-30">Move down</button><button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="ml-auto text-red-700">Remove</button></div></div>)}</div>
    <button type="button" onClick={() => setRows([...rows, blank()])} className="btn-o mt-3">{addLabel}</button></div>);
}
