import type { MetadataRoute } from 'next';
import { getPublished } from '@/lib/supabase/public';
const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const p = await getPublished();
  return [...['', '/services', '/projects', '/about', '/contact'].map(x => ({ url: base + x })), ...p.map(x => ({ url: `${base}/projects/${x.slug}`, lastModified: x.updated_at }))];
}
