import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import {
  Server,
  Layers,
  Zap,
  Brain,
  Container,
  Network,
  Database,
  Code2,
} from 'lucide-react'

const FOCUS_ITEMS = [
  { icon: <Server size={22} />, label: 'Spring Boot (Java)', desc: 'REST APIs, Segurança, Performance' },
  { icon: <Brain size={22} />, label: 'Inteligência Artificial', desc: 'LangChain, LLMs (Groq, Llama)' },
  { icon: <Database size={22} />, label: 'Bancos de Dados', desc: 'PostgreSQL, Prisma, Supabase' },
  { icon: <Code2 size={22} />, label: 'Desenvolvimento React', desc: 'Vite, React Native, TailwindCSS' },
  { icon: <Network size={22} />, label: 'Memory RAG', desc: 'ChromaDB, Vetores, NLP' },
  { icon: <Layers size={22} />, label: 'Arquitetura de Software', desc: 'Design limpo e escalável' },
  { icon: <Zap size={22} />, label: 'APIs Escaláveis', desc: 'FastAPI, Uvicorn, Sistemas High-perf' },
  { icon: <Container size={22} />, label: 'Sistemas Gamificados', desc: 'Lógica complexa, Economia Virtual' },
]

export default function CurrentFocus() {
  return (
    <section
      id="focus"
      style={{
        padding: '140px 24px',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border glow */}
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
            CURRENT FOCUS
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
            Onde estou me especializando
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '16px',
            marginBottom: '64px',
            maxWidth: '500px',
          }}>
            Tecnologias e conceitos que estou dominando atualmente para construir sistemas de nível profissional.
          </p>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {FOCUS_ITEMS.map((item, i) => (
            <ScrollReveal key={item.label} delay={0.05 * i} direction="up">
              <motion.div
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(111,255,176,0.3)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(111,255,176,0.05)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  padding: '28px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ color: '#6fffb0' }}
                  style={{
                    color: 'rgba(111,255,176,0.6)',
                    marginBottom: '16px',
                    display: 'inline-flex',
                  }}
                >
                  {item.icon}
                </motion.div>

                {/* Label */}
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  marginBottom: '6px',
                  color: 'var(--text)',
                }}>
                  {item.label}
                </div>

                {/* Desc */}
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                  {item.desc}
                </div>

                {/* Bottom line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #6fffb0, #6ee7ff)',
                    transformOrigin: 'left',
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
