import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Music, Smartphone, Bot, Brain, Sword, UtensilsCrossed } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

const PROJECTS = [
  {
    id: 1,
    title: 'ORVIS',
    subtitle: 'Operational Reactive Virtual Intelligent System',
    description: 'Ecossistema de IA de elite projetado como parceiro operacional. Integra NLP avançado (LangChain, Groq), memória persistente de longo prazo (ChromaDB) e interface HUD futurista.',
    tech: ['Python', 'LangChain', 'FastAPI', 'React'],
    icon: <Bot size={28} />,
    accent: '#a855f7',
    gradient: 'linear-gradient(135deg, #120a1a 0%, #1a0f2a 100%)',
    year: '2026',
    route: null,
  },
  {
    id: 2,
    title: 'EducGames',
    subtitle: 'Plataforma Gamificada · com Pedro',
    description: 'Ecossistema educacional completo com mecânicas de gamificação. 20+ telas, painel por perfil, loja de cosméticos e sistema de conquistas.',
    tech: ['React', 'Node.js', 'Prisma', 'SQLite'],
    icon: <Sword size={28} />,
    accent: '#6ee7ff',
    gradient: 'linear-gradient(135deg, #0a1520 0%, #0f2030 100%)',
    year: '2026',
    route: '/educgames',
  },
  {
    id: 3,
    title: 'Indi AI (TCC)',
    subtitle: 'O Retorno da IA Assistente',
    description: 'Projeto escolhido como Trabalho de Conclusão de Curso (TCC). Uma reformulação completa de um projeto antigo, agora impulsionado com tecnologias modernas de IA e arquitetura robusta.',
    tech: ['Python', 'IA', 'Automação'],
    icon: <Brain size={28} />,
    accent: '#6fffb0',
    gradient: 'linear-gradient(135deg, #0a1a10 0%, #0f2a1a 100%)',
    year: '2026',
    route: null,
  },
  {
    id: 4,
    title: 'VibeWave',
    subtitle: 'Plataforma de Música Online',
    description: 'Plataforma de streaming de músicas com player próprio e experiência visual imersiva.',
    tech: ['Python', 'Django', 'JavaScript'],
    icon: <Music size={28} />,
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #2a1a00 100%)',
    year: '2023',
    route: null,
  },
  {
    id: 5,
    title: 'DeMolay App',
    subtitle: 'App Mobile para Capítulo',
    description: 'Aplicativo completo para gestão interna e organização de membros do capítulo DeMolay.',
    tech: ['Java', 'Android', 'SQLite'],
    icon: <Smartphone size={28} />,
    accent: '#ef4444',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2a0f0f 100%)',
    year: '2022',
    route: null,
  },
  {
    id: 6,
    title: 'Cardápio Digital',
    subtitle: 'Sistema para Restaurantes',
    description: 'Sistema de cardápio digital com painel administrativo e interface responsiva fluida.',
    tech: ['JavaScript', 'Python', 'HTML/CSS'],
    icon: <UtensilsCrossed size={28} />,
    accent: '#10b981',
    gradient: 'linear-gradient(135deg, #0a1a12 0%, #0f2a1c 100%)',
    year: '2024',
    route: null,
  },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    if (project.route) navigate(project.route)
  }

  return (
    <ScrollReveal delay={index * 0.08} direction="up">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -8 }}
        onClick={handleClick}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          borderRadius: '16px',
          border: `1px solid ${hovered ? project.accent + '30' : 'rgba(255,255,255,0.06)'}`,
          background: project.gradient,
          overflow: 'hidden',
          cursor: project.route ? 'pointer' : 'default',
          position: 'relative',
          height: '340px',
          boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accent}10` : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'border-color 0.4s, box-shadow 0.4s',
        }}
      >
        {/* View project badge for linked cards */}
        {project.route && hovered && (
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: `${project.accent}20`,
            border: `1px solid ${project.accent}40`,
            color: project.accent,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '4px 10px',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            VER PROJETO →
          </div>
        )}
        {/* Top section */}
        <div style={{ padding: '32px 32px 0' }}>
          <motion.div
            animate={{ color: hovered ? project.accent : `${project.accent}80` }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '20px' }}
          >
            {project.icon}
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: '24px',
                letterSpacing: '-0.02em',
                marginBottom: '4px',
                color: 'var(--text)',
              }}>
                {project.title}
              </h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                {project.subtitle}
              </div>
            </div>
            <motion.div
              animate={{
                opacity: hovered ? 1 : 0,
                rotate: hovered ? 0 : -45,
                scale: hovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
              style={{ color: project.accent }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
        </div>

        {/* Description overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: '20px 32px',
                marginTop: '16px',
              }}
            >
              <p style={{
                color: 'rgba(245,245,245,0.7)',
                fontSize: '14px',
                lineHeight: 1.7,
              }}>
                {project.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech tags */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '32px',
          right: '32px',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: `${project.accent}12`,
                  border: `1px solid ${project.accent}25`,
                  color: project.accent,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{project.year}</span>
        </div>

        {/* Corner glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle at top right, ${project.accent}08, transparent 70%)`,
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.4s',
        }} />
      </motion.div>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: '140px 24px',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(111,255,176,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            PROJETOS
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '16px' }}>
          <ScrollReveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}>
              O que construí
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} direction="left">
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '360px', textAlign: 'right' }}>
              Projetos reais que resolverem problemas reais — do zero.
            </p>
          </ScrollReveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
