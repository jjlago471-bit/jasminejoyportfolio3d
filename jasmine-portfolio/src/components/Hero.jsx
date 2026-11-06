import Blob from './Blob.jsx'
import { Code } from './Icons.jsx'

export default function Hero({ config }) {
  return (
    <section className="hero" id="home">
      <Blob />
      <div className="wrap">
        <p className="mono hello">Hello, I’m {config.firstName} {config.lastName}</p>
        <h1>Code and cut, <em>alive.</em></h1>
        <div className="hero-row">
          <p>Web developer and CapCut video editor since 2026. I build fast, clean sites and cut the footage that goes on them.</p>
          <div className="cta">
            <a className="pill g" href="#reel">▶ Watch reel</a>
            <a className="pill w" href="#projects">View projects</a>
            <a className="sq" aria-label="GitHub" href={config.github} target="_blank" rel="noopener"><Code /></a>
          </div>
        </div>
        <div className="ticks mono">
          <span>Web Dev · Built & deployed</span>
          <span>CapCut · Since 2026</span>
          <span>Fast turnaround</span>
          <span>Always learning</span>
        </div>
      </div>
    </section>
  )
}
