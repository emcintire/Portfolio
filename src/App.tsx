import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Pages/Home/Home.tsx'
import { Projects } from './components/Pages/Projects/Projects.tsx'
import { Footer } from './components/Footer/Footer.tsx'
import { Photography } from './components/Pages/Photography/Photography.tsx'
import { Landscape } from './components/Pages/Photography/Pages/Landscape/Landscape.tsx'
import { Alaska2018 } from './components/Pages/Photography/Pages/Landscape/Pages/Alaska2018.tsx'
import { Alaska2020 } from './components/Pages/Photography/Pages/Landscape/Pages/Alaska2020.tsx'
import { Malabar2019 } from './components/Pages/Photography/Pages/Landscape/Pages/Malabar2019.tsx'
import { Mammoth2020 } from './components/Pages/Photography/Pages/Landscape/Pages/Mammoth2020.tsx'
import { Roadtrip2018 } from './components/Pages/Photography/Pages/Landscape/Pages/Roadtrip2018.tsx'
import { Roadtrip2022 } from './components/Pages/Photography/Pages/Landscape/Pages/RoadTrip2022.tsx'
import { Summer2017 } from './components/Pages/Photography/Pages/Landscape/Pages/Summer2017.tsx'
import { Tetons2021 } from './components/Pages/Photography/Pages/Landscape/Pages/Tetons2021.tsx'
import { Yellowstone2021 } from './components/Pages/Photography/Pages/Landscape/Pages/Yellowstone2021.tsx'
import { Yosemite2019 } from './components/Pages/Photography/Pages/Landscape/Pages/Yosemite2019.tsx'
import { Portraits } from './components/Pages/Photography/Pages/Portraits/Portraits.tsx'
import { Animals } from './components/Pages/Photography/Pages/Animals/Animals.tsx'
import { Miscellaneous } from './components/Pages/Photography/Pages/Miscellaneous/Miscellaneous.tsx'
import { Teddy12m } from './components/Pages/Photography/Pages/Portraits/Pages/Teddy12m.tsx';
import { Teddy18m } from './components/Pages/Photography/Pages/Portraits/Pages/Teddy18m.tsx';
import { Rio3m } from './components/Pages/Photography/Pages/Portraits/Pages/Rio3m.tsx';
import { Rio8m } from './components/Pages/Photography/Pages/Portraits/Pages/Rio8m.tsx';
import { Rio15m } from './components/Pages/Photography/Pages/Portraits/Pages/Rio15m.tsx';
import { TrudyBeachMat } from './components/Pages/Photography/Pages/Portraits/Pages/TrudyBeachMat.tsx';
import { TrudySnowMat } from './components/Pages/Photography/Pages/Portraits/Pages/TrudySnowMat.tsx';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="photography" element={<Photography />}>

          <Route path="landscape" element={<Landscape />}>
            <Route path="alaska2018" element={<Alaska2018 />} />
            <Route path="alaska2020" element={<Alaska2020 />} />
            <Route path="malabar2019" element={<Malabar2019 />} />
            <Route path="mammoth2020" element={<Mammoth2020 />} />
            <Route path="roadtrip2018" element={<Roadtrip2018 />} />
            <Route path="roadtrip2022" element={<Roadtrip2022 />} />
            <Route path="summer2017" element={<Summer2017 />} />
            <Route path="tetons2021" element={<Tetons2021 />} />
            <Route path="yellowstone2021" element={<Yellowstone2021 />} />
            <Route path="yosemite2019" element={<Yosemite2019 />} />
          </Route>

          <Route path="portraits" element={<Portraits />}>
            <Route path="teddy12m" element={<Teddy12m />} />
            <Route path="teddy18m" element={<Teddy18m />} />
            <Route path="rio3m" element={<Rio3m />} />
            <Route path="rio8m" element={<Rio8m />} />
            <Route path="rio15m" element={<Rio15m />} />
            <Route path="TrudyBeachMat" element={<TrudyBeachMat />} />
            <Route path="TrudySnowMat" element={<TrudySnowMat />} />
          </Route>

          <Route path="animals" element={<Animals />} />
          <Route path="miscellaneous" element={<Miscellaneous />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}
