import Link from 'next/link';
export const metadata = { title: 'About' };
export default function A() {
  return (<main className="mx-auto max-w-6xl px-6 py-16"><h1 className="max-w-3xl font-serif text-5xl leading-tight">We don’t only show what happened. We explain why.</h1>
    <div className="mt-12 grid gap-10 md:grid-cols-12"><div className="space-y-5 text-lg leading-relaxed md:col-span-7">
      <p>ATYSIGHTS is an independent business intelligence practice. We work with owners and managers of small and growing businesses, in Egypt and abroad, who have data but not yet clarity.</p>
      <p>A dashboard is a tool. What matters is the understanding behind it: why a branch is falling behind, why a popular product earns little, where costs are growing without anyone noticing.</p>
      <p>We work from your real data and report only what it shows. We do not promise results, and we do not guess where the evidence is thin.</p></div>
    <aside className="border-t border-ink pt-4 md:col-span-5"><h2 className="font-serif text-2xl">How we approach a business</h2>
      <ol className="mt-4 space-y-3 text-mute"><li><b className="text-ink">Understand.</b> Your model, goals and data.</li><li><b className="text-ink">Investigate.</b> Patterns and weak points.</li><li><b className="text-ink">Reveal.</b> Findings in plain language.</li><li><b className="text-ink">Advise.</b> Clear next steps.</li></ol></aside></div>
    <Link href="/contact" className="btn mt-12">Let’s talk</Link></main>);
}
