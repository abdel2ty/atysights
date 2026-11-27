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
  return (<div className="border border-rule bg-white shadow-[0_1px_2px_rgba(0,0,0,.06),0_24px_60px_-28px_rgba(0,0,0,.35)]">
    <div className="flex items-center justify-between border-b border-rule px-4 py-3"><span className="flex items-center gap-3 text-sm font-bold"><span className="grid h-7 w-7 place-items-center bg-blue text-xs text-white">A</span>Property assistant</span><span className="text-xs text-mute">Illustrative conversation</span></div>
    <div className="min-h-[17rem] space-y-4 p-4" aria-live="polite">
      <div key={`u${i}`} className="msg ml-auto max-w-[85%] bg-ink px-4 py-2.5 text-sm text-white">{s.q}</div>
      {ph === 1 && <div key={`t${i}`} className="msg inline-flex gap-1 border border-rule px-4 py-3"><span className="dot" /><span className="dot" /><span className="dot" /></div>}
      {ph === 2 && <div key={`a${i}`} className="msg max-w-[90%] border border-rule px-4 py-3 text-sm"><p>{s.a}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">{s.src.length ? s.src.map(x => <span key={x} className="bg-blue/10 px-2 py-1 text-blue">Source: {x}</span>) : <span className="border border-rule px-2 py-1 text-mute">No source found</span>}</div></div>}
    </div>
    <div className="border-t border-rule px-4 py-3 text-sm text-mute">Ask about the properties…</div></div>);
}
