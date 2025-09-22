import './Portraits.css';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { endsWith, map } from 'lodash';
import { storeLocation } from '../../../../../helpers/storeLocation.ts';
import ted1Img from '../../../../../assets/images/ted1.jpg';
import ted2Img from '../../../../../assets/images/ted2.jpg';
import beachImg from '../../../../../assets/images/beach.jpg';
import snowImg from '../../../../../assets/images/snow.jpg';
import rio1Img from '../../../../../assets/images/rio1.jpg';
import rio2Img from '../../../../../assets/images/rio2.jpg';
import rio3Img from '../../../../../assets/images/rio3.jpg';

const links = [
  { id: 'teddy-12m', name: 'Teddy One Year', year: '2017', path: 'teddy12m', backgroundImage: ted1Img },
  { id: 'teddy-18m', name: 'Teddy Year and a Half', year: '2018', path: 'teddy18m', backgroundImage: ted2Img },
  { id: 'beach', name: 'Trudy Beach Maternity', year: '2019', path: 'trudybeachmaternity', backgroundImage: beachImg },
  { id: 'snow', name: 'Trudy Snow Maternity', year: '2019', path: 'trudysnowmaternity', backgroundImage: snowImg },
  { id: 'rio-3m', name: 'Rio Three Months', year: '2019', path: 'rio3m', backgroundImage: rio1Img },
  { id: 'rio-8m', name: 'Rio Eight Months', year: '2019', path: 'rio8m', backgroundImage: rio2Img },
  { id: 'rio-15m', name: 'Rio Fifteen Months', year: '2020', path: 'rio15m', backgroundImage: rio3Img },
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
    <div id='portraits-page'>
      {endsWith(pathname, 'portraits') && (
        <ul className='category-list'>
          {map(links, (link) => (
            <div 
              className='category-container' 
              id={link.id} 
              key={link.id}
              style={{
                backgroundImage: `url(${link.backgroundImage})`,
              }}
            >
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
      )}
      <Outlet />
    </div>
  );
}
