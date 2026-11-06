import { Logo } from './Icons.jsx'

const LINKS = [['Home', 'home'], ['About', 'about'], ['Reel', 'reel'], ['Projects', 'projects'], ['Skills', 'skills'], ['Experience', 'experience']]

export default function Navbar({ brand }) {
  return (
    <header className="nav">
      <a href="#home" className="logo" aria-label="Home"><Logo />{brand}</a>
      <nav className="links" aria-label="Main">
        {LINKS.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <a className="pill w sm" href="#contact">Contact me</a>
    </header>
  )
}
