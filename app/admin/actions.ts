'use server';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/supabase/server';
const txt = ['business_context','problem_statement','objectives','methodology','key_findings','business_insights','recommendations','conclusion','industry','category','dashboard_title','seo_title','seo_description','cover_image_url','dashboard_external_url'] as const;
const url = z.string().trim().refine(v => !v || /^https:\/\//.test(v), 'URLs must start with https://');
const schema = z.object({ title: z.string().trim().min(1,'Title is required'), slug: z.string().trim(), short_description: z.string().trim(), powerbi_embed_url: url, cover_image_url: url, dashboard_external_url: url });
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const lines = (v: FormDataEntryValue | null) => String(v ?? '').split('\n').map(x=>x.trim()).filter(x=>/^https:\/\//.test(x));
export async function save(fd: FormData) {
  const s = await requireAdmin();
  const p = schema.safeParse(Object.fromEntries(fd));
  if (!p.success) redirect(`/admin/edit/${fd.get('id')}?err=${encodeURIComponent(p.error.issues[0].message)}`);
  const row: Record<string, any> = { ...p.data, slug: p.data.slug ? slugify(p.data.slug) : slugify(p.data.title),
    status: fd.get('status') === 'published' ? 'published' : 'draft', featured: fd.get('featured') === 'on', show_dashboard: fd.get('show_dashboard') === 'on',
    sort_order: Number(fd.get('sort_order') || 0), published_at: fd.get('published_at') || null,
    additional_images: lines(fd.get('additional_images')), gallery_images: lines(fd.get('gallery_images')), updated_at: new Date().toISOString() };
  for (const k of txt) row[k] = String(fd.get(k) ?? '').trim() || null;
  const id = String(fd.get('id'));
  const { error } = id === 'new' ? await s.from('projects').insert(row) : await s.from('projects').update(row).eq('id', id);
  if (error) redirect(`/admin/edit/${id}?err=${encodeURIComponent(error.message.includes('slug') ? 'That slug is already used' : error.message)}`);
  revalidatePath('/', 'layout'); revalidateTag('projects'); redirect('/admin');
}
export async function toggle(fd: FormData) {
  const s = await requireAdmin(); const f = String(fd.get('field')) === 'featured' ? 'featured' : 'status';
  const cur = String(fd.get('cur')); const v = f === 'featured' ? cur !== 'true' : cur === 'published' ? 'draft' : 'published';
  await s.from('projects').update({ [f]: v }).eq('id', String(fd.get('id'))); revalidatePath('/', 'layout'); revalidateTag('projects');
}
export async function remove(fd: FormData) { const s = await requireAdmin(); await s.from('projects').delete().eq('id', String(fd.get('id'))); revalidatePath('/', 'layout'); revalidateTag('projects'); }
export async function signOut() { const s = await requireAdmin(); await s.auth.signOut(); redirect('/admin/login'); }
