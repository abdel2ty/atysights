import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
const pub = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
export const getPublished = unstable_cache(async () => {
  const { data } = await pub().from('projects').select('*').eq('status', 'published').order('featured', { ascending: false }).order('sort_order').order('published_at', { ascending: false });
  return data ?? [];
}, ['pub-list'], { revalidate: 60, tags: ['projects'] });
export const getProject = (slug: string) => unstable_cache(async () => {
  const { data } = await pub().from('projects').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  return data;
}, ['pub-one', slug], { revalidate: 60, tags: ['projects'] })();
export const getClients = unstable_cache(async () => {
  const { data } = await pub().from('clients').select('*').eq('visible', true).order('sort_order').order('created_at');
  return data ?? [];
}, ['pub-clients'], { revalidate: 60, tags: ['clients'] });
