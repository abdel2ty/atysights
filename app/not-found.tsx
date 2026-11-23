import Link from 'next/link';
export default function NF() { return (<main className="mx-auto max-w-6xl px-6 py-24"><h1 className="text-5xl md:text-8xl">Page not <span className="hl hl-blue">found.</span></h1><p className="mt-6 max-w-md text-lg text-mute">The page may have moved, or the link is wrong.</p><Link href="/" className="btn mt-8">Back to home</Link></main>); }
