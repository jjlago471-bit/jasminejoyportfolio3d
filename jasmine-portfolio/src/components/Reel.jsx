import { useEffect, useRef, useState } from 'react'
import { Play } from './Icons.jsx'

export default function Reel({ videos }) {
  const [current, setCurrent] = useState(null)
  const dialogRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    const d = dialogRef.current
    if (current) {
      d.showModal()
      playerRef.current.play().catch(() => {})
    } else if (d.open) {
      playerRef.current.pause()
      d.close()
    }
  }, [current])

  const hoverPlay = (e, on) => {
    if (!matchMedia('(hover:hover)').matches) return
    const v = e.currentTarget.querySelector('video')
    if (on) v.play().catch(() => {})
    else { v.pause(); v.currentTime = 0 }
  }

  return (
    <section className="s rv" id="reel">
      <div className="sh">
        <div>
          <h2>Video <b>portfolio</b></h2>
          <p className="sub">Hover to preview, tap to watch with sound.</p>
        </div>
      </div>
      <div className="collage">
        {videos.map((src, i) => (
          <button key={src} type="button" className="cv" aria-label={`Play video ${i + 1}`}
            onMouseEnter={(e) => hoverPlay(e, true)} onMouseLeave={(e) => hoverPlay(e, false)}
            onClick={() => setCurrent(src)}>
            <video src={src} poster={src.replace('.mp4', '.jpg')} muted loop playsInline preload="none" />
            <span className="bd">Edit 0{i + 1}<small>CapCut</small></span>
            <span className="pb"><Play /></span>
          </button>
        ))}
      </div>

      <dialog ref={dialogRef} aria-label="Video player"
        onClick={(e) => e.target === dialogRef.current && setCurrent(null)}
        onClose={() => setCurrent(null)}>
        <div className="lb">
          <button className="x" type="button" aria-label="Close" onClick={() => setCurrent(null)}>×</button>
          <video ref={playerRef} src={current || undefined} controls playsInline />
        </div>
      </dialog>
    </section>
  )
}
