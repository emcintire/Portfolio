import { useEffect, useRef } from 'react';
import './Skills.css';
import { map } from 'lodash';
import ai from '@/assets/images/ai.svg';
import asp from '@/assets/images/asp.svg';
import c from '@/assets/images/c.svg';
import css from '@/assets/images/css.svg';
import flask from '@/assets/images/flask.svg';
import ts from '@/assets/images/ts.svg';
import mongo from '@/assets/images/mongo.svg';
import node from '@/assets/images/node.svg';
import post from '@/assets/images/post.svg';
import ps from '@/assets/images/ps.svg';
import python from '@/assets/images/python.svg';
import reactLogo from '@/assets/images/react.svg';
import { Stack } from '@mui/material';

const speed = 10;

const skills = [
  { name: 'React', img: reactLogo },
  { name: 'Typescript', img: ts },
  { name: 'Node.js', img: node },
  { name: 'C#', img: c },
  { name: 'ASP.Net', img: asp },
  { name: 'Python', img: python },
  { name: 'Flask', img: flask },
  { name: 'CSS', img: css },
  { name: 'MongoDB', img: mongo },
  { name: 'SQL', img: post },
  { name: 'Photoshop', img: ps },
  { name: 'Illustrator', img: ai },
];

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
    <Stack spacing={2} width="100%" alignItems="center">
      <h1 className="skills-header">Skills</h1>
      <div className='carousel-wrapper'>
        <div className='carousel' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={carouselRef}>
          {map(duplicatedSkills, (skill, index) => (
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