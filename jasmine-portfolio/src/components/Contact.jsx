export default function Contact({ config }) {
  return (
    <section className="s rv" id="contact">
      <div className="card contact">
        <h2>Let’s work <b>together</b></h2>
        <p>Have a website to build or footage to edit? Send me a message with what you need and your deadline.</p>
        <div className="cta">
          <a className="pill w" href={`mailto:${config.email}`}>✉ Contact me</a>
          <a className="pill g" href={config.github} target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    </section>
  )
}
