import { Route, Routes } from 'react-router-dom';
import { Landscape } from './Pages/Landscape/Landscape.tsx';
import { Portraits } from './Pages/Portraits/Portraits.tsx';
import { Animals } from './Pages/Animals/Animals.tsx';
import { Miscellaneous } from './Pages/Miscellaneous/Miscellaneous.tsx';

export function PhotographyRoutes() {
  return (
    <Routes>
      <Route path="landscape" element={<Landscape />} />
      <Route path="portraits" element={<Portraits />} />
      <Route path="animals" element={<Animals />} />
      <Route path="miscellaneous" element={<Miscellaneous />} />
    </Routes>
  );
}
