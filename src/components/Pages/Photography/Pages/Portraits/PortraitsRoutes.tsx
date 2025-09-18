import { Route, Routes } from 'react-router-dom';

import { Teddy12m } from './Pages/Teddy12m.tsx';
import { Teddy18m } from './Pages/Teddy18m.tsx';
import { Rio3m } from './Pages/Rio3m.tsx';
import { Rio8m } from './Pages/Rio8m.tsx';
import { Rio15m } from './Pages/Rio15m.tsx';
import { TrudyBeachMat } from './Pages/TrudyBeachMat.tsx';
import { TrudySnowMat } from './Pages/TrudySnowMat.tsx';

export function PortraitsRoutes() {
  return (
    <Routes>
      <Route path="teddy12m" element={<Teddy12m />} />
      <Route path="teddy18m" element={<Teddy18m />} />
      <Route path="rio3m" element={<Rio3m />} />
      <Route path="rio8m" element={<Rio8m />} />
      <Route path="rio15m" element={<Rio15m />} />
      <Route path="TrudyBeachMat" element={<TrudyBeachMat />} />
      <Route path="TrudySnowMat" element={<TrudySnowMat />} />
    </Routes>
  );
}