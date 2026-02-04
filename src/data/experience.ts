import genesis from '@/assets/images/genesis.jpg';
import materiality from '@/assets/images/materiality.jpg';

export const experiences = [{
  startDate: 'Nov 2021',
  endDate: 'Dec 2025',
  company: 'Center for Applied Management Practices',
  role: 'Full Stack Software Engineer',
  description: [
		'Led end-to-end development of major full-stack features, including database design, ASP.NET/C# API engineering, and building clean, maintainable React/TypeScript components, while collaborating with product, design, and QA.',
		'Built features that became core selling points, used by 10k+ users and showcased by the sales team in live customer demos, directly contributing to new customer acquisitions.',
		'Improved a high-traffic .NET endpoint from ~10 seconds to ~250ms through query optimization, projection refactors, and applying indexing strategies.',
		'Worked extensively with Microsoft SQL Server, optimizing queries, writing complex update statements, sanitizing data, and updating critical stored procedures.',
		'Supported Azure DevOps CI/CD and Docker workflows, monitoring deployments and ensuring the pipeline delivered code consistently and correctly.',
		'Refactored legacy frontend components, converted major sections to TypeScript, and introduced code-splitting, lazy loading, and reusable UI patterns, resulting in an 8% reduction in bundle size and noticeably smoother load performance.',
		'Introduced and championed new libraries, such as React Hook Form, creating internal demos that led to system wide adoption and more maintainable, typesafe forms.',
		'Took ownership of cross-team initiatives, inheriting behind-schedule features and seeing them through the finish line, while mentoring teammates and providing technical leadership through code reviews.',
		'Implemented client-side data caching with tools like Redux and TanStack Query for faster, more efficient data retrieval.',
		'Used Zodios and Zod to define frontend API clients with end-to-end typesafety and schema validation.',
  ],
  logo: genesis,
},
{
  startDate: 'Jun 2021',
  endDate: 'Nov 2021',
  company: 'Materiality/Datapoint Labs',
  role: 'Full Stack Software Engineer',
  description: [
		'Built and enhanced production features using React, TypeScript, ASP.NET/C#/F#, working closely with materials engineers to translate scientific workflows into intuitive software tools.',
		'Worked extensively with large material-testing datasets, implementing performant interfaces and visualizations using jQuery and jqPlot to help labs analyze mechanical, thermal, and structural properties.',
		'Contributed to backend development by adding new API endpoints, performing database migrations, and improving data access patterns for reliability and clarity.',
		'Collaborated across engineering and scientific teams to refine requirements, validate results, and ensure accurate representation of domain-specific data.',
  ],
  logo: materiality,
}];
