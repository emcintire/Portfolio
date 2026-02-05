import "./Landscape.css";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { endsWith, map } from 'lodash';

const links = [
  { id: "adirondacks2025", name: "Adirondacks", year: "2025" },
  { id: "rockies2024", name: "Rockies", year: "2024" },
  { id: "roadtrip2022", name: "Roadtrip", year: "2022" },
  { id: "yellowstone2021", name: "Yellowstone", year: "2021" },
  { id: "tetons2021", name: "Grand Tetons", year: "2021" },
  { id: "alaska2020", name: "Alaska", year: "2020" },
  { id: "mammoth2020", name: "Mammoth", year: "2020" },
  { id: "yosemite2019", name: "Yosemite", year: "2019" },
  { id: "malabar2019", name: "Malabar", year: "2019" },
  { id: "roadtrip2018", name: "Roadtrip", year: "2018" },
  { id: "alaska2018", name: "Alaska", year: "2018" },
  { id: "summer2017", name: "Summer", year: "2017" },
]

export function Landscape() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!endsWith(pathname, 'landscape')) return;
    const album = sessionStorage.getItem('album');
    if (album) {
      document.getElementById(album)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div id="landscape-page">
      {endsWith(pathname, 'landscape') && (
        <ul className="category-list">
          {map(links, (link) => (
            <div className="category-container" id={link.id} key={link.id}>
              <Link
                className="category-link"
                to={link.id}
                onClick={() => sessionStorage.setItem('album', link.id)}
              >
                {link.name}
                <br />
                <span className="cat-year">{link.year}</span>
              </Link>
            </div>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
}
