export const services = [
 ['Business systems','Point of sale, inventory, ordering and back-office systems for shops, cafes and growing businesses, designed around how you actually work.','You run the whole business from one reliable system.'],
 ['Websites and portals','Business websites, customer portals and booking or ordering flows that connect to your data.','What customers do lands directly in your records.'],
 ['Data analysis and dashboards','Cleaning, modelling and analysing your data, delivered as dashboards and clear reports in Power BI or on the web.','You see what is happening without waiting for a spreadsheet.'],
 ['Forecasting and prediction','Models that estimate demand, stock needs and revenue, with the method and the margin of error stated.','You plan purchasing and staffing on evidence.'],
 ['AI assistants on your data','Assistants that answer customer or staff questions using only the data you give them, and point to the source of each answer.','Questions get answered at once, and nothing is invented.'],
 ['Automation and integrations','Connecting systems, moving data automatically and removing repetitive manual work.','Hours of routine work disappear.'],
] as const;
export const DEFAULTS = {
  status: 'Taking new projects',
  hero: ['Systems.', 'Data.', 'AI.'],
  intro: 'Software that runs a business, analysis that explains it, and AI that answers from its own data. Built by one person, accountable from the first call to launch.',
  capabilities: [
    { code: 'SYS', title: 'Business systems', text: 'Software built around how your shop or business actually runs.', items: 'Point of sale, Inventory and purchasing, Online ordering, Back-office and reports', category: 'Business systems' },
    { code: 'DAT', title: 'Data analysis', text: 'Clean data, clear dashboards and forecasts you can check.', items: 'Dashboards (Power BI and web), Reports and KPIs, Forecasting models, Data cleaning and modelling', category: 'Data & analytics' },
    { code: 'AI', title: 'AI systems', text: 'Assistants that answer from your data, and automation that removes repetitive work.', items: 'Assistants on your data (RAG), Workflow automation, Document and data extraction, Integrations', category: 'AI systems' },
  ] as { code: string; title: string; text: string; items: string; category: string }[],
};
export type Item = { slug: string; title: string; category: string; industry: string; year: string; cover: string; live: boolean; tech: string[] };
export const toItem = (p: any): Item => ({ slug: p.slug, title: p.title, category: p.category ?? '', industry: p.industry ?? '', year: String(p.published_at ?? p.created_at ?? '').slice(0, 4), cover: p.cover_image_url ?? '', live: Array.isArray(p.links) && p.links.length > 0, tech: Array.isArray(p.tech) ? p.tech : [] });
