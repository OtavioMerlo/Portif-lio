import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ChevronRight } from 'lucide-react'
import ParticleCanvas from '../ui/ParticleCanvas'
import TerminalAnimation from '../ui/TerminalAnimation'
import GlowButton from '../ui/GlowButton'

const NAME = 'Otávio Merlo'

export default function Hero() {
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered letter animation via JS
    const el = nameRef.current
    if (!el) return
    const letters = NAME.split('')
    el.innerHTML = letters
      .map((l, i) =>
        `<span class="hero-letter" style="display:inline-block;opacity:0;transform:translateY(40px) blur(8px);transition:all 0.7s cubic-bezier(0.25,0.1,0.25,1) ${i * 0.04}s">${l === ' ' ? '&nbsp;' : l}</span>`
      )
      .join('')
    requestAnimationFrame(() => {
      setTimeout(() => {
        const spans = el.querySelectorAll('.hero-letter')
        spans.forEach((s) => {
          ;(s as HTMLElement).style.opacity = '1'
          ;(s as HTMLElement).style.transform = 'translateY(0) blur(0)'
        })
      }, 400)
    })
  }, [])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
        background: '#050505',
        paddingTop: '64px',
      }}
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(111,255,176,0.04) 0%, transparent 70%)',
        top: '10%',
        right: '10%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(110,231,255,0.03) 0%, transparent 70%)',
        bottom: '20%',
        left: '5%',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
      }}>

        {/* Terminal - top left */}
        <div style={{ marginBottom: '64px' }}>
          <TerminalAnimation />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '100px',
            background: 'rgba(111,255,176,0.06)',
            border: '1px solid rgba(111,255,176,0.15)',
            color: 'var(--primary)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            marginBottom: '24px',
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--primary)',
            animation: 'glow-pulse 2s infinite',
          }} />
          AVAILABLE FOR OPPORTUNITIES
        </motion.div>

        {/* Name */}
        <div
          ref={nameRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(52px, 8vw, 96px)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '24px',
            background: 'linear-gradient(180deg, #f5f5f5 0%, rgba(245,245,245,0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {NAME}
        </div>

        {/* Main text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(22px, 4vw, 42px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            maxWidth: '700px',
            background: 'linear-gradient(135deg, #6fffb0 0%, #6ee7ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Building intelligent digital systems.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '48px',
          }}
        >
          Estudante de Desenvolvimento de Sistemas focado em Spring Boot, arquiteturas escaláveis e Inteligência Artificial.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <GlowButton variant="primary" onClick={scrollToProjects}>
            View Projects
            <ChevronRight size={16} />
          </GlowButton>
          <GlowButton variant="outline" onClick={scrollToContact}>
            Contact Me
          </GlowButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        onClick={scrollToAbout}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          letterSpacing: '0.1em',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <span>SCROLL</span>
        <ArrowDown size={14} />
      </motion.button>
    </section>
  )
}
