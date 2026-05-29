import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, ArrowUpRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const Github = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
)

const Linkedin = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const SOCIAL = [
  { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/otaviomerlo', handle: '@otaviomerlo' },
  { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ot%C3%A1vio-merlo-carvalho/', handle: 'Otávio Merlo Carvalho' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact — ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:otaviomerlo@email.com?subject=${subject}&body=${body}`
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 16px',
    background: focused === field ? 'rgba(111,255,176,0.04)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${focused === field ? 'rgba(111,255,176,0.3)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '8px',
    color: 'var(--text)',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'all 0.3s',
    resize: 'none' as const,
  })

  return (
    <section
      id="contact"
      style={{
        padding: '140px 24px',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(111,255,176,0.3), transparent)',
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(111,255,176,0.03) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <ScrollReveal>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
              color: 'var(--primary)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
            }}>
              <span style={{ width: '24px', height: '1px', background: 'var(--primary)' }} />
              CONTATO
              <span style={{ width: '24px', height: '1px', background: 'var(--primary)' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
            }}>
              Let's build something{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6fffb0, #6ee7ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                great.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>
              Aberto a projetos freelance, oportunidades e colaborações.
              Me conta sua ideia.
            </p>
          </ScrollReveal>
        </div>

        {/* Content grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}>
          {/* Left — Info */}
          <div>
            <ScrollReveal delay={0.15} direction="right">
              {/* Email */}
              <motion.a
                href="mailto:otaviomerlo@email.com"
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'rgba(111,255,176,0.04)',
                  border: '1px solid rgba(111,255,176,0.12)',
                  textDecoration: 'none',
                  marginBottom: '20px',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e: React.MouseEvent) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(111,255,176,0.08)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(111,255,176,0.25)'
                }}
                onMouseLeave={(e: React.MouseEvent) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(111,255,176,0.04)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(111,255,176,0.12)'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(111,255,176,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Email</div>
                  <div style={{ color: 'var(--primary)', fontSize: '15px', fontWeight: 500 }}>
                    otaviomerlo@email.com
                  </div>
                </div>
                <ArrowUpRight size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
              </motion.a>

              {/* Socials */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SOCIAL.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px 24px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e: React.MouseEvent) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'
                      ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                    }}
                    onMouseLeave={(e: React.MouseEvent) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                      ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <div style={{ color: 'var(--text-subtle)', flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ color: 'var(--text)', fontSize: '14px', fontWeight: 500 }}>{s.label}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{s.handle}</div>
                    </div>
                    <ArrowUpRight size={14} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Form */}
          <ScrollReveal delay={0.2} direction="left">
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('name')}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('email')}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>
                    Mensagem
                  </label>
                  <textarea
                    placeholder="Me conta sobre o projeto..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('message'), minHeight: '140px' }}
                    rows={5}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ boxShadow: '0 0 40px rgba(111,255,176,0.3)', scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    background: 'var(--primary)',
                    color: '#050505',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(111,255,176,0.2)',
                    transition: 'all 0.3s',
                  }}
                >
                  Enviar Mensagem
                  <Send size={16} />
                </motion.button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
