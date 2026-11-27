import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SystemMap from '@/components/SystemMap';
import RagDemo from '@/components/RagDemo';
import WorkIndex from '@/components/WorkIndex';
import ClientsMarquee from '@/components/ClientsMarquee';
import { getPublished, getClients, getSettings } from '@/lib/supabase/public';
import { toItem } from '@/lib/content';
import { LINKEDIN, EMAIL } from '@/lib/site';
export const revalidate = 60;
const principles = [['Data first.', 'An AI answer is only as reliable as the data under it. The foundation is cleaned and modelled before anything is asked of it.'], ['Answers with sources.', 'Each answer points to the record it came from. If the data does not contain the answer, the assistant says so.'], ['Predictions you can check.', 'Forecasts come with the method and the margin of error, not just a number.']];
const steps = [['Understand', 'How the business runs, what slows it down and what data already exists.'], ['Build', 'The system or the data model, in small steps you can see and test.'], ['Connect', 'Analysis, forecasts and AI on top of the same clean data.'], ['Support', 'Launch, training and improvements after the first version is live.']];
export default async function Home() {
  const [all, clients, S] = await Promise.all([getPublished(), getClients(), getSettings()]);
  const live = all.filter((p: any) => Array.isArray(p.links) && p.links.length).length;
  return (<main>
    <section className="wrap cols"><div className="hero"><div className="t">
      <p className="mono">Independent practice · Systems · Data · AI</p>
      <h1 className="xl">{S.hero[0]}<br /><span className="o">{S.hero[1]}</span><br /><span className="b">{S.hero[2]}</span></h1>
      <p className="lead">{S.intro}</p>
      <div className="acts"><Link className="bt" href="/projects">See live work</Link><Link className="bt o" href="/contact">Start a conversation</Link></div></div>
      <div className="f"><SystemMap /></div></div>
      <div className="strip"><div><p className="mono">Status</p><b className="st"><i className="live-dot" />{S.status}</b></div><div><p className="mono">Disciplines</p><b>{S.capabilities.length}</b></div><div><p className="mono">Projects published</p><b>{all.length || '—'}</b></div><div><p className="mono">With live links</p><b>{live || '—'}</b></div></div></section>
    <ClientsMarquee clients={clients} />
    <section className="wrap" style={{ marginTop: 72 }}><div className="sh"><span className="mono">01</span><span className="mono">Disciplines</span></div>
      <div className="spec">{S.capabilities.map(c => <article key={c.code}><span className="code">{c.code}</span><h3>{c.title}</h3><p>{c.text}</p>
        <ul>{c.items.split(',').map(x => x.trim()).filter(Boolean).map(x => <li key={x}>{x}</li>)}</ul>
        <Link className="go" href={c.category ? `/projects?c=${encodeURIComponent(c.category)}` : '/projects'}><span>See projects</span></Link></article>)}</div></section>
    <section className="wrap" style={{ marginTop: 72 }}><div className="sh"><span className="mono">02</span><span className="mono">Method</span></div>
      <div className="two"><div className="a"><Reveal><h2 className="l">Analysis and AI, built together.</h2>
        <ol className="pr">{principles.map(([t, d], i) => <li key={t}><span className="mono">{'ABC'[i]}</span><span><b>{t}</b><span className="t">{d}</span></span></li>)}</ol></Reveal></div>
        <div className="b"><Reveal d={.1}><RagDemo /></Reveal></div></div></section>
    <section className="wrap"><div className="sh"><span className="mono">03</span><span className="mono">Work · index</span></div>
      <div style={{ padding: '28px 0 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}><h2 className="l">Selected work</h2><Link className="bt o" href="/projects">All work</Link></div>
      {all.length ? <WorkIndex items={all.slice(0, 8).map(toItem)} /> : <p className="lead">Projects will appear here once published.</p>}</section>
    <section className="wrap" style={{ marginTop: 72 }}><div className="sh"><span className="mono">04</span><span className="mono">Protocol</span></div>
      <ol className="proto" style={{ padding: 0, margin: 0 }}>{steps.map(([t, d], i) => <li key={t}><span className="nm">0{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol></section>
    <section className="wrap" style={{ marginTop: 72 }}><div className="sh"><span className="mono">05</span><span className="mono">Contact</span></div>
      <div style={{ padding: '40px 0 8px' }}><h2 className="l" style={{ maxWidth: '16ch' }}>Tell me what you need built or understood.</h2>
        <div style={{ marginTop: 28 }}><a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
        <div className="acts"><Link className="bt" href="/contact">Use the form</Link><a className="bt o" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div></section>
  </main>);
}
