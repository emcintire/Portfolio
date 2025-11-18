import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Projects } from '../components/Pages/Projects/Projects.tsx'
import { Footer } from '../components/Footer/Footer.tsx'
import { Photography } from '../components/Pages/Photography/Photography.tsx'
import { Landscape } from '../components/Pages/Photography/Pages/Landscape/Landscape.tsx'
import { Portraits } from '../components/Pages/Photography/Pages/Portraits/Portraits.tsx'
import { Home } from '../components/Pages/Home/Home.tsx'
import { About } from '../components/Pages/About/About.tsx'
import { Navbar } from '../components/Navbar/Navbar.tsx'
import { PhotographyPage } from '../components/Pages/Photography/PhotographyPage.tsx'
import { ToastContainer } from 'react-toastify'

export function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="photography" element={<Photography />}>

          <Route path="landscape" element={<Landscape />}>
            <Route path=":album" element={<PhotographyPage />} />
          </Route>

          <Route path="portraits" element={<Portraits />}>
            <Route path=":album" element={<PhotographyPage />} />
          </Route>

          <Route path=":album" element={<PhotographyPage />} />
        </Route>
      </Routes>
      <ToastContainer theme="dark" />
      <Footer />
    </>
  )
}
