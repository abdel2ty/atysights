export const KINDS = { system: 'Business systems', analytics: 'Data & analytics', ai: 'AI systems' } as const;
export type Kind = keyof typeof KINDS;
export const services = [
 ['Business systems','Point of sale, inventory, ordering and back-office systems for shops, cafes and growing businesses, designed around how you actually work.','You run the whole business from one reliable system.'],
 ['Websites and portals','Business websites, customer portals and booking or ordering flows that connect to your data.','What customers do lands directly in your records.'],
 ['Data analysis and dashboards','Cleaning, modelling and analysing your data, delivered as dashboards and clear reports in Power BI or on the web.','You see what is happening without waiting for a spreadsheet.'],
 ['Forecasting and prediction','Models that estimate demand, stock needs and revenue, with the method and the margin of error stated.','You plan purchasing and staffing on evidence.'],
 ['AI assistants on your data','Assistants that answer customer or staff questions using only the data you give them, and point to the source of each answer.','Questions get answered at once, and nothing is invented.'],
 ['Automation and integrations','Connecting systems, moving data automatically and removing repetitive manual work.','Hours of routine work disappear.'],
] as const;
export const labelsByKind: Record<Kind, Record<string, string>> = {
 system: { business_context: 'The client', problem_statement: 'The need', objectives: 'Goals', methodology: 'How it was built', key_findings: 'What was delivered', business_insights: 'How it is used', recommendations: 'Next steps', conclusion: 'Summary' },
 analytics: { business_context: 'Business context', problem_statement: 'The question', objectives: 'Objectives', methodology: 'Method', key_findings: 'Findings', business_insights: 'What it means', recommendations: 'Recommendations', conclusion: 'Conclusion' },
 ai: { business_context: 'The client', problem_statement: 'The problem', objectives: 'Goals', methodology: 'How it works', key_findings: 'What it can do', business_insights: 'Safeguards and limits', recommendations: 'Next steps', conclusion: 'Summary' },
};
