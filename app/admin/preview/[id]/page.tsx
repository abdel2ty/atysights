import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/supabase/server';
import ProjectView from '@/components/ProjectView';
export const metadata = { robots: { index: false } };
export default async function Pv({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const s = await requireAdmin();
  const { data: p } = await s.from('projects').select('*').eq('id', id).maybeSingle(); if (!p) notFound();
  return (<><div className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-2 bg-blue px-6 py-3 text-sm font-semibold text-white"><span>Preview · {p.status === 'published' ? 'Published' : 'Draft, not visible to the public'}</span>
    <span className="flex gap-4"><Link href={`/admin/edit/${p.id}`} className="underline">Back to editor</Link><Link href="/admin/projects" className="underline">Projects</Link></span></div><ProjectView p={p} /></>);
}
