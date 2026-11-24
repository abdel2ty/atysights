import Link from 'next/link';
import { requireAdmin } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
export default async function Q() {
  const s = await requireAdmin();
  const { data } = await s.from('inquiries').select('*').order('created_at', { ascending: false }).limit(100);
  return (<main className="mx-auto max-w-3xl"><Link href="/admin" className="text-sm underline">Back to overview</Link><h1 className="mt-4 text-3xl">Messages</h1>
    {!data?.length && <p className="mt-6 text-mute">No messages yet.</p>}
    <ul className="mt-6 space-y-4">{data?.map(m => <li key={m.id} className="bg-white p-5 border border-rule"><div className="flex flex-wrap justify-between gap-2"><b>{m.name}{m.company && <span className="font-normal text-mute"> · {m.company}</span>}</b><span className="text-sm text-mute">{new Date(m.created_at).toLocaleString('en-GB')}</span></div>
      <a className="text-sm text-blue underline" href={`mailto:${m.email}`}>{m.email}</a>{m.industry && <p className="text-sm text-mute">{m.industry}</p>}
      <p className="mt-3 font-semibold">{m.need}</p>{m.details && <p className="mt-2 whitespace-pre-line text-sm">{m.details}</p>}</li>)}</ul></main>);
}
