import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import './Photography.scss';
import { PhotographyRoutes } from './PhotographyRoutes';

const links = [
  { id: 'landscape', name: 'Landscape' },
  { id: 'portraits', name: 'Portraits' },
  { id: 'animals', name: 'Animals' },
  { id: 'misc', name: 'Miscellaneous' },
];

export default function Photography() {
  const storeLocation = (id: string) => {
    window.localStorage.removeItem('category');
    window.localStorage.removeItem('album');
    window.localStorage.setItem('category', id);
  };

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
      <div id="photography-container">
        <ul id="category-list">
          {map(links, (link) => (
            <div className="category-container" id={link.id} key={link.id}>
              <Link
                className="category-link"
                to={`/photography/${link.id}`}
                onClick={() => storeLocation(link.id)}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <PhotographyRoutes />
    </>
  );
}
