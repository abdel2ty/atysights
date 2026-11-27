'use client';
import { useEffect, useState } from 'react';
const S = [
  { q: 'Is there a 3-bedroom apartment in New Cairo under 6 million EGP?', a: 'Yes, two units match. A-14 is 165 m² at EGP 5.4M. C-02 is 172 m² at EGP 5.9M.', src: ['Listings · A-14', 'Listings · C-02'] },
  { q: 'Which of them has the bigger garden?', a: 'C-02 has a 40 m² garden. A-14 has 25 m².', src: ['Listings · C-02', 'Listings · A-14'] },
  { q: 'Where will prices be next year?', a: 'That is not in the data I was given, so I will not guess. I can compare the units I have.', src: [] as string[] },
];
export default function RagDemo() {
  const [i, setI] = useState(0); const [ph, setPh] = useState(0);
  useEffect(() => { const t = setTimeout(() => { if (ph < 2) setPh(ph + 1); else { setPh(0); setI((i + 1) % S.length); } }, ph === 0 ? 1500 : ph === 1 ? 1300 : 4500); return () => clearTimeout(t); }, [i, ph]);
  const s = S[i];
  return (<div className="fig"><div className="cap"><span className="mono">Fig. 02 · Grounded answers</span><span className="mono">Illustrative</span></div>
    <div className="bd" style={{ background: '#fff', minHeight: '19rem' }} aria-live="polite">
      <div key={`u${i}`} className="msg" style={{ marginLeft: 'auto', maxWidth: '85%', background: '#0a0a0a', color: '#fff', padding: '10px 14px', fontSize: '.92rem' }}>{s.q}</div>
      {ph === 1 && <div key={`t${i}`} className="msg" style={{ display: 'inline-flex', gap: 4, border: '1px solid #d9dde6', padding: '12px 14px', marginTop: 14 }}><span className="dot" /><span className="dot" /><span className="dot" /></div>}
      {ph === 2 && <div key={`a${i}`} className="msg" style={{ maxWidth: '92%', border: '1px solid #d9dde6', padding: '12px 14px', marginTop: 14, fontSize: '.92rem' }}><p style={{ margin: 0 }}>{s.a}</p>
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>{s.src.length ? s.src.map(x => <span key={x} className="mono" style={{ background: 'rgba(11,95,255,.1)', color: '#0b5fff', padding: '3px 8px' }}>Source: {x}</span>) : <span className="mono" style={{ border: '1px solid #d9dde6', padding: '3px 8px' }}>No source found</span>}</div></div>}
    </div></div>);
}
