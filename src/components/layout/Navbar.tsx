import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Focus', href: '#focus' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(5,5,5,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo('#hero') }}
          style={{ textDecoration: 'none' }}
          whileHover={{ scale: 1.05 }}
        >
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: '20px',
            background: 'linear-gradient(135deg, #6fffb0, #6ee7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>
            OM
          </div>
        </motion.a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hidden-mobile">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo(link.href) }}
              style={{
                color: 'rgba(245,245,245,0.6)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                position: 'relative',
                paddingBottom: '2px',
              }}
              whileHover={{ color: '#f5f5f5' }}
            >
              {link.label}
              <motion.span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'var(--primary)',
                  scaleX: 0,
                  transformOrigin: 'left',
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#contact"
          onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo('#contact') }}
          style={{
            display: 'none',
            padding: '8px 20px',
            borderRadius: '6px',
            background: 'rgba(111,255,176,0.08)',
            border: '1px solid rgba(111,255,176,0.2)',
            color: 'var(--primary)',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
          }}
          whileHover={{
            background: 'rgba(111,255,176,0.15)',
            borderColor: 'rgba(111,255,176,0.4)',
          }}
          className="nav-cta"
        >
          Contact
        </motion.a>

        {/* Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
          }}
          className="hamburger-btn"
        >
          <Menu size={22} />
        </motion.button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.8)',
                zIndex: 1100,
                backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '280px',
                background: '#0a0a0a',
                borderLeft: '1px solid rgba(111,255,176,0.1)',
                zIndex: 1200,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: '20px',
                  background: 'linear-gradient(135deg, #6fffb0, #6ee7ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>OM</div>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo(link.href) }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      color: 'rgba(245,245,245,0.7)',
                      textDecoration: 'none',
                      fontSize: '18px',
                      fontWeight: 600,
                      fontFamily: "'Space Grotesk', sans-serif",
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-cta { display: inline-flex !important; }
        }
      `}</style>
    </>
  )
}
