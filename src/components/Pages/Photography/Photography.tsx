import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { endsWith, map } from 'lodash';
import './Photography.scss';
import { storeLocation } from '../../../helpers';

const links = [
  { id: 'landscape', name: 'Landscape' },
  { id: 'portraits', name: 'Portraits' },
  { id: 'animals', name: 'Animals' },
  { id: 'misc', name: 'Miscellaneous' },
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
    <>
      {endsWith(pathname, 'photography') && (
        <div id="photography-container">
          <ul id="category-list">
            {map(links, (link) => (
              <div className="category-container" id={link.id} key={link.id}>
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
        </div>
      )}
      <Outlet />
    </>
  );
}
