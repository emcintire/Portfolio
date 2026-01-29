import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import './Experience.css';

const experiences = [  {
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
  logo: '',
},
{
  startDate: 'Jun 2021',
  endDate: 'Nov 2021',
  company: 'Materiality/Datapoint Labs',
  role: 'Full Stack Software Engineer Intern',
  description: [
		'Built and enhanced production features using React, TypeScript, ASP.NET/C#/F#, working closely with materials engineers to translate scientific workflows into intuitive software tools.',
		'Worked extensively with large material-testing datasets, implementing performant interfaces and visualizations using jQuery and jqPlot to help labs analyze mechanical, thermal, and structural properties.',
		'Contributed to backend development by adding new API endpoints, performing database migrations, and improving data access patterns for reliability and clarity.',
		'Collaborated across engineering and scientific teams to refine requirements, validate results, and ensure accurate representation of domain-specific data.',
  ],
  logo: '',
}];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export default function Experience() {
	const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>({});
	const sectionRef = useRef<HTMLDivElement>(null);
	const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
	const firstLogoRef = useRef<HTMLDivElement | null>(null);
	const lastLogoRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!sectionRef.current) return;

		const updateProgress = () => {
			const el = sectionRef.current;
			if (!el) return;
			const viewportH = window.innerHeight || 1;

			// Prefer progress between the first and last logos so the line keeps growing
			// as you scroll down through the experiences (even when cards are tall).
			const firstEl = firstLogoRef.current;
			const lastEl = lastLogoRef.current;
			if (firstEl && lastEl) {
				const triggerY = viewportH * 0.78;
				const firstRect = firstEl.getBoundingClientRect();
				const lastRect = lastEl.getBoundingClientRect();
				const firstCenterY = firstRect.top + firstRect.height / 2;
				const lastCenterY = lastRect.top + lastRect.height / 2;
				const denom = Math.max(1, lastCenterY - firstCenterY);
				const progress = clamp01((triggerY - firstCenterY) / denom);
				el.style.setProperty('--line-progress', String(progress));
				return;
			}

			const rect = el.getBoundingClientRect();

			// 0 when the section hits the bottom of the viewport, 1 when it fully scrolls past.
			const progress = clamp01((viewportH - rect.top) / (rect.height + viewportH));
			el.style.setProperty('--line-progress', String(progress));
		};

		const updateLineBounds = () => {
			const timelineEl = sectionRef.current;
			const firstEl = firstLogoRef.current;
			const lastEl = lastLogoRef.current;
			if (!timelineEl || !firstEl || !lastEl) return;

			const timelineRect = timelineEl.getBoundingClientRect();
			const firstRect = firstEl.getBoundingClientRect();
			const lastRect = lastEl.getBoundingClientRect();

			const firstCenterY = firstRect.top + firstRect.height / 2;
			const lastCenterY = lastRect.top + lastRect.height / 2;

			const topPx = Math.max(0, firstCenterY - timelineRect.top);
			const bottomPx = Math.max(0, timelineRect.bottom - lastCenterY);

			timelineEl.style.setProperty('--line-top', `${topPx}px`);
			timelineEl.style.setProperty('--line-bottom', `${bottomPx}px`);
		};

		let rafId = 0;
		const onScroll = () => {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				updateLineBounds();
				updateProgress();
			});
		};
		updateLineBounds();
		updateProgress();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				setVisibleMap((prev) => {
					let changed = false;
					const next: Record<number, boolean> = { ...prev };

					for (const entry of entries) {
						const indexAttr = entry.target.getAttribute('data-index');
						if (!indexAttr) continue;
						const index = Number(indexAttr);
						if (Number.isNaN(index)) continue;

						if (entry.isIntersecting && !next[index]) {
							next[index] = true;
							changed = true;
						}
					}

					return changed ? next : prev;
				});
			},
			{ threshold: 0.22 },
		);

		for (const el of rowRefs.current) {
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	}, [experiences.length]);

	return (
		<Box className="experienceSection">
			<Box className="experienceInner">
				<Stack spacing={2} width="100%" alignItems="center">
					<h1 className="skills-header">Experience</h1>

					<Box ref={sectionRef} className="timeline">
						{experiences.map((exp, index) => (
							<Box
								key={`${exp.company}-${exp.role}-${index}`}
								className={`timelineRow ${visibleMap[index] ? 'isVisible' : ''}`}
								ref={(el: HTMLDivElement | null) => {
									rowRefs.current[index] = el;
								}}
								data-index={index}
							>
                <Box className="timelineRail">
									<Avatar
										className="logoAvatar"
										src={exp.logo || undefined}
										alt={exp.company}
										ref={
											index === 0
												? (firstLogoRef as unknown as React.Ref<HTMLDivElement>)
												: index === experiences.length - 1
													? (lastLogoRef as unknown as React.Ref<HTMLDivElement>)
													: undefined
										}
									>
										{exp.company.slice(0, 1)}
									</Avatar>
								</Box>

								<Box className="timelineMeta">
									<span className="dateText">
										{exp.startDate} - {exp.endDate}
									</span>
								</Box>

								<Paper className="timelineCard" elevation={0}>
									<Box padding={{ xs: 2, sm: 2.5 }}>
										<Typography
											variant="h5"
											className="roleText"
											sx={{ color: 'color-mix(in srgb, var(--light, #fff) 92%, transparent)' }}
										>
											{exp.role}
										</Typography>

										<Typography variant="subtitle1" className="companyText">
											{exp.company}
										</Typography>

										<ul className="bullets">
											{exp.description.map((line) => (
												<li key={line}>{line}</li>
											))}
										</ul>
									</Box>
								</Paper>
							</Box>
						))}
					</Box>
				</Stack>
			</Box>
		</Box>
	);
}
