import './Skills.css';
import { useEffect, useRef } from 'react';
import { Stack } from '@mui/material';
import { skills } from '@/data/skills';

const speed = 10;

export default function Skills() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills, ...skills];

  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        // Reset to beginning when we've scrolled through one full set
        if (scrollLeft >= (scrollWidth - clientWidth) / 3 * 2) {
          carouselRef.current.scrollLeft = scrollLeft - (scrollWidth - clientWidth) / 3;
        } else {
          carouselRef.current.scrollLeft += 1;
        }
      }
    };
    intervalRef.current = setInterval(scrollCarousel, speed);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        if (scrollLeft >= (scrollWidth - clientWidth) / 3 * 2) {
          carouselRef.current.scrollLeft = scrollLeft - (scrollWidth - clientWidth) / 3;
        } else {
          carouselRef.current.scrollLeft += 1;
        }
      }
    };
    intervalRef.current = setInterval(scrollCarousel, speed);
  };

  return (
    <Stack spacing={2} width="100%" alignItems="center" paddingBottom="100px" role="region" aria-label="Skills">
      <h1 className="skills-header">Skills</h1>
      <div className='carousel-wrapper'>
        <div className='carousel' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={carouselRef} aria-roledescription="carousel">
          {duplicatedSkills.map((skill, index) => (
            <div className='skill-box' key={index}>
              <img src={skill.img} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Stack>
  );
};