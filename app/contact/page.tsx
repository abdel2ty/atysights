import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sb } from '@/lib/supabase/server';
export const metadata = { title: 'Contact' };
const schema = z.object({ name: z.string().trim().min(1).max(120), company: z.string().trim().max(160), email: z.string().trim().email().max(200), industry: z.string().trim().max(120), need: z.string().trim().min(5).max(2000), details: z.string().trim().max(4000) });
async function send(fd: FormData) {
  'use server';
  if (fd.get('website')) redirect('/contact?sent=1'); // honeypot
  const p = schema.safeParse(Object.fromEntries(fd));
  if (!p.success) redirect('/contact?e=1');
  const s = await sb();
  const { error } = await s.from('inquiries').insert(p.data);
  redirect(error ? '/contact?e=2' : '/contact?sent=1');
}
export default async function C({ searchParams }: { searchParams: Promise<{ sent?: string; e?: string }> }) {
  const { sent, e } = await searchParams;
  const F = (n: string, l: string, t = 'text', req = false) => <div><label className="mb-1 block text-sm font-medium">{l}</label><input name={n} type={t} required={req} className="field"/></div>;
  return (<main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-12"><div className="md:col-span-5"><h1 className="font-serif text-5xl">Tell us what you need to understand.</h1>
    <p className="mt-6 text-mute">Describe the question behind your numbers. We reply by email.</p><p className="mt-6">Or write directly: <a className="underline" href="mailto:atysights@gmail.com">atysights@gmail.com</a></p></div>
    <div className="md:col-span-7">{sent ? <p className="border border-ink bg-blue text-white p-5 font-medium">Thank you. Your message was sent and we will reply by email.</p> :
      <form action={send} className="space-y-4">{F('name','Name','text',true)}{F('company','Business or company')}{F('email','Email','email',true)}{F('industry','Industry')}
        <div><label className="mb-1 block text-sm font-medium">What do you need help understanding?</label><textarea name="need" required minLength={5} rows={3} className="field"/></div>
        <div><label className="mb-1 block text-sm font-medium">Additional details</label><textarea name="details" rows={4} className="field"/></div>
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
        {e && <p className="text-sm text-red-700">{e==='1' ? 'Please check the fields: name, a valid email and your question are required.' : 'Your message could not be sent. Please try again or email us directly.'}</p>}
        <button className="btn">Send message</button></form>}</div></main>);
}
