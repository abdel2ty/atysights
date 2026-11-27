import Link from 'next/link';
import { LINKEDIN } from '@/lib/site';
export const metadata = { title: 'About' };
export default function A() {
  return (<main className="wrap"><div className="sh"><span className="mono">About</span><span className="mono">Practice</span></div>
    <div className="two"><div className="a"><h1 className="l">Built to run your business, and to understand it.</h1>
      <dl style={{ margin: '32px 0 0', display: 'grid', gap: 14 }}>{[['Practice', 'Independent studio'], ['Disciplines', 'Business systems, data analysis, AI systems'], ['Region', 'Egypt and worldwide'], ['Works with', 'Shop owners and growing businesses']].map(([k, v]) => <div key={k} style={{ display: 'grid', gridTemplateColumns: '8rem 1fr', gap: 12, borderTop: '1px solid #d9dde6', paddingTop: 12 }}><dt className="mono">{k}</dt><dd style={{ margin: 0, fontWeight: 700 }}>{v}</dd></div>)}</dl></div>
      <div className="b" style={{ fontSize: '1.15rem', lineHeight: 1.7, display: 'grid', gap: 20, alignContent: 'start' }}>
        <p>ATYSIGHTS is an independent studio. The work sits in three connected areas: business systems, data analysis, and AI systems that answer from your own data.</p>
        <p>They belong together. A system that records sales cleanly gives analysis something true to work with. Analysis gives AI something reliable to say. Skip a step and the answers stop being trustworthy.</p>
        <p>You work directly with the person who builds your project, from the first conversation to launch and after. Real projects, with live links, are on the Work page.</p>
        <div className="acts"><Link href="/contact" className="bt">Start a conversation</Link><a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="bt o">LinkedIn</a></div></div></div></main>);
}
