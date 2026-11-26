import MarginCheck from '@/components/MarginCheck';
export const metadata = { title: 'Margin check', description: 'A free first look at which products or branches earn well and which do not.' };
export default function Page() {
  return (<main className="mx-auto max-w-6xl px-6 py-12 md:py-16"><h1 className="max-w-3xl text-4xl leading-tight md:text-6xl">Which of your products <span className="hl hl-blue">earn their place?</span></h1>
    <p className="mt-6 max-w-xl text-lg text-mute">Enter revenue and cost for each product, service or branch. See in seconds which ones earn well and which ones quietly do not.</p>
    <div className="mt-10"><MarginCheck /></div></main>);
}
