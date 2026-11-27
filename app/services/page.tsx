import Link from 'next/link';
import { services } from '@/lib/content';
export const metadata = { title: 'Services' };
export default function S() {
  return (<main className="wrap"><div className="sh"><span className="mono">Services</span><span className="mono">{services.length} areas</span></div>
    <h1 className="l" style={{ margin: '36px 0 12px', maxWidth: '16ch' }}>What I build, analyse and automate.</h1><p className="lead" style={{ marginTop: 0 }}>Connected areas, delivered end to end by one person.</p>
    <div className="idx" style={{ marginTop: 32 }}>{services.map(([t, d, v], i) => <div key={t} className="srow"><span className="n mono">S-0{i + 1}</span><h2>{t}</h2><p>{d}</p><p className="mono-v">{v}</p></div>)}</div>
    <div className="acts" style={{ marginBottom: 24 }}><Link href="/contact" className="bt">Start a conversation</Link></div></main>);
}
