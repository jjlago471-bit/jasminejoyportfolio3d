import { useEffect, useRef } from 'react'

// Mint + violet light: breathes as an orb, blows open into a spiral galaxy,
// then gathers into a thinking brain. Reacts to the cursor.
const HOLD = 5, MORPH = 2.4, STAGE = HOLD + MORPH

const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x))

function buildShapes(N) {
  const orb = [], galaxy = [], brain = []
  const g = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < N; i++) {
    // orb (fibonacci sphere)
    const yy = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - yy * yy), th = g * i
    orb.push([Math.cos(th) * rr * 1.25, yy * 1.25, Math.sin(th) * rr * 1.25])

    // spiral galaxy, three arms
    const rnd = Math.random(), r = 0.08 + Math.pow(rnd, 0.75) * 2.3
    const arm = (i % 3) * (Math.PI * 2 / 3)
    const a = arm + r * 2.3 + (Math.random() - 0.5) * (0.25 + 0.5 / (r + 0.4))
    galaxy.push([Math.cos(a) * r * 0.85, (Math.random() - 0.5) * 0.28 / (r + 0.35), Math.sin(a) * r * 0.85])

    // brain: two folded hemispheres with a gap between them
    const side = i % 2 ? 1 : -1
    const u = Math.random() * 2 - 1, ph = Math.random() * 6.2832, s = Math.sqrt(1 - u * u)
    const dx = Math.cos(ph) * s, dy = u, dz = Math.sin(ph) * s
    const fold = 1 + 0.09 * Math.sin(9 * dz + 4 * dy) * Math.cos(7 * dy - 3 * dx) + 0.04 * Math.sin(15 * dx * dz)
    let by = dy * 0.82 * fold
    if (by < -0.45) by = -0.45 + (by + 0.45) * 0.35
    brain.push([side * 0.1 + dx * 0.72 * fold + side * 0.62, by, dz * 1.2 * fold])
  }
  return [orb, galaxy, brain]
}

export default function Blob() {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const x = c.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = innerWidth < 700 ? 1300 : 2800
    const shapes = buildShapes(N)
    const delay = Float32Array.from({ length: N }, () => Math.random())
    const mix = Float32Array.from({ length: N }, () => Math.random())
    let W, H, d, raf
    let mx = 0, my = 0, tx = 0, ty = 0, px = -999, py = -999

    const size = () => {
      const r = c.getBoundingClientRect()
      d = Math.min(devicePixelRatio || 1, 2)
      W = r.width; H = r.height
      c.width = W * d; c.height = H * d
    }
    const move = (e) => {
      const r = c.getBoundingClientRect()
      px = e.clientX - r.left; py = e.clientY - r.top
      tx = px / W - 0.5; ty = py / H - 0.5
    }
    const leave = () => { px = py = -999; tx = ty = 0 }

    size()
    addEventListener('resize', size)
    addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)

    const frame = (now) => {
      const t = now / 1000
      const stage = Math.floor(t / STAGE) % 3, local = t % STAGE
      const A = shapes[stage], B = shapes[(stage + 1) % 3]
      const m = Math.max(0, (local - HOLD) / MORPH)
      const breathe = stage === 0 && m === 0 ? 1 + 0.06 * Math.sin(t * 2.2) : 1
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05

      x.setTransform(d, 0, 0, d, 0, 0)
      x.globalCompositeOperation = 'source-over'
      x.clearRect(0, 0, W, H)
      x.globalCompositeOperation = 'lighter'

      const sc = Math.min(W, H * 1.3) * (W < 760 ? 0.27 : 0.31)
      const cx = W < 760 ? W * 0.5 : W * 0.66
      const cy = H * (W < 760 ? 0.34 : 0.42)
      const ay = t * 0.18 + mx * 1.8, ax = 0.35 + my * 0.9
      const ca = Math.cos(ax), sa = Math.sin(ax), cb = Math.cos(ay), sb = Math.sin(ay)

      for (let i = 0; i < N; i++) {
        const e = ease(m * 1.5 - delay[i] * 0.5)
        const a = A[i], b = B[i]
        const burst = 1 + Math.sin(Math.PI * e) * 0.35 // blows open mid-morph
        const X = (a[0] + (b[0] - a[0]) * e) * burst * breathe
        const Y = (a[1] + (b[1] - a[1]) * e) * burst * breathe
        const Z = (a[2] + (b[2] - a[2]) * e) * burst * breathe
        const y1 = Y * ca - Z * sa, z1 = Y * sa + Z * ca
        const x2 = X * cb + z1 * sb, z2 = -X * sb + z1 * cb
        const f = 5 / (5 + z2)
        let sx = cx + x2 * sc * f, sy = cy + y1 * sc * f
        const dx = sx - px, dy = sy - py, dd = Math.hypot(dx, dy)
        if (dd < 140) {
          const k = (Math.pow(1 - dd / 140, 2) * 38) / (dd || 1)
          sx += dx * k; sy += dy * k
        }
        const hue = 155 + (mix[i] * 0.55 + (y1 / 3 + 0.5) * 0.45) * 115
        const al = Math.max(0.1, Math.min(0.9, 0.42 + z2 * 0.2))
        x.fillStyle = `hsla(${hue},85%,68%,${al})`
        const q = 1.7 * f
        x.fillRect(sx, sy, q, q)
      }
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', size)
      removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <canvas ref={ref} className="blob" aria-hidden="true" />
}
