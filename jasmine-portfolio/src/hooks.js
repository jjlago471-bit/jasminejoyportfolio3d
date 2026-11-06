import { useEffect } from 'react'

// Fade sections in on scroll + cursor spotlight on cards
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))

    const spot = (e) => {
      const c = e.target.closest && e.target.closest('.card')
      if (!c) return
      const r = c.getBoundingClientRect()
      c.style.setProperty('--mx', `${e.clientX - r.left}px`)
      c.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    addEventListener('pointermove', spot)
    return () => { io.disconnect(); removeEventListener('pointermove', spot) }
  }, [])
}
