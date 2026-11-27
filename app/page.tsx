import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SystemMap from '@/components/SystemMap';
import RagDemo from '@/components/RagDemo';
import WorkCard from '@/components/WorkCard';
import ClientsMarquee from '@/components/ClientsMarquee';
import { getPublished, getClients } from '@/lib/supabase/public';
import { LINKEDIN } from '@/lib/site';
export const revalidate = 60;
const pillars = [['Business systems', 'Point of sale, inventory, ordering and back-office systems built around how your shop actually runs.', 'system'], ['Data analysis', 'Dashboards, reports and forecasts that show what is happening and what is likely to happen next.', 'analytics'], ['AI systems', 'Assistants that answer from your own data, and automation that does the repetitive work.', 'ai']];
const principles = [['Data first.', 'An AI answer is only as reliable as the data under it. The foundation is cleaned and modelled before anything is asked of it.'], ['Answers with sources.', 'Each answer points to the record it came from. If the data does not contain the answer, the assistant says so.'], ['Predictions you can check.', 'Forecasts come with the method and the margin of error, not just a number.']];
const steps = [['Understand', 'How the business runs, what slows it down and what data already exists.'], ['Build', 'The system or the data model, in small steps you can see and test.'], ['Connect', 'Analysis, forecasts and AI on top of the same clean data.'], ['Support', 'Launch, training and improvements after the first version is live.']];
export default async function Home() {
  const [all, clients] = await Promise.all([getPublished(), getClients()]); const work = all.slice(0, 3);
  return (<main className="overflow-x-clip">
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 md:grid-cols-12 md:gap-14 md:pb-28 md:pt-16">
      <div className="md:col-span-6"><h1 className="text-[2.4rem] leading-[1.12] sm:text-5xl md:text-6xl md:leading-[1.1]">Business systems,<br />
        <span className="hl hl-line mt-3" style={{ ['--d' as any]: '.3s' }}>data analysis,</span><br /><span className="hl hl-blue mt-3" style={{ ['--d' as any]: '.7s' }}>and AI that reads both.</span></h1>
        <p className="mt-8 max-w-md text-lg text-mute">ATYSIGHTS builds the software that runs a business, the analysis that explains it, and the AI that answers from its own data. You work directly with the person who builds it.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/projects" className="btn">See live work</Link><Link href="/contact" className="btn-o">Let’s talk</Link></div></div>
      <div className="md:col-span-6"><SystemMap /></div>
    </section>
    <div className="bg-blue text-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5"><p className="font-semibold">Independent studio for owners in Egypt and worldwide.</p><a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="border-2 border-white px-5 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-blue">Connect on LinkedIn</a></div></div>
    <ClientsMarquee clients={clients} />
    <section className="bg-ink py-16 text-white md:py-24"><div className="mx-auto max-w-6xl px-6"><Reveal><h2 className="max-w-2xl text-4xl md:text-5xl">Three things, <span className="hl hl-blue">one standard.</span></h2></Reveal>
      <ul className="mt-12 border-t border-white/20">{pillars.map(([t, d, k], i) => <Reveal key={t} d={i * .08}><li><Link href={`/projects?k=${k}`} className="group grid items-baseline gap-3 border-b border-white/20 py-7 transition-all duration-300 hover:bg-blue hover:pl-4 md:grid-cols-12"><span className="text-white/40 group-hover:text-white md:col-span-1">0{i + 1}</span><span className="text-2xl font-extrabold md:col-span-4 md:text-3xl">{t}</span><span className="text-white/70 group-hover:text-white md:col-span-7">{d}</span></Link></li></Reveal>)}</ul></div></section>
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-12 md:gap-14 md:py-28">
      <div className="md:col-span-5"><Reveal><h2 className="text-4xl md:text-5xl">Analysis and AI, <span className="hl hl-blue">built together.</span></h2>
        <ul className="mt-10 space-y-7">{principles.map(([t, d]) => <li key={t} className="border-l-4 border-blue pl-4"><b className="block text-lg">{t}</b><span className="text-mute">{d}</span></li>)}</ul></Reveal></div>
      <div className="md:col-span-7"><Reveal d={.12}><RagDemo /></Reveal></div></section>
    <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24"><Reveal><h2 className="text-4xl md:text-5xl">Selected <span className="hl hl-blue">work</span></h2><p className="mt-4 max-w-xl text-mute">Real projects, with live links where they can be opened.</p></Reveal>
      {!work.length && <p className="mt-8 text-mute">Projects will appear here once published.</p>}
      <div className="mt-12 grid gap-8 md:grid-cols-3">{work.map((p, i) => <Reveal key={p.id} d={i * .1}><WorkCard p={p} /></Reveal>)}</div>
      {all.length > 3 && <Link href="/projects" className="btn-o mt-12">View all work</Link>}</section>
    <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24"><Reveal><h2 className="text-4xl md:text-5xl">How a project runs</h2></Reveal>
      <ol className="mt-12 grid gap-6 md:grid-cols-4">{steps.map(([t, d], i) => <Reveal key={t} d={i * .1}><li className="h-full border-2 border-ink p-6 transition-colors hover:border-blue"><span className="grid h-12 w-12 place-items-center bg-blue text-xl font-extrabold text-white">{i + 1}</span><h3 className="mt-5 text-xl">{t}</h3><p className="mt-2 text-sm text-mute">{d}</p></li></Reveal>)}</ol></section>
    <section className="bg-blue py-16 text-white md:py-24"><div className="mx-auto max-w-6xl px-6"><Reveal><h2 className="max-w-3xl text-4xl md:text-6xl">Tell me what you need to <span className="hl bg-ink">build or understand.</span></h2>
      <div className="mt-10 flex flex-wrap gap-3"><Link href="/contact" className="inline-block bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">Start a conversation</Link><a href={LINKEDIN} {...{ target: '_blank', rel: 'noopener noreferrer' }} className="inline-block border-2 border-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-blue">Connect on LinkedIn</a></div></Reveal></div></section>
  </main>);
}
