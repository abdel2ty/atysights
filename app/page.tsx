import Link from 'next/link';
import Image from 'next/image';
import { getPublished, getClients } from '@/lib/supabase/public';
import Reveal from '@/components/Reveal';
import CategoryBadge from '@/components/CategoryBadge';
import Lens from '@/components/Lens';
import Ledger from '@/components/Ledger';
import ClientsMarquee from '@/components/ClientsMarquee';
import MiniDash from '@/components/MiniDash';
import { LINKEDIN } from '@/lib/site';
import { services } from '@/lib/content';
export const revalidate = 60;
const steps = [['Understand','We learn how the business makes money, what it wants to achieve and what data exists.'],['Investigate','We look for patterns, leaks and weak spots in how it actually performs.'],['Reveal','We turn findings into something an owner can read without a data background.'],['Advise','We recommend what to change, stop or watch next, with the evidence behind it.']];
const problems = ['Revenue grows, but profit stays flat.','Best-sellers that earn almost nothing.','A branch that keeps falling short.','Customer acquisition costs rising each quarter.','Operating costs growing unnoticed.','Decisions made on assumptions, not evidence.'];
export default async function Home() {
  const [all, clients] = await Promise.all([getPublished(), getClients()]); const work = all.slice(0, 3);
  return (<main className="overflow-x-clip">
    <section className="bg-white text-ink"><div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 md:grid-cols-12 md:gap-14 md:pb-32 md:pt-20">
      <div className="md:col-span-7"><h1 className="text-5xl leading-[1.12] md:text-7xl">Your business is telling a story.<br/>
        <span className="hl hl-line mt-3" style={{['--d' as any]:'.3s'}}>Are you</span><br/><span className="hl hl-blue mt-3" style={{['--d' as any]:'.7s'}}>reading it?</span></h1>
        <p className="mt-8 max-w-md text-lg text-mute">ATYSIGHTS turns business data into insight, so owners can see how the business performs, where it leaks and what to examine next.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/projects" className="btn">Explore our work</Link><Link href="/contact" className="btn-o">Let’s talk</Link></div></div>
      <div className="relative md:col-span-5 md:pb-24"><Ledger/><div className="mt-6 md:absolute md:-left-12 md:bottom-0 md:mt-0 md:w-72"><MiniDash/></div></div></div></section>
    <div className="bg-blue text-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5"><p className="font-semibold">Independent business intelligence for owners in Egypt and worldwide.</p><a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="border-2 border-white px-5 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-blue">Connect on LinkedIn</a></div></div>
    <ClientsMarquee clients={clients}/>
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-24 md:grid-cols-12"><Reveal className="md:col-span-5"><h2 className="text-4xl md:text-5xl">Revenue is up. <span className="hl hl-blue">Look closer.</span></h2><p className="mt-6 text-lg text-mute">A total can look fine while parts of the business quietly lose money. Press the button to see what a breakdown shows.</p></Reveal><Reveal d={.15} className="md:col-span-7"><Lens/></Reveal></section>
    <section className="bg-ink py-16 md:py-24 text-white"><div className="mx-auto max-w-6xl px-6"><Reveal><h2 className="max-w-2xl text-4xl md:text-5xl">Sound familiar? <span className="hl hl-blue">Totals hide it.</span></h2></Reveal>
      <ul className="mt-12 border-t border-white/20">{problems.map((p,i)=><Reveal key={p} d={i*.06}><li className="group flex items-center gap-6 border-b border-white/20 py-5 text-xl font-semibold transition-colors hover:bg-blue md:text-3xl"><span className="w-10 text-base text-white/40 group-hover:text-white">{i+1}</span>{p}</li></Reveal>)}</ul></div></section>
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24"><Reveal><h2 className="text-4xl md:text-5xl">What we do</h2></Reveal><ul className="mt-10 border-t-2 border-ink">{services.map(([t,d,v],i)=><Reveal key={t} d={i*.05}><li className="group grid gap-3 border-b border-rule px-2 py-6 transition-colors hover:bg-blue hover:text-white md:grid-cols-12"><h3 className="text-2xl md:col-span-4">{t}</h3><p className="md:col-span-5">{d}</p><p className="text-sm text-mute group-hover:text-white md:col-span-3">{v}</p></li></Reveal>)}</ul></section>
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24"><Reveal><h2 className="text-4xl md:text-5xl">How we work</h2></Reveal>
      <ol className="mt-12 grid gap-6 md:grid-cols-4">{steps.map(([t,d],i)=><Reveal key={t} d={i*.1}><li className="h-full border-2 border-ink p-6 transition-colors hover:border-blue"><span className="grid h-12 w-12 place-items-center bg-blue text-xl font-extrabold text-white">{i+1}</span><h3 className="mt-5 text-xl">{t}</h3><p className="mt-2 text-sm text-mute">{d}</p></li></Reveal>)}</ol></section>
    <section className="mx-auto max-w-6xl px-6 pb-24"><Reveal><h2 className="text-4xl md:text-5xl">Selected <span className="hl hl-blue">work</span></h2></Reveal>
      {!work?.length && <p className="mt-8 text-mute">Projects will appear here once published.</p>}
      <div className="mt-12 grid gap-8 md:grid-cols-3">{work?.map((p,i)=><Reveal key={p.id} d={i*.1}><Link href={`/projects/${p.slug}`} className="group block">
        <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-ink">{p.cover_image_url && <Image src={p.cover_image_url} alt="" fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>}<span className="absolute left-0 top-0 z-10"><CategoryBadge cat={p.cat} /></span></div>
        <p className="text-sm font-semibold text-blue">{p.industry}</p><h3 className="text-2xl group-hover:underline">{p.title}</h3><p className="mt-2 text-sm text-mute">{p.short_description}</p></Link></Reveal>)}</div></section>
    <section className="bg-blue py-16 md:py-24 text-white"><div className="mx-auto max-w-6xl px-6"><Reveal><h2 className="max-w-3xl text-4xl md:text-6xl">Better decisions start with <span className="hl bg-ink">better understanding.</span></h2>
      <div className="mt-10 flex flex-wrap gap-3"><Link href="/contact" className="inline-block bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">Discuss your business</Link><a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-blue">Connect on LinkedIn</a></div></Reveal></div></section>
  </main>);
}
