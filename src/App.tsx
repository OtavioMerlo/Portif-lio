import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import CurrentFocus from './components/sections/CurrentFocus'
import TechStack from './components/sections/TechStack'
import Projects from './components/sections/Projects'
import Timeline from './components/sections/Timeline'
import Contact from './components/sections/Contact'
import EducGamesPage from './pages/EducGames'

function HomePage() {
  useLenis()
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CurrentFocus />
        <TechStack />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/educgames" element={<EducGamesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
