import './Navbar.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Burger } from '../Buttons/Burger';
import { includes, last, map, split } from 'lodash';
import { Grid } from '@mui/material';
import { BackArrow } from '../Buttons/BackArrow';
import about from '../../assets/images/about.svg';
import projects from '../../assets/images/projects.svg';
import photography from '../../assets/images/photography.svg';

const handleClickLink = (setOpen: (open: boolean) => void, id: string) => () => {
  if (includes(['home', 'about', 'projects'], id)) {
    window.localStorage.removeItem('category');
    window.localStorage.removeItem('album');
  }
  setOpen(false);
}

const links = [
  { id: 'about', to: '/about', src: about, title: 'About' },
  { id: 'projects', to: '/projects', src: projects, title: 'Projects' },
  { id: 'photography', to: '/photography', src: photography, title: 'Photography' },
];

const titles = {
  '/': 'Home',
  about: 'About',
  adirondacks2025: 'Adirondacks 2025',
  alaska2018: 'Alaska 2018',
  alaska2020: 'Alaska 2020',
  animals: 'Animals',
  landscape: 'Landscape',
  malabar2019: 'Malabar 2019',
  mammoth2020: 'Mammoth 2020',
  misc: 'Miscellaneous',
  photography: 'Photography',
  portraits: 'Portraits',
  projects: 'Projects',
  roadtrip2018: 'Roadtrip 2018',
  roadtrip2022: 'Roadtrip 2022',
  summer2017: 'Summer 2017',
  tetons2021: 'Grand Tetons 2021',
  yellowstone2021: 'Yellowstone 2021',
  yosemite2019: 'Yosemite 2019',
  teddy12m: 'Teddy - One Year',
  teddy18m: 'Teddy - Year and a Half',
  trudybeachmaternity: 'Trudy Beach Maternity',
  trudysnowmaternity: 'Trudy Snow Maternity',
  rio3m: 'Rio - Three Months',
  rio8m: 'Rio - Eight Months',
  rio15m: 'Rio - Fifteen Months',
};

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const activeLink = useMemo(() => last(split(pathname, '/')), [pathname]);

  const title = useMemo(() => titles[activeLink as keyof typeof titles], [activeLink]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top of page
      if (currentScrollY === 0) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (activeLink === '') { return null; }

  return (
    <>
      <div id='cover' className={open ? 'covering' : ''} />
      <Grid container position="fixed" width="100%" top={0} className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <Grid size={1} display="flex" justifyContent="center" alignItems="center">
          <BackArrow />
        </Grid>
        <Grid size={10} display="flex" justifyContent="center" alignItems="center">
          <span className="navbar-header">{title}</span>
        </Grid>
        <Grid size={1}>
          <Burger open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
      <ul className={`navbar-nav ${open ? 'open' : ''}`} id="nav">
        {map(links, (link) => (
          <li
            key={link.id}
            className={`nav-item menu-item ${activeLink === link.id ? 'active' : ''}`}
            id={link.id}
            title={link.title}
          >
            <Link
              className='link'
              to={link.to}
              onClick={handleClickLink(setOpen, link.id)}
            >
              <img src={link.src} alt={link.title} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
