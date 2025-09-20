import './Navbar.css';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Burger } from '../Buttons/Burger';
import { includes, last, map, split } from 'lodash';
import { Code, Home, Person, PhotoCamera } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { BackArrow } from '../Buttons/BackArrow';

const handleClickLink = (setOpen: (open: boolean) => void, id: string) => () => {
  if (includes(['home', 'about', 'projects'], id)) {
    window.localStorage.removeItem('category');
    window.localStorage.removeItem('album');
  }
  setOpen(false);
}

const links = [
  { id: 'home', to: '/', icon: Home, title: 'Home' },
  { id: 'about', to: '/about', icon: Person, title: 'About' },
  { id: 'projects', to: '/projects', icon: Code, title: 'Projects' },
  { id: 'photography', to: '/photography', icon: PhotoCamera, title: 'Photography' },
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

  const activeLink = useMemo(() => last(split(pathname, '/')), [pathname]);

  const title = useMemo(() => titles[activeLink as keyof typeof titles], [activeLink]);

  if (activeLink === '') { return null; }

  return (
    <>
      <div id='cover' className={open ? 'covering' : ''} />
      <Grid container position="fixed" width="100%" top={0} className="navbar">
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
              <link.icon />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
