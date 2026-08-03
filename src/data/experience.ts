import aphw from '@/assets/images/aphw.png';
import genesis from '@/assets/images/genesis.jpg';
import materiality from '@/assets/images/materiality.jpg';
import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    startDate: 'Mar 2026',
    endDate: 'Present',
    company: "America's Preferred Home Warranty",
    role: 'Full Stack Software Engineer',
    highlights: [
      'Building and improving production software.',
    ],
    logo: aphw,
    technologies: ['Next.js', 'React', 'TypeScript', 'Django', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    startDate: 'Nov 2021',
    endDate: 'Dec 2025',
    company: 'Center for Applied Management Practices',
    role: 'Full Stack Software Engineer',
    highlights: [
      'Led end-to-end delivery of full-stack features across SQL Server, ASP.NET/C#, and React/TypeScript in close partnership with product, design, and QA.',
      'Built core product capabilities used by more than 10,000 people and regularly demonstrated during customer acquisition.',
      'Reduced a high-traffic endpoint from roughly 10 seconds to 250 milliseconds through query, projection, and indexing improvements.',
      'Modernized legacy frontend areas with TypeScript, code splitting, reusable patterns, typed API clients, and schema validation.',
      'Took ownership of cross-team initiatives, mentored teammates, and helped delayed features reach production through pragmatic technical leadership.',
    ],
    logo: genesis,
    technologies: ['React', 'TypeScript', 'ASP.NET', 'C#', 'SQL Server', 'Docker', 'Azure DevOps'],
  },
  {
    startDate: 'Jun 2021',
    endDate: 'Nov 2021',
    company: 'Materiality/Datapoint Labs',
    role: 'Full Stack Software Engineer Intern',
    highlights: [
      'Built production features with React, TypeScript, ASP.NET, C#, and F#, translating scientific workflows into approachable software.',
      'Created performant interfaces and visualizations for large material-testing datasets.',
      'Added API endpoints, completed database migrations, and improved data-access patterns for reliability and clarity.',
      'Partnered with engineers and materials scientists to validate requirements and accurately represent domain-specific data.',
    ],
    logo: materiality,
    technologies: ['React', 'TypeScript', 'ASP.NET', 'C#', 'F#', 'SQL'],
  },
];
