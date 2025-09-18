import { Route, Routes } from 'react-router-dom';

import { Alaska2018 } from './Pages/Alaska2018.tsx';
import { Alaska2020 } from './Pages/Alaska2020.tsx';
import { Malabar2019 } from './Pages/Malabar2019.tsx';
import { Mammoth2020 } from './Pages/Mammoth2020.tsx';
import { Roadtrip2018 } from './Pages/Roadtrip2018.tsx';
import { Summer2017 } from './Pages/Summer2017.tsx';
import { Tetons2021 } from './Pages/Tetons2021.tsx';
import { Roadtrip2022 } from './Pages/RoadTrip2022.tsx';
import { Yellowstone2021 } from './Pages/Yellowstone2021.tsx';
import { Yosemite2019 } from './Pages/Yosemite2019.tsx';

export function LandscapeRoutes() {
  return (
    <Routes>
      <Route path="alaska2018" element={<Alaska2018 />} />
      <Route path="alaska2020" element={<Alaska2020 />} />
      <Route path="malabar" element={<Malabar2019 />} />
      <Route path="mammoth" element={<Mammoth2020 />} />
      <Route path="mammoth" element={<Mammoth2020 />} />
      <Route path="roadtrip" element={<Roadtrip2018 />} />
      <Route path="roadtrip2022" element={<Roadtrip2022 />} />
      <Route path="summer2017" element={<Summer2017 />} />
      <Route path="tetons" element={<Tetons2021 />} />
      <Route path="yellowstone" element={<Yellowstone2021 />} />
      <Route path="yosemite" element={<Yosemite2019 />} />
    </Routes>
  )
}
