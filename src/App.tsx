import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Pages/Home/Home'
import { Projects } from './components/Pages/Projects/Projects'
import { PhotographyRoutes } from './components/Pages/Photography/PhotographyRoutes'
import { Footer } from './components/Footer/Footer'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/photography" element={<PhotographyRoutes />} />
      </Routes>
      <Footer />
    </>
  )
}
