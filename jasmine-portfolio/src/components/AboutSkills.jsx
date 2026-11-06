import { useState } from 'react'
import Tabs from './Tabs.jsx'

export default function AboutSkills({ config }) {
  const [filter, setFilter] = useState('all')
  const skills = config.skills.filter((s) => filter === 'all' || s.t === filter)

  return (
    <section className="s two rv" id="about">
      <div className="card">
        <div className="about">
          <div style={{ flex: 1 }}>
            <h2>About <b>me</b></h2>
            <p>I’m Jasmine Joy Lago, a web developer and video editor with a background in computer science. I edit in CapCut and have been doing it since 2026. I like work where the code and the cut both matter: sites that load fast and look sharp, and videos with clean pacing, sound, and color.</p>
            <a className="pill w sm" href={config.cv} target="_blank" rel="noopener">⬇ View CV</a>
          </div>
          <div className="ph">
            <img src="/images/jasmine.png" alt={`${config.firstName} ${config.lastName}`} width="120" height="120" />
          </div>
        </div>
      </div>

      <div className="card" id="skills">
        <div className="sh" style={{ marginBottom: 20 }}>
          <h2>Skills & <b>tools</b></h2>
          <Tabs items={[['all', 'All'], ['web', 'Web'], ['video', 'Video']]} value={filter} onChange={setFilter} />
        </div>
        <div className="skills">
          {skills.map((s) => (
            <div key={s.n} className="skill">
              <i style={{ background: s.col, color: s.dark ? '#111' : '#fff' }}>{s.c}</i>{s.n}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
