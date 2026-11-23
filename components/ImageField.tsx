'use client';
import { useState } from 'react';
export default function ImageField({ name, label, defaultValue = '' }: { name: string; label: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  async function up(f?: File) {
    if (!f) return; setBusy(true); setErr('');
    try {
      const k = await (await fetch('/api/cloudinary-sign', { method: 'POST' })).json(); if (k.error) throw new Error(k.error);
      const fd = new FormData(); fd.append('file', f); fd.append('api_key', k.apiKey); fd.append('timestamp', k.timestamp); fd.append('folder', k.folder); fd.append('signature', k.signature);
      const r = await (await fetch(`https://api.cloudinary.com/v1_1/${k.cloud}/image/upload`, { method: 'POST', body: fd })).json();
      if (!r.secure_url) throw new Error(r.error?.message || 'Upload failed'); setUrl(r.secure_url);
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  }
  return (<div><label className="mb-1 block text-sm font-medium">{label}</label>
    <input name={name} value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste an image URL, or upload below" className="field"/>
    <input type="file" accept="image/*" onChange={e=>up(e.target.files?.[0])} className="mt-2 text-sm"/>
    {busy && <p className="text-sm text-mute">Uploading…</p>}{err && <p className="text-sm text-red-700">{err}</p>}
    {url && /^https?:/.test(url) && <img src={url} alt="Preview" className="mt-2 h-32 border border-rule object-cover"/>}</div>);
}
