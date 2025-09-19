import './Portraits.css';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BackArrow } from '../../../../Buttons/BackArrow.tsx';
import { endsWith, map } from 'lodash';
import { storeLocation } from '../../../../../helpers/storeLocation.ts';

const links = [
  { id: 'teddy-12m', name: 'Teddy One Year', year: '2017', path: 'teddy12m' },
  { id: 'teddy-18m', name: 'Teddy Year and a Half', year: '2018', path: 'teddy18m' },
  { id: 'beach', name: 'Trudy Beach Maternity', year: '2019', path: 'TrudyBeachMat' },
  { id: 'snow', name: 'Trudy Snow Maternity', year: '2019', path: 'TrudySnowMat' },
  { id: 'rio-3m', name: 'Rio Three Months', year: '2019', path: 'rio3m' },
  { id: 'rio-8m', name: 'Rio Eight Months', year: '2019', path: 'rio8m' },
  { id: 'rio-15m', name: 'Rio Fifteen Months', year: '2020', path: 'rio15m' },
];

export function Portraits() {
  const { pathname } = useLocation();

  useEffect(() => {
    const album = window.localStorage.getItem('album');
    if (album) {
      if (!document.getElementById(album)) {
        window.localStorage.removeItem('album');
        window.scrollTo(0, 0);
      } else {
        document.getElementById(album)?.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      {endsWith(pathname, 'portraits') && (
        <div id='portraits-container'>
          <BackArrow />
          <ul id='category-list'>
            {map(links, (link) => (
              <div className='category-container' id={link.id} key={link.id}>
                <Link
                  className='category-link'
                  to={link.path}
                  onClick={storeLocation('album', link.id, 'album')}>
                  {link.name}
                  <br />
                  <span className='cat-year'>{link.year}</span>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
      <Outlet />
    </>
  );
}
