import Link from 'next/link';
import { LINKEDIN } from '@/lib/site';
export const metadata = { title: 'About' };
export default function A() {
  return (<main className="mx-auto max-w-6xl px-6 py-12 md:py-16"><h1 className="max-w-3xl text-4xl leading-tight md:text-6xl">Built to run your business, and to <span className="hl hl-blue">understand it.</span></h1>
    <div className="mt-12 grid gap-10 md:grid-cols-12"><div className="space-y-5 text-lg leading-relaxed md:col-span-7">
      <p>ATYSIGHTS is an independent studio working with shop owners and growing businesses in Egypt and abroad. The work sits in three connected areas: business systems, data analysis, and AI systems that answer from your own data.</p>
      <p>They belong together. A system that records sales cleanly gives analysis something true to work with. Analysis gives AI something reliable to say. Skip a step and the answers stop being trustworthy.</p>
      <p>You work directly with the person who builds your project, from the first conversation to launch and after. Real projects, with live links, are on the Work page.</p></div>
    <aside className="border-t border-ink pt-4 md:col-span-5"><h2 className="text-2xl">How a project runs</h2>
      <ol className="mt-4 space-y-3 text-mute"><li><b className="text-ink">Understand.</b> The business and its data.</li><li><b className="text-ink">Build.</b> The system or the data model.</li><li><b className="text-ink">Connect.</b> Analysis, forecasts and AI.</li><li><b className="text-ink">Support.</b> Launch and improvements.</li></ol></aside></div>
    <div className="mt-12 flex flex-wrap gap-3"><Link href="/contact" className="btn">Let’s talk</Link><a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-o">Connect on LinkedIn</a></div></main>);
}
