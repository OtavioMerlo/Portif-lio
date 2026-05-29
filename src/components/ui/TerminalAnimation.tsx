import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  '> Booting intelligent systems...',
  '> Spring Boot initialized.',
  '> AI modules connected.',
  '> APIs online.',
  '> Database synchronized.',
  '> System ready. ✓',
]

export default function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      setDone(true)
      return
    }

    const line = LINES[lineIndex]

    if (charIndex < line.length) {
      intervalRef.current = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      }, 28)
    } else {
      intervalRef.current = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
        setCurrentLine('')
        setCharIndex(0)
        setLineIndex(l => l + 1)
      }, 350)
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [lineIndex, charIndex])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: 'rgba(111, 255, 176, 0.6)',
        background: 'rgba(111, 255, 176, 0.03)',
        border: '1px solid rgba(111, 255, 176, 0.08)',
        borderRadius: '8px',
        padding: '16px 20px',
        minWidth: '320px',
        maxWidth: '380px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ color: 'rgba(111, 255, 176, 0.3)', marginBottom: '8px', fontSize: '10px', letterSpacing: '0.1em' }}>
        SYSTEM TERMINAL v2.5
      </div>
      {visibleLines.map((line, i) => (
        <div key={i} style={{ marginBottom: '4px', opacity: 0.7 }}>{line}</div>
      ))}
      {lineIndex < LINES.length && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span>{currentLine}</span>
          <span style={{ animation: 'blink 1s infinite', color: 'var(--primary)' }}>█</span>
        </div>
      )}
      {done && (
        <div style={{ marginTop: '8px', color: 'rgba(111, 255, 176, 0.4)', fontSize: '10px' }}>
          ● System operational
        </div>
      )}
    </motion.div>
  )
}
