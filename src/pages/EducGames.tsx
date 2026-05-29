import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Sword, Users, GraduationCap, Shield, Zap, Star, Trophy, BookOpen, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// ──────────────────────────────────────────────────────────
// Image imports
// ──────────────────────────────────────────────────────────
import landingpage from '../assets/EducGames/landingpage.png'
import login from '../assets/EducGames/login.png'

import dashboard from '../assets/EducGames/dashboard.png'
import atividades from '../assets/EducGames/atividades.png'
import conquistas from '../assets/EducGames/conquistas.png'
import inventario from '../assets/EducGames/inventario.png'
import loja from '../assets/EducGames/loja.png'
import loja24 from '../assets/EducGames/loja24.png'
import ranking from '../assets/EducGames/ranking.png'
import historico from '../assets/EducGames/historico.png'
import jogadores from '../assets/EducGames/jogadores.png'

import professoDashboard from '../assets/EducGames/professo-dashboard.png'
import professorCriaAtividade from '../assets/EducGames/professor-cria-atvidade.png'
import professorMinhasAtividades from '../assets/EducGames/professor-minhas-atividades.png'
import professorCorrecao from '../assets/EducGames/professor-correcao.png'
import professorCorrecao2 from '../assets/EducGames/professor-correção.png'

import adminGeral from '../assets/EducGames/admin-geral.png'
import adminUsuarios from '../assets/EducGames/admin-usuarios.png'
import adminLoja from '../assets/EducGames/admin-loja.png'
import adminLogs from '../assets/EducGames/admin-logs.png'

// ──────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview', label: 'Visão Geral', icon: <Zap size={14} /> },
  { id: 'student', label: 'Aluno', icon: <Star size={14} /> },
  { id: 'teacher', label: 'Professor', icon: <GraduationCap size={14} /> },
  { id: 'admin', label: 'Admin', icon: <Shield size={14} /> },
]

type ScreenshotItem = { src: string; label: string; desc: string }

const SCREENS: Record<string, ScreenshotItem[]> = {
  overview: [
    { src: landingpage, label: 'Landing Page', desc: 'Página de entrada do sistema com visual moderno e chamadas de ação.' },
    { src: login, label: 'Login', desc: 'Tela de autenticação com design limpo e seguro.' },
    { src: dashboard, label: 'Dashboard do Aluno', desc: 'Painel principal com progresso, missões e estatísticas em tempo real.' },
    { src: professoDashboard, label: 'Dashboard do Professor', desc: 'Visão geral das turmas, atividades e desempenho dos alunos.' },
    { src: adminGeral, label: 'Painel Admin', desc: 'Centro de controle completo da plataforma.' },
    { src: ranking, label: 'Ranking', desc: 'Sistema de classificação gamificado para engajar a competição saudável.' },
  ],
  student: [
    { src: dashboard, label: 'Dashboard', desc: 'Painel principal com XP, nível, missões ativas e progresso geral.' },
    { src: atividades, label: 'Atividades', desc: 'Lista de atividades disponíveis com filtros e status de conclusão.' },
    { src: conquistas, label: 'Conquistas', desc: 'Sistema de badges e troféus por desempenho e marcos alcançados.' },
    { src: inventario, label: 'Inventário', desc: 'Gerenciamento de cosméticos e itens adquiridos na loja.' },
    { src: loja, label: 'Loja', desc: 'Loja de cosméticos para personalização de avatar com moedas in-game.' },
    { src: loja24, label: 'Loja (v2)', desc: 'Versão atualizada da loja com novas categorias de itens.' },
    { src: ranking, label: 'Ranking', desc: 'Classificação geral dos alunos por XP e desempenho.' },
    { src: historico, label: 'Histórico', desc: 'Registro detalhado de todas as atividades e pontuações anteriores.' },
    { src: jogadores, label: 'Jogadores', desc: 'Visualização dos outros alunos e seus perfis públicos.' },
  ],
  teacher: [
    { src: professoDashboard, label: 'Dashboard', desc: 'Visão consolidada das turmas, atividades e métricas de desempenho.' },
    { src: professorCriaAtividade, label: 'Criar Atividade', desc: 'Interface para criação de atividades com questões, recompensas e prazos.' },
    { src: professorMinhasAtividades, label: 'Minhas Atividades', desc: 'Gestão completa das atividades criadas com status e estatísticas.' },
    { src: professorCorrecao, label: 'Correção', desc: 'Ferramenta de correção manual das respostas dos alunos.' },
    { src: professorCorrecao2, label: 'Correção Detalhada', desc: 'Visualização detalhada das respostas com campo de feedback individual.' },
  ],
  admin: [
    { src: adminGeral, label: 'Painel Geral', desc: 'Visão executiva de toda a plataforma com métricas globais.' },
    { src: adminUsuarios, label: 'Usuários', desc: 'Gerenciamento de todos os usuários com filtros e controle de acesso.' },
    { src: adminLoja, label: 'Loja (Admin)', desc: 'Gestão dos itens da loja, preços e disponibilidade.' },
    { src: adminLogs, label: 'Logs', desc: 'Auditoria completa de todas as ações realizadas na plataforma.' },
  ],
}

