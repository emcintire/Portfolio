import './Experience.css';
import { useEffect, useRef } from 'react';
import { Avatar, Box, Paper, Stack } from '@mui/material';
import { map } from 'lodash';
import { useRevealOnIntersect } from '../../../../helpers';
import { experiences } from '../../../../data/experience';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export default function Experience() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const firstLogoRef = useRef<HTMLDivElement | null>(null);
	const revealRef = useRevealOnIntersect();

	useEffect(() => {
		if (!sectionRef.current) return;

		const updateProgress = () => {
			const el = sectionRef.current;
			if (!el) return;
			const viewportH = window.innerHeight || 1;
			const rect = el.getBoundingClientRect();

			// 0 when the section hits the bottom of the viewport, 1 when it fully scrolls past.
			const progress = clamp01((viewportH - rect.top) / (rect.height + viewportH));
			el.style.setProperty('--line-progress', String(progress));
		};

		const updateLineBounds = () => {
			const timelineEl = sectionRef.current;
			const firstEl = firstLogoRef.current;
			if (!timelineEl || !firstEl) return;

			const timelineRect = timelineEl.getBoundingClientRect();
			const firstRect = firstEl.getBoundingClientRect();

			const firstCenterY = firstRect.top + firstRect.height / 2;

			const topPx = Math.max(0, firstCenterY - timelineRect.top);

			timelineEl.style.setProperty('--line-top', `${topPx}px`);
			timelineEl.style.setProperty('--line-bottom', '0px');
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

	return (
		<Box className="experienceSection">
			<Box className="experienceInner">
				<Stack width="100%" alignItems="center">
					<h1 className="skills-header">Experience</h1>
					<Box ref={sectionRef} className="timeline">
						{map(experiences, (exp, index) => (
							<Box
								key={`${exp.company}-${exp.role}-${index}`}
								className="timelineRow"
								ref={revealRef}
							>
                <Box className="timelineRail">
									<Avatar
										className="logoAvatar"
										src={exp.logo || undefined}
										alt={exp.company}
										ref={
											index === 0
												? (firstLogoRef as unknown as React.Ref<HTMLDivElement>)
												: undefined
										}
									/>
								</Box>
								<Box className="timelineMeta">
									<span className="dateText">
										{exp.startDate} - {exp.endDate}
									</span>
								</Box>
								<Paper className="timelineCard" elevation={0}>
									<Box padding={{ xs: 2, sm: 2.5 }}>
										<h1 className="roleText">
											{exp.role}
										</h1>
										<span className="companyText">
											{exp.company}
										</span>
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
