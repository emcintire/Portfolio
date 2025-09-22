import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Landscape.css";
import { endsWith, map } from 'lodash';
import { storeLocation } from '../../../../../helpers/storeLocation.ts';
import adksImg from '../../../../../assets/images/adks.jpg?url';
import alaska2018Img from '../../../../../assets/images/alaska2018.jpg?url';
import alaska2020Img from '../../../../../assets/images/alaska2020.jpg?url';
import malabarImg from '../../../../../assets/images/malabar.jpg?url';
import mammothImg from '../../../../../assets/images/mammoth.jpg?url';
import roadtrip2018Img from '../../../../../assets/images/roadtrip.jpg?url';
import summerImg from '../../../../../assets/images/summer.jpg?url';
import tetonsImg from '../../../../../assets/images/tetons.jpg?url';
import yellowstoneImg from '../../../../../assets/images/yellowstone.png?url';
import yosemiteImg from '../../../../../assets/images/yosemite.jpg?url';

const links = [
  { id: "adirondacks2025", name: "Adirondacks", year: "2025", backgroundImage: adksImg },
  { id: "roadtrip2022", name: "Roadtrip", year: "2022", backgroundImage: "https://i.imgur.com/C5F5r4u.jpg" },
  { id: "yellowstone2021", name: "Yellowstone", year: "2021", backgroundImage: yellowstoneImg },
  { id: "tetons2021", name: "Grand Tetons", year: "2021", backgroundImage: tetonsImg },
  { id: "alaska2020", name: "Alaska", year: "2020", backgroundImage: alaska2020Img },
  { id: "mammoth2020", name: "Mammoth", year: "2020", backgroundImage: mammothImg },
  { id: "yosemite2019", name: "Yosemite", year: "2019", backgroundImage: yosemiteImg },
  { id: "malabar2019", name: "Malabar", year: "2019", backgroundImage: malabarImg },
  { id: "roadtrip2018", name: "Roadtrip", year: "2018", backgroundImage: roadtrip2018Img },
  { id: "alaska2018", name: "Alaska", year: "2018", backgroundImage: alaska2018Img },
  { id: "summer2017", name: "Summer", year: "2017", backgroundImage: summerImg },
]

export function Landscape() {
  const { pathname } = useLocation();

  useEffect(() => {
    const album = window.localStorage.getItem("album");
    if (album) {
      document.getElementById(album)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div id="landscape-page">
      {endsWith(pathname, 'landscape') && (
        <ul className="category-list">
          {map(links, (link) => (
            <div 
              className="category-container" 
              id={link.id} 
              key={link.id}
              style={{
                backgroundImage: `url(${link.backgroundImage})`,
              }}
            >
              <Link
                className="category-link"
                to={link.id}
                onClick={storeLocation('album', link.id, 'album')}
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
