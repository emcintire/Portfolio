import './Navbar.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { includes, join, last, remove, split } from 'lodash';
import { Grid, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { FloatingLinks } from './FloatingLinks.tsx';
import { Burger } from '../Buttons/Burger.tsx';

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
  const navigate = useNavigate();
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

  const handleClickLink = (id: string) => {
    if (includes(['home', 'about', 'projects'], id)) {
      window.localStorage.removeItem('category');
      window.localStorage.removeItem('album');
    }
    setOpen(false);
  }

  const goBack = () => {
    setOpen(false);
    const oneLevelUp = join(remove(split(pathname, '/'), (_, index, array) => array.length - 1 !== index), '/');
    navigate(oneLevelUp);
  }

  if (activeLink === '') { return null; }

  return (
    <div id="nav">
      {open && <FloatingLinks onClickLink={handleClickLink} />}
      <div id='cover' className={open ? 'covering' : ''} />
      <Grid
        className={`navbar ${(isVisible || open) ? 'visible' : 'hidden'}`}
        container
        position="fixed"
        top={0}
        width="100%"
      >
        <Grid size={1} display="flex" justifyContent="start" alignItems="center" paddingLeft={2}>
          <IconButton className="back-btn" onClick={goBack}>
            <ArrowBack className="back-icon" fontSize="large" />
          </IconButton>
        </Grid>
        <Grid size={10} display="flex" justifyContent="center" alignItems="center">
          <span className="navbar-header">{title}</span>
        </Grid>
        <Grid size={1}>
          <Burger open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
    </div>
  );
}