const TECH = ['React', 'Node.js', 'Prisma', 'SQLite', 'TypeScript', 'JWT', 'REST API', 'Gamification']

const STATS = [
  { value: '3', label: 'Perfis de Usuário', icon: <Users size={18} /> },
  { value: '20+', label: 'Telas Desenvolvidas', icon: <BookOpen size={18} /> },
  { value: '100%', label: 'Full Stack', icon: <Zap size={18} /> },
  { value: '2026', label: 'Ano do Projeto', icon: <Trophy size={18} /> },
]

// ──────────────────────────────────────────────────────────
// Lightbox
// ──────────────────────────────────────────────────────────
function Lightbox({
  screens,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  screens: ScreenshotItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = screens[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9100,
        }}
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        style={{
          position: 'fixed',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(111,255,176,0.08)',
          border: '1px solid rgba(111,255,176,0.2)',
          color: '#6fffb0',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9100,
        }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        style={{
          position: 'fixed',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(111,255,176,0.08)',
          border: '1px solid rgba(111,255,176,0.2)',
          color: '#6fffb0',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9100,
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Image container */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <img
          src={item.src}
          alt={item.label}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            borderRadius: '12px',
            border: '1px solid rgba(111,255,176,0.15)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(111,255,176,0.05)',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '18px',
            color: '#f5f5f5',
            marginBottom: '6px',
          }}>
            {item.label}
          </div>
          <div style={{ color: 'rgba(245,245,245,0.5)', fontSize: '13px', maxWidth: '500px' }}>
            {item.desc}
          </div>
          <div style={{ color: 'rgba(111,255,176,0.4)', fontSize: '12px', marginTop: '10px' }}>
            {index + 1} / {screens.length}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────
// Screenshot card
// ──────────────────────────────────────────────────────────
function ScreenCard({
  item,
  index,
  onClick,
}: {
  item: ScreenshotItem
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6 }}
      style={{
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#0c0c0c',
        border: `1px solid ${hovered ? 'rgba(111,255,176,0.25)' : 'rgba(255,255,255,0.05)'}`,
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(111,255,176,0.06)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        position: 'relative',
      }}
    >
      {/* Screenshot */}
      <div style={{ overflow: 'hidden', aspectRatio: '16/9', background: '#050505' }}>
        <motion.img
          src={item.src}
          alt={item.label}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
          }}
        />
      </div>

      {/* Overlay on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '16px',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#6fffb0',
              fontSize: '12px',
              fontWeight: 600,
            }}>
              <ExternalLink size={13} />
              Ver em tela cheia
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Label */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '13px',
          color: '#f5f5f5',
          marginBottom: '4px',
        }}>
          {item.label}
        </div>
        <div style={{
          fontSize: '11px',
          color: 'rgba(245,245,245,0.4)',
          lineHeight: 1.5,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {item.desc}
        </div>
      </div>

      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle at top right, rgba(111,255,176,0.06), transparent 70%)',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />
    </motion.div>
  )
}

