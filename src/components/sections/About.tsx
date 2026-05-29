import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import HolographicSphere from '../ui/HolographicSphere'
import profilePhoto from '../../assets/eu/WhatsApp Image 2026-05-28 at 23.32.03.jpeg'

const HIGHLIGHTS = [
  'Spring Boot',
  'Python',
  'APIs REST',
  'Inteligência Artificial',
  'Docker',
  'PostgreSQL',
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '140px 24px',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section label */}
        <ScrollReveal>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '72px',
            color: 'var(--primary)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.12em',
          }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--primary)' }} />
            SOBRE MIM
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left — Text */}
          <div>
            <ScrollReveal delay={0.1}>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '28px',
                lineHeight: 1.05,
              }}>
                Estudante de Tecnologia
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #6fffb0, #6ee7ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  focado em inovação.
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p style={{
                color: 'rgba(245,245,245,0.65)',
                fontSize: '17px',
                lineHeight: 1.8,
                marginBottom: '36px',
                maxWidth: '540px',
              }}>
                Sou estudante do 3º ano de Desenvolvimento de Sistemas (com formação em 2026). 
                Atualmente, meu maior foco é no desenvolvimento de APIs RESTful utilizando Java com Spring Boot, 
                aprimorando lógica, segurança e desempenho com banco de dados. 
                Em paralelo, estudo Inteligência Artificial integrando Python e LangChain.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {HIGHLIGHTS.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.07 }}
                    whileHover={{
                      borderColor: 'rgba(111,255,176,0.5)',
                      background: 'rgba(111,255,176,0.08)',
                      color: '#6fffb0',
                    }}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '6px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'rgba(245,245,245,0.8)',
                      cursor: 'default',
                      transition: 'all 0.3s',
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Profile visual */}
          <ScrollReveal delay={0.15} direction="left">
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Holographic sphere background */}
              <div style={{ position: 'absolute', inset: '-60px', zIndex: 0 }}>
                <HolographicSphere />
              </div>

              {/* Profile card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '240px',
                  height: '300px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(111,255,176,0.2)',
                  boxShadow: '0 0 40px rgba(111,255,176,0.1), 0 0 80px rgba(111,255,176,0.05)',
                  animation: 'glow-pulse 4s ease-in-out infinite',
                  background: 'linear-gradient(135deg, #0f1a14 0%, #0a1a20 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Real profile photo */}
                <div style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(111,255,176,0.4)',
                  boxShadow: '0 0 24px rgba(111,255,176,0.2), 0 0 48px rgba(111,255,176,0.08)',
                  flexShrink: 0,
                }}>
                  <img
                    src={profilePhoto}
                    alt="Otávio Merlo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#f5f5f5',
                    marginBottom: '4px',
                  }}>Otávio Merlo</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Estudante &amp; Dev</div>
                </div>
                {/* Status badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: 'rgba(111,255,176,0.06)',
                  border: '1px solid rgba(111,255,176,0.15)',
                  fontSize: '11px',
                  color: 'var(--primary)',
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--primary)', animation: 'glow-pulse 2s infinite' }} />
                  Available
                </div>
                {/* Scan line effect */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(111,255,176,0.3), transparent)',
                  animation: 'scan-line 3s linear infinite',
                }} />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
