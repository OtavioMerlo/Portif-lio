import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ScrollReveal from '../ui/ScrollReveal'

const TECHS_ROW1 = [
  { name: 'Java', color: '#f89820' },
  { name: 'Spring Boot', color: '#6db33f' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Django', color: '#092e20' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
]

const TECHS_ROW2 = [
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Git', color: '#f05032' },
  { name: 'APIs REST', color: '#6fffb0' },
  { name: 'IA Aplicada', color: '#a855f7' },
  { name: 'C#', color: '#68217a' },
  { name: 'TailwindCSS', color: '#38bdf8' },
  { name: 'SQL', color: '#f29111' },
]

function TechBadge({ name, color }: { name: string; color: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 24px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        whiteSpace: 'nowrap',
        margin: '0 8px',
        transition: 'all 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = `${color}40`
        el.style.background = `${color}08`
        el.style.boxShadow = `0 0 20px ${color}15`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(255,255,255,0.06)'
        el.style.background = 'rgba(255,255,255,0.03)'
        el.style.boxShadow = 'none'
      }}
    >
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
        boxShadow: `0 0 8px ${color}80`,
      }} />
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: '14px',
        color: 'rgba(245,245,245,0.85)',
      }}>
        {name}
      </span>
    </div>
  )
}

function InfiniteRow({ techs, direction = 1 }: { techs: typeof TECHS_ROW1; direction?: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Duplicate items for seamless loop
    const totalWidth = track.scrollWidth / 2

    animRef.current = gsap.to(track, {
      x: direction > 0 ? -totalWidth : totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          if (direction > 0) {
            return ((parseFloat(x as any) % totalWidth) - totalWidth) % -totalWidth
          } else {
            return ((parseFloat(x as any) % totalWidth) + totalWidth) % totalWidth
          }
        }),
      },
    })

    const el = track.parentElement
    if (el) {
      el.addEventListener('mouseenter', () => animRef.current?.pause())
      el.addEventListener('mouseleave', () => animRef.current?.play())
    }

    return () => {
      animRef.current?.kill()
    }
  }, [direction])

  const doubled = [...techs, ...techs, ...techs]

  return (
    <div style={{ overflow: 'hidden', width: '100%', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div ref={trackRef} style={{ display: 'inline-flex', willChange: 'transform' }}>
        {doubled.map((tech, i) => (
          <TechBadge key={`${tech.name}-${i}`} name={tech.name} color={tech.color} />
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section
      id="stack"
      style={{
        padding: '140px 0',
        background: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', marginBottom: '64px' }}>
        <ScrollReveal>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
            color: 'var(--primary)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.12em',
          }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--primary)' }} />
            TECH STACK
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}>
            Tecnologias que domino
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '16px',
            maxWidth: '500px',
          }}>
            Um arsenal completo para construir do backend ao frontend, de sistemas tradicionais a soluções com IA.
          </p>
        </ScrollReveal>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <InfiniteRow techs={TECHS_ROW1} direction={1} />
        <InfiniteRow techs={TECHS_ROW2} direction={-1} />
      </div>
    </section>
  )
}
