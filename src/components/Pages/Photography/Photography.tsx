import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { endsWith, map } from 'lodash';
import './Photography.css';

const links = [
  { id: 'landscape', name: 'Landscape' },
  { id: 'portraits', name: 'Portraits' },
  { id: 'animals', name: 'Animals' },
  { id: 'misc', name: 'Miscellaneous' },
];

export function Photography() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!endsWith(pathname, 'photography')) return;
    const category = sessionStorage.getItem('category');
    if (category) {
      document.getElementById(category)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div id="photography-page">
      {endsWith(pathname, 'photography') && (
        <ul className="category-list">
          {map(links, (link) => (
            <div className="category-container" id={link.id} key={link.id}>
              <Link
                className="category-link"
                to={link.id}
                onClick={() => {
                  sessionStorage.removeItem('album');
                  sessionStorage.setItem('category', link.id);
                }}
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
