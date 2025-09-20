import './Navbar.css';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Burger } from '../Buttons/Burger';
import { includes, map, split } from 'lodash';
import { Code, Home, Person, PhotoCamera } from '@mui/icons-material';

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
  { id: 'photography', to: '/photography', icon: PhotoCamera, title: 'Photography Portfolio' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const activeLink = useMemo(() => split(pathname, '/')[1] || 'home', [pathname]);

  return (
    <>
      <div id='cover' className={open ? 'covering' : ''} />
      <Burger open={open} setOpen={setOpen} />
      <ul className={`navbar-nav ${open ? 'open' : ''}`} id="nav">
        {map(links, (link) => (
          <li className={`nav-item menu-item ${activeLink === link.id ? 'active' : ''}`} id={link.id} title={link.title}>
            <Link
              className='link'
              to={link.to}
              onClick={handleClickLink(setOpen, link.id)}>
                <link.icon />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
