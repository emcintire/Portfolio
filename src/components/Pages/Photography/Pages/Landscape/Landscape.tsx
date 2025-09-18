import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BackArrow } from '../../../../Buttons/BackArrow.tsx';
import "./Landscape.css";
import { map } from 'lodash';
import { LandscapeRoutes } from './LandscapeRoutes';

const links = [
  { id: "adirondacks2025", name: "Adirondacks", year: "2025" },
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
  const storeLocation = (id: string) => {
    window.localStorage.removeItem("album");
    window.localStorage.setItem("album", id);
  };

  useEffect(() => {
    const album = window.localStorage.getItem("album");
    if (album) {
      document.getElementById(album)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div id="landscape-container">
        <BackArrow />
        <ul id="category-list">
          {map(links, (link) => (
            <div className="category-container" id={link.id} key={link.id}>
              <Link
                className="category-link"
                to={`/photography/landscape/${link.id}`}
                onClick={() => storeLocation(link.id)}
              >
                {link.name}
                <br />
                <span className="cat-year">{link.year}</span>
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <LandscapeRoutes />
    </>
  );
}
