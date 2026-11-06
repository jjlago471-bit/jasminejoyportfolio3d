import { CONFIG } from './data/config.js'
import { useReveal } from './hooks.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Reel from './components/Reel.jsx'
import Projects from './components/Projects.jsx'
import AboutSkills from './components/AboutSkills.jsx'
import ServicesExperience from './components/ServicesExperience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  useReveal()
  return (
    <>
      <div className="glow" />
      <Navbar brand={CONFIG.brand} />
      <Hero config={CONFIG} />
      <main className="wrap">
        <Reel videos={CONFIG.videos} />
        <Projects projects={CONFIG.projects} />
        <AboutSkills config={CONFIG} />
        <ServicesExperience services={CONFIG.services} experience={CONFIG.experience} />
        <Contact config={CONFIG} />
        <Footer config={CONFIG} />
      </main>
    </>
  )
}
