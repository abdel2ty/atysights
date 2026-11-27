'use server';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/supabase/server';
const txt = ['business_context','problem_statement','objectives','methodology','key_findings','business_insights','recommendations','conclusion','industry','category','dashboard_title','seo_title','seo_description','cover_image_url','dashboard_external_url'] as const;
const url = z.string().trim().refine(v => !v || /^https:\/\//.test(v), 'URLs must start with https://');
const schema = z.object({ title: z.string().trim().min(1, 'Title is required'), slug: z.string().trim(), short_description: z.string().trim(), powerbi_embed_url: url, cover_image_url: url, dashboard_external_url: url });
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const lines = (v: FormDataEntryValue | null) => String(v ?? '').split('\n').map(x => x.trim()).filter(x => /^https:\/\//.test(x));
const KINDS = ['system', 'analytics', 'ai'];
const back = (id: string, msg: string): never => redirect(`/admin/edit/${id}?err=${encodeURIComponent(msg)}`);
const refresh = () => { revalidatePath('/', 'layout'); revalidateTag('projects'); };
export async function save(fd: FormData) {
  const s = await requireAdmin(); const id = String(fd.get('id'));
  const p = schema.safeParse(Object.fromEntries(fd));
  if (!p.success) return back(id, p.error.issues[0].message);
  let links: { label: string; url: string }[] = [];
  try { const raw = JSON.parse(String(fd.get('links_json') ?? '[]')) as { label?: string; url?: string }[]; links = raw.map(r => ({ label: String(r.label ?? '').trim(), url: String(r.url ?? '').trim() })).filter(r => r.label || r.url); } catch { return back(id, 'The links could not be read'); }
  if (links.some(l => !l.label || !/^https:\/\//.test(l.url))) return back(id, 'Each link needs a name and an address starting with https://');
  const tech = String(fd.get('tech') ?? '').split(',').map(x => x.trim()).filter(Boolean).slice(0, 12);
  const k = String(fd.get('kind'));
  const row: Record<string, any> = { ...p.data, slug: p.data.slug ? slugify(p.data.slug) : slugify(p.data.title), kind: KINDS.includes(k) ? k : 'system', links, tech,
    status: fd.get('status') === 'published' ? 'published' : 'draft', featured: fd.get('featured') === 'on', show_dashboard: fd.get('show_dashboard') === 'on',
    sort_order: Number(fd.get('sort_order') || 0), published_at: fd.get('published_at') || null,
    additional_images: lines(fd.get('additional_images')), gallery_images: lines(fd.get('gallery_images')), updated_at: new Date().toISOString() };
  for (const key of txt) row[key] = String(fd.get(key) ?? '').trim() || null;
  const { error } = id === 'new' ? await s.from('projects').insert(row) : await s.from('projects').update(row).eq('id', id);
  if (error) return back(id, error.message.includes('slug') ? 'That slug is already used' : error.message);
  refresh(); redirect('/admin/projects');
}
export async function toggle(fd: FormData) {
  const s = await requireAdmin(); const f = String(fd.get('field')) === 'featured' ? 'featured' : 'status';
  const cur = String(fd.get('cur')); const v = f === 'featured' ? cur !== 'true' : cur === 'published' ? 'draft' : 'published';
  await s.from('projects').update({ [f]: v }).eq('id', String(fd.get('id'))); refresh();
}
export async function duplicate(fd: FormData) {
  const s = await requireAdmin(); const { data } = await s.from('projects').select('*').eq('id', String(fd.get('id'))).single(); if (!data) return;
  const { id, created_at, updated_at, ...rest } = data;
  await s.from('projects').insert({ ...rest, title: `${rest.title} (copy)`, slug: `${rest.slug}-copy-${Math.random().toString(36).slice(2, 6)}`, status: 'draft', featured: false }); refresh();
}
export async function remove(fd: FormData) { const s = await requireAdmin(); await s.from('projects').delete().eq('id', String(fd.get('id'))); refresh(); }
export async function signOut() { const s = await requireAdmin(); await s.auth.signOut(); redirect('/admin/login'); }
export async function addClient(fd: FormData) {
  const s = await requireAdmin();
  const name = String(fd.get('name') ?? '').trim(), logo = String(fd.get('logo_url') ?? '').trim(), site = String(fd.get('website_url') ?? '').trim();
  if (!name || !/^https:\/\//.test(logo)) redirect('/admin/clients?err=' + encodeURIComponent('Name and an https logo link are required'));
  if (site && !/^https:\/\//.test(site)) redirect('/admin/clients?err=' + encodeURIComponent('Website must start with https://'));
  const { error } = await s.from('clients').insert({ name, logo_url: logo, website_url: site || null, sort_order: Number(fd.get('sort_order') || 0) });
  if (error) redirect('/admin/clients?err=' + encodeURIComponent(error.message));
  revalidatePath('/', 'layout'); revalidateTag('clients'); redirect('/admin/clients');
}
export async function toggleClient(fd: FormData) {
  const s = await requireAdmin(); await s.from('clients').update({ visible: String(fd.get('cur')) !== 'true' }).eq('id', String(fd.get('id')));
  revalidatePath('/', 'layout'); revalidateTag('clients');
}
export async function removeClient(fd: FormData) {
  const s = await requireAdmin(); await s.from('clients').delete().eq('id', String(fd.get('id'))); revalidatePath('/', 'layout'); revalidateTag('clients');
}
