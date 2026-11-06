export default function Footer({ config }) {
  return (
    <footer>
      <div className="avail">Available for freelance web and video work</div>
      <div>© {new Date().getFullYear()} {config.brand} ({config.firstName} {config.lastName})</div>
      <div className="soc">
        <a href={config.github} target="_blank" rel="noopener">GitHub</a>
        <a href={`mailto:${config.email}`}>Email</a>
      </div>
    </footer>
  )
}
