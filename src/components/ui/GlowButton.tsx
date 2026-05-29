import { useRef } from 'react'
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'

interface GlowButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  onClick?: () => void
  href?: string
  className?: string
}

export default function GlowButton({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
}: GlowButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const handleMouseMove = (e: ReactMouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ;(btn as HTMLElement).style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`
  }

  const handleMouseLeave = () => {
    const btn = btnRef.current
    if (!btn) return
    ;(btn as HTMLElement).style.transform = 'translate(0, 0)'
    ;(btn as HTMLElement).style.transition = 'transform 0.4s cubic-bezier(0.25,0.1,0.25,1)'
  }

  const handleMouseEnter = () => {
    const btn = btnRef.current
    if (!btn) return
    ;(btn as HTMLElement).style.transition = 'transform 0.1s'
  }

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '0.02em',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.25,0.1,0.25,1)',
    position: 'relative',
    overflow: 'hidden',
  }

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'var(--primary)',
    color: '#050505',
    border: 'none',
    boxShadow: '0 0 20px rgba(111, 255, 176, 0.2)',
  }

  const outlineStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid rgba(255,255,255,0.15)',
  }

  const props = {
    ref: btnRef as any,
    style: variant === 'primary' ? primaryStyle : outlineStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    className,
  }

  const content = (
    <motion.span
      whileHover={variant === 'primary'
        ? { boxShadow: '0 0 40px rgba(111,255,176,0.5)', scale: 1.02 }
        : { borderColor: 'rgba(255,255,255,0.35)', scale: 1.02 }
      }
      whileTap={{ scale: 0.97 }}
      style={{ display: 'contents' }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <a {...props} href={href}>
        {content}
      </a>
    )
  }

  return (
    <button {...props} onClick={onClick}>
      {content}
    </button>
  )
}
