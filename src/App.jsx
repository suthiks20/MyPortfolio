import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import { Header, ScrollProgress } from './components/Header'

function App() {
  return (
    <div className="relative">
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certificates />
        <Achievements />
        <Contact />
      </main>
    </div>
  )
}

export default App