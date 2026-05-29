import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

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

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '48px 24px',
      background: 'var(--bg)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
      }}>
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: '22px',
            background: 'linear-gradient(135deg, #6fffb0, #6ee7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '6px',
          }}>Otávio Merlo</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Backend Engineer · AI & Systems
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { icon: <Github size={18} />, href: 'https://github.com/otaviomerlo', label: 'GitHub' },
            { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/ot%C3%A1vio-merlo-carvalho/', label: 'LinkedIn' },
            { icon: <Mail size={18} />, href: 'mailto:otaviomerlo@email.com', label: 'Email' },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, color: '#6fffb0' }}
              style={{
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s',
              }}
              title={item.label}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>

        <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          © {year} Otávio Merlo. Crafted with precision.
        </div>
      </div>
    </footer>
  )
}
