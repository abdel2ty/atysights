import Link from 'next/link';
import WorkIndex from '@/components/WorkIndex';
import { getPublished } from '@/lib/supabase/public';
import { toItem } from '@/lib/content';
export const revalidate = 60;
export const metadata = { title: 'Work' };
export default async function P({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams; const all = await getPublished();
  const cats = [...new Set(all.map((p: any) => p.category).filter(Boolean))] as string[];
  const list = all.filter((p: any) => !c || p.category === c);
  return (<main className="wrap"><div className="sh"><span className="mono">Work</span><span className="mono">{list.length} {list.length === 1 ? 'project' : 'projects'}</span></div>
    <h1 className="l" style={{ margin: '36px 0 12px', maxWidth: '14ch' }}>Systems you can open.</h1><p className="lead" style={{ marginTop: 0 }}>Where a project is live, there is a link to try it.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '28px 0 32px' }}><Link href="/projects" className={`chip ${!c ? 'on' : ''}`}>All</Link>{cats.map(k => <Link key={k} href={`/projects?c=${encodeURIComponent(k)}`} className={`chip ${c === k ? 'on' : ''}`}>{k}</Link>)}</div>
    {list.length ? <WorkIndex items={list.map(toItem)} /> : <p className="lead">No projects here yet.</p>}</main>);
}
