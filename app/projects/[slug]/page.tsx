import { notFound } from 'next/navigation';
import { getProject } from '@/lib/supabase/public';
import ProjectView from '@/components/ProjectView';
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProject((await params).slug); if (!p) return {};
  const t = p.seo_title || p.title, d = p.seo_description || p.short_description;
  return { title: t, description: d, openGraph: { title: t, description: d, images: p.cover_image_url ? [p.cover_image_url] : undefined } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProject((await params).slug); if (!p) notFound();
  return <ProjectView p={p} />;
}
