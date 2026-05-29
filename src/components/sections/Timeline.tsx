import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const TIMELINE = [
  {
    year: '2018',
    title: 'Início com Python',
    desc: 'Primeiros passos no mundo da programação. Automações simples, scripts e descoberta da lógica de computação.',
    side: 'left',
  },
  {
    year: '2019',
    title: 'Front-End Moderno',
    desc: 'Mergulho em HTML, CSS e JavaScript. Criação dos primeiros sites e interfaces interativas.',
    side: 'right',
  },
  {
    year: '2020',
    title: 'Back-End e Banco de Dados',
    desc: 'Estruturas de dados, SQL, PostgreSQL e desenvolvimento de APIs. Entendimento profundo do ecossistema backend.',
    side: 'left',
  },
  {
    year: '2021',
    title: 'Automação e IA',
    desc: 'Integração de inteligência artificial em projetos pessoais. Primeiros bots e automações avançadas.',
    side: 'right',
  },
  {
    year: '2022',
    title: 'Lua e FiveM',
    desc: 'Desenvolvimento de scripts para servidores FiveM. Programação em Lua, lógica de gameplay e sistemas multiplayer.',
    side: 'left',
  },
  {
    year: '2023',
    title: 'Assistentes Virtuais',
    desc: 'Criação da Indi, assistente de IA própria. Integração com APIs externas, NLP e automação avançada.',
    side: 'right',
  },
  {
    year: '2024',
    title: 'Entrada na ETEC',
    desc: 'Início do curso técnico em Desenvolvimento de Sistemas. Aprofundamento formal em lógica, banco de dados e boas práticas de engenharia.',
    side: 'left',
  },
  {
    year: '2025',
    title: 'EducaGames & Fullstack',
    desc: 'Criação do EducaGames, uma plataforma de educação gamificada e gestão escolar completa com React, Node.js e Prisma.',
    side: 'right',
  },
  {
    year: '2026',
    title: 'Ano de Formatura: ORVIS e Indi',
    desc: 'Conclusão do curso. Desenvolvimento do ecossistema de IA ORVIS com LangChain e Spring Boot APIs. O antigo projeto Indi é retomado como TCC oficial.',
    side: 'left',
  },
]

function TimelineEntry({
  entry,
  index,
}: {
  entry: typeof TIMELINE[0]
  index: number
}) {
  const isLeft = entry.side === 'left'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 40px 1fr',
      gap: '0',
      marginBottom: '60px',
      alignItems: 'start',
    }}>
      {/* Left content */}
      <div style={{ paddingRight: '40px', textAlign: 'right' }}>
        {isLeft ? (
          <ScrollReveal delay={index * 0.08} direction="right">
            <EntryContent entry={entry} />
          </ScrollReveal>
        ) : null}
      </div>

      {/* Center dot + year */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: index * 0.08, duration: 0.4, type: 'spring' }}
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'var(--primary)',
            border: '3px solid var(--bg)',
            boxShadow: '0 0 0 2px rgba(111,255,176,0.3), 0 0 20px rgba(111,255,176,0.2)',
            zIndex: 1,
            flexShrink: 0,
            marginTop: '6px',
          }}
        />
      </div>

      {/* Right content */}
      <div style={{ paddingLeft: '40px' }}>
        {!isLeft ? (
          <ScrollReveal delay={index * 0.08} direction="left">
            <EntryContent entry={entry} />
          </ScrollReveal>
        ) : null}
      </div>
    </div>
  )
}

function EntryContent({ entry }: { entry: typeof TIMELINE[0] }) {
  return (
    <div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        color: 'var(--primary)',
        marginBottom: '8px',
        letterSpacing: '0.08em',
      }}>
        {entry.year}
      </div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: '18px',
        marginBottom: '8px',
        color: 'var(--text)',
      }}>
        {entry.title}
      </h3>
      <p style={{
        color: 'rgba(245,245,245,0.55)',
        fontSize: '14px',
        lineHeight: 1.7,
        maxWidth: '360px',
      }}>
        {entry.desc}
      </p>
    </div>
  )
}

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const yearOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.04, 0.04, 0])
  const yearY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        padding: '140px 24px',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Big year watermark */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '30vw',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          color: 'white',
          opacity: yearOpacity,
          y: yearY,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        2026
      </motion.div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
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
            TRAJETÓRIA
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '80px',
          }}>
            7 anos de evolução
          </h2>
        </ScrollReveal>

        {/* Timeline container */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(180deg, transparent, rgba(111,255,176,0.4) 10%, rgba(111,255,176,0.4) 90%, transparent)',
              transformOrigin: 'top',
              transform: 'translateX(-50%)',
            }}
          />

          {TIMELINE.map((entry, i) => (
            <TimelineEntry key={entry.year} entry={entry} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile timeline */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-grid {
            grid-template-columns: 20px 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
