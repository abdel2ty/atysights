import Link from 'next/link';
import { services } from '@/lib/content';
export const metadata = { title: 'Services' };
export default function S() {
  return (<main className="mx-auto max-w-6xl px-6 py-16"><h1 className="font-serif text-5xl">Services</h1>
    <p className="mt-4 max-w-xl text-mute">Five ways we help owners understand what is happening inside the business.</p>
    <ul className="mt-12 border-t border-ink">{services.map(([t,d,v])=><li key={t} className="grid gap-4 border-b border-rule py-8 md:grid-cols-12">
      <h2 className="font-serif text-2xl md:col-span-4">{t}</h2><p className="md:col-span-5">{d}</p><p className="text-sm text-mute md:col-span-3"><span className="font-medium text-ink">What you get: </span>{v}</p></li>)}</ul>
    <Link href="/contact" className="btn mt-10">Discuss your business</Link></main>);
}
