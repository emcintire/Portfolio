import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { endsWith, map } from 'lodash';
import './Photography.scss';
import { storeLocation } from '../../../helpers';
import landscapeImg from '../../../assets/images/landscape.jpg';
import portraitsImg from '../../../assets/images/portraits.jpg';
import animalsImg from '../../../assets/images/animals.png';
import miscImg from '../../../assets/images/misc.jpg';

const links = [
  { id: 'landscape', name: 'Landscape', backgroundImage: landscapeImg },
  { id: 'portraits', name: 'Portraits', backgroundImage: portraitsImg },
  { id: 'animals', name: 'Animals', backgroundImage: animalsImg },
  { id: 'misc', name: 'Miscellaneous', backgroundImage: miscImg },
];

export function Photography() {
  const { pathname } = useLocation();

  useEffect(() => {
    const category = window.localStorage.getItem('category');
    if (category) {
      document.getElementById(category)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div id="photography-page">
      {endsWith(pathname, 'photography') && (
        <ul className="category-list">
          {map(links, (link) => (
            <div 
              className="category-container" 
              id={link.id} 
              key={link.id}
              style={{ backgroundImage: `url(${link.backgroundImage})` }}
            >
              <Link
                className="category-link"
                to={link.id}
                onClick={storeLocation('category', link.id, ['album', 'category'])}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
}