// ──────────────────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────────────────
export default function EducGames() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const screens = SCREENS[activeTab] ?? []

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + screens.length) % screens.length : 0))
  const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % screens.length : 0))

  // Block body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#f5f5f5' }}>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            screens={screens}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>

      {/* ── Floating grid background ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(111,255,176,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(111,255,176,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── Top glow orb ── */}
      <div style={{
        position: 'fixed',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(110,231,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Back button ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ padding: '24px 32px' }}
        >
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ x: -4 }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(245,245,245,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              padding: '8px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6fffb0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,245,0.5)')}
          >
            <ArrowLeft size={16} />
            Voltar ao portfólio
          </motion.button>
        </motion.div>

        {/* ── Hero ── */}
        <section style={{ padding: '40px 32px 80px', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ maxWidth: '860px' }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '100px',
                background: 'rgba(110,231,255,0.06)',
                border: '1px solid rgba(110,231,255,0.2)',
                color: '#6ee7ff',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                marginBottom: '28px',
              }}
            >
              <Sword size={12} />
              PROJETO COLABORATIVO · 2026
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(36px, 7vw, 80px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                marginBottom: '24px',
              }}
            >
              Educ
              <span style={{
                background: 'linear-gradient(135deg, #6ee7ff, #6fffb0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Games
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
              style={{
                fontSize: 'clamp(15px, 2vw, 19px)',
                color: 'rgba(245,245,245,0.55)',
                lineHeight: 1.7,
                maxWidth: '640px',
                marginBottom: '40px',
              }}
            >
              Plataforma educacional gamificada completa com mecânicas de RPG, loja de cosméticos, 
              sistema de conquistas, ranking e painéis especializados para alunos, professores e administradores.
            </motion.p>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
            >
              {TECH.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '5px',
                    background: 'rgba(110,231,255,0.05)',
                    border: '1px solid rgba(110,231,255,0.15)',
                    color: '#6ee7ff',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            background: 'rgba(255,255,255,0.015)',
          }}
        >
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
          }}>
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 24px',
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ color: 'rgba(111,255,176,0.5)', marginBottom: '4px' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: '28px',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #f5f5f5, rgba(245,245,245,0.6))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.value}
                </div>
                <div style={{ color: 'rgba(245,245,245,0.4)', fontSize: '12px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 640px) {
              .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
        </motion.section>

        {/* ── Gallery ── */}
        <section style={{ padding: '80px 32px 120px', maxWidth: '1280px', margin: '0 auto' }}>

          {/* Tab nav */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              display: 'flex',
              gap: '4px',
              marginBottom: '48px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '10px',
              padding: '4px',
              width: 'fit-content',
              flexWrap: 'wrap',
            }}
          >
            {TABS.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.25s',
                  background: activeTab === tab.id
                    ? 'rgba(110,231,255,0.1)'
                    : 'transparent',
                  color: activeTab === tab.id
                    ? '#6ee7ff'
                    : 'rgba(245,245,245,0.45)',
                  boxShadow: activeTab === tab.id
                    ? '0 0 0 1px rgba(110,231,255,0.2) inset'
                    : 'none',
                  position: 'relative',
                }}
              >
                {tab.icon}
                {tab.label}
                {/* Count badge */}
                <span style={{
                  padding: '1px 6px',
                  borderRadius: '100px',
                  background: activeTab === tab.id ? 'rgba(110,231,255,0.15)' : 'rgba(255,255,255,0.05)',
                  fontSize: '10px',
                  color: activeTab === tab.id ? '#6ee7ff' : 'rgba(245,245,245,0.3)',
                }}>
                  {SCREENS[tab.id]?.length}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Tab heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: '36px' }}
            >
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(20px, 3vw, 28px)',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}>
                {activeTab === 'overview' && 'Visão Geral da Plataforma'}
                {activeTab === 'student' && 'Área do Aluno'}
                {activeTab === 'teacher' && 'Área do Professor'}
                {activeTab === 'admin' && 'Painel Administrativo'}
              </h2>
              <p style={{ color: 'rgba(245,245,245,0.4)', fontSize: '14px' }}>
                {activeTab === 'overview' && 'Um panorama das principais telas do sistema, do acesso inicial ao painel de controle.'}
                {activeTab === 'student' && 'Experiência gamificada completa: XP, conquistas, inventário, loja, ranking e histórico de atividades.'}
                {activeTab === 'teacher' && 'Ferramentas para criação de atividades, acompanhamento de turmas e correção de respostas.'}
                {activeTab === 'admin' && 'Centro de controle da plataforma com gestão de usuários, loja e logs de auditoria.'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {screens.map((item, i) => (
                <ScreenCard
                  key={`${activeTab}-${i}`}
                  item={item}
                  index={i}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

        </section>

        {/* ── Features highlight ── */}
        <section style={{
          padding: '80px 32px',
          background: 'rgba(255,255,255,0.015)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '56px', textAlign: 'center' }}
            >
              <div style={{
                color: '#6fffb0',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                marginBottom: '12px',
              }}>
                FUNCIONALIDADES
              </div>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(24px, 4vw, 40px)',
                letterSpacing: '-0.02em',
              }}>
                Tudo em um só sistema
              </h2>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}>
              {[
                { icon: '🎮', title: 'Sistema de XP & Níveis', desc: 'Alunos ganham experiência ao completar atividades, subindo de nível e desbloqueando recompensas.' },
                { icon: '🏆', title: 'Conquistas & Badges', desc: 'Sistema de troféus automáticos por marcos de desempenho, frequência e participação.' },
                { icon: '🛍️', title: 'Loja de Cosméticos', desc: 'Moeda in-game (Doze Coins) para comprar skins, avatares e itens personalizados.' },
                { icon: '📊', title: 'Dashboard Inteligente', desc: 'Painéis distintos e completos para cada tipo de usuário com métricas em tempo real.' },
                { icon: '📝', title: 'Criação de Atividades', desc: 'Professores criam questões com prazos, recompensas e configuração de XP.' },
                { icon: '🔐', title: 'Multi-Tenant & Auth', desc: 'Autenticação JWT com controle de acesso por perfil: Aluno, Professor e Admin.' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  style={{
                    padding: '28px',
                    borderRadius: '12px',
                    background: '#0c0c0c',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '15px',
                    marginBottom: '8px',
                    color: '#f5f5f5',
                  }}>
                    {f.title}
                  </div>
                  <div style={{ color: 'rgba(245,245,245,0.4)', fontSize: '13px', lineHeight: 1.6 }}>
                    {f.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section style={{ padding: '100px 32px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ color: 'rgba(245,245,245,0.3)', fontSize: '13px', marginBottom: '24px' }}>
              Gostou do projeto?
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(24px, 4vw, 44px)',
              letterSpacing: '-0.02em',
              marginBottom: '40px',
            }}>
              Veja mais no portfólio
            </h2>
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(111,255,176,0.25)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '14px 36px',
                borderRadius: '8px',
                background: 'var(--primary, #6fffb0)',
                border: 'none',
                color: '#050505',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'box-shadow 0.3s',
              }}
            >
              <ArrowLeft size={16} />
              Voltar ao Portfólio
            </motion.button>
          </motion.div>
        </section>

      </div>
    </div>
  )
}
