import { useState } from 'react'
import Tabs from './Tabs.jsx'
import { Arrow } from './Icons.jsx'

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all')
  const list = projects.filter((p) => filter === 'all' || p.type === filter)

  return (
    <section className="s rv" id="projects">
      <div className="sh">
        <div>
          <h2>Featured <b>projects</b></h2>
          <p className="sub">Websites, web apps, and edited videos.</p>
        </div>
        <Tabs items={[['all', 'All'], ['web', 'Web'], ['video', 'Video']]} value={filter} onChange={setFilter} />
      </div>
      <div className="projects">
        {list.map((p) => (
          <article key={p.title} className="card proj">
            <div className={`thumb${p.img ? "" : " mock"}`} style={{ background: p.grad }}>
              {p.img && <img src={p.img} alt={`${p.title} preview`} loading="lazy" />}
              <span className="k">{p.type}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="foot">
              <div className="tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              <a className="go" href={p.link} target="_blank" rel="noopener"
                aria-label={`${p.type === 'video' ? 'Watch' : 'Open'} ${p.title}`}><Arrow /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
