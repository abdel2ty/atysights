import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
const pub = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
const fetchCats = async () => { const { data } = await pub().from('categories').select('id,name,logo_url').order('sort_order').order('created_at'); return (data ?? []) as { id: string; name: string; logo_url: string }[]; };
export const getCategories = unstable_cache(fetchCats, ['pub-cats'], { revalidate: 60, tags: ['categories'] });
export const getPublished = unstable_cache(async () => {
  const [{ data }, cats] = await Promise.all([pub().from('projects').select('*').eq('status', 'published').order('featured', { ascending: false }).order('sort_order').order('published_at', { ascending: false }), fetchCats()]);
  return (data ?? []).map((p: any) => ({ ...p, cat: cats.find(c => c.id === p.category_id) ?? null }));
}, ['pub-list'], { revalidate: 60, tags: ['projects', 'categories'] });
export const getProject = (slug: string) => unstable_cache(async () => {
  const { data } = await pub().from('projects').select('*').eq('slug', slug).eq('status', 'published').maybeSingle(); if (!data) return null;
  const cats = await fetchCats(); return { ...data, cat: cats.find(c => c.id === (data as any).category_id) ?? null };
}, ['pub-one', slug], { revalidate: 60, tags: ['projects', 'categories'] })();
export const getClients = unstable_cache(async () => {
  const { data } = await pub().from('clients').select('*').eq('visible', true).order('sort_order').order('created_at');
  return data ?? [];
}, ['pub-clients'], { revalidate: 60, tags: ['clients'] });
