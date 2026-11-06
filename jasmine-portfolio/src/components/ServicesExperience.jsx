import { useState } from 'react'
import { Chevron } from './Icons.jsx'

export default function ServicesExperience({ services, experience }) {
  const [open, setOpen] = useState(0)

  return (
    <section className="s two rv" id="services">
      <div>
        <h2>What I can <b>help with</b></h2>
        <p className="sub">Web and video, from one person.</p>
        <div className="svcs">
          {services.map(([title, desc], i) => (
            <div key={title} className="svc">
              <span className="n">0{i + 1}</span>
              <b>{title}</b>
              <span className="d">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="experience">
        <h2 style={{ marginBottom: 22 }}>Work <b>experience</b></h2>
        <div className="acc">
          {experience.map(([date, role, text], i) => (
            <div key={role} className={`ai${open === i ? ' open' : ''}`}>
              <button className="ah" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="num">0{i + 1}</span>
                <b>{role}</b>
                <small>{date}</small>
                <span className="chev"><Chevron /></span>
              </button>
              <div className="ab"><div><p>{text}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
