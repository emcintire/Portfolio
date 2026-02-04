import './Portraits.css';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { endsWith, map } from 'lodash';

const links = [
  { id: 'teddy-12m', name: 'Teddy One Year', year: '2017', path: 'teddy12m' },
  { id: 'teddy-18m', name: 'Teddy Eighteen Months', year: '2018', path: 'teddy18m' },
  { id: 'beach', name: 'Trudy Beach Maternity', year: '2019', path: 'trudybeachmaternity' },
  { id: 'snow', name: 'Trudy Snow Maternity', year: '2019', path: 'trudysnowmaternity' },
  { id: 'rio-3m', name: 'Rio Three Months', year: '2019', path: 'rio3m' },
  { id: 'rio-8m', name: 'Rio Eight Months', year: '2019', path: 'rio8m' },
  { id: 'rio-15m', name: 'Rio Fifteen Months', year: '2020', path: 'rio15m' },
];

export function Portraits() {
  const { pathname } = useLocation();

  useEffect(() => {
    const album = sessionStorage.getItem('album');
    if (album) {
      if (!document.getElementById(album)) {
        sessionStorage.removeItem('album');
        window.scrollTo(0, 0);
      } else {
        document.getElementById(album)?.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div id='portraits-page'>
      {endsWith(pathname, 'portraits') && (
        <ul className='category-list'>
          {map(links, (link) => (
            <div className='category-container' id={link.id} key={link.id}>
              <Link
                className='category-link'
                to={link.path}
                onClick={() => sessionStorage.setItem('album', link.id)}>
                {link.name}
                <br />
                <span className='cat-year'>{link.year}</span>
              </Link>
            </div>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
}
