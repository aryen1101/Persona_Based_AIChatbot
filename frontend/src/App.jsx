import { useState } from 'react'
import { PERSONAS } from './utils/personas'
import { useChat } from './hooks/useChat'
import PersonaSwitcher from './components/PersonaSwitcher'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import { RotateCcw } from 'lucide-react'

const ACTIVE_PERSONA_KEY = 'scaler_active_persona'

// Per-persona accent palette — bleeds into the entire UI
export const ACCENT = {
  anshuman:  {
    primary: '#4ade80', dim: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.2)',
    glow: '0 0 40px rgba(74,222,128,0.06)', tag: '#16a34a',
  },
  abhimanyu: {
    primary: '#818cf8', dim: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.2)',
    glow: '0 0 40px rgba(129,140,248,0.06)', tag: '#4f46e5',
  },
  kshitij:   {
    primary: '#fb923c', dim: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.2)',
    glow: '0 0 40px rgba(251,146,60,0.06)',  tag: '#c2410c',
  },
}

export default function App() {
  const [personaId, setPersonaId] = useState(() =>
    localStorage.getItem(ACTIVE_PERSONA_KEY) || PERSONAS[0].id
  )
  const { messages, isLoading, error, send, clearChat } = useChat(personaId)
  const persona = PERSONAS.find((p) => p.id === personaId)
  const accent  = ACCENT[personaId] || ACCENT.anshuman

  const handleSwitch = (id) => {
  if (id !== personaId) {
    setPersonaId(id)
    localStorage.setItem(ACTIVE_PERSONA_KEY, id)
  }
}

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060606; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }

        .panel { transition: box-shadow 0.5s ease; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0);   opacity: 0.25; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes chipIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
        .msg-enter { animation: fadeUp 0.25s ease both; }
        .chip-btn  { animation: chipIn 0.3s ease both; }
      `}</style>

      <div style={{
        minHeight: '100dvh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '0',
        background: '#060606',
      }}>
        {/* Ambient glow behind panel */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${accent.dim}, transparent 70%)`,
          transition: 'background 0.6s ease',
        }} />

        <div className="panel" style={{
          width: '100%', maxWidth: 680,
          height: '100dvh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          background: 'linear-gradient(160deg, #111 0%, #0b0b0b 100%)',
          border: `1px solid ${accent.border}`,
          boxShadow: `${accent.glow}, 0 40px 100px rgba(0,0,0,0.8)`,
          transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
          position: 'relative',
        }}>

          {/* Header */}
          <header style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: `1px solid #1c1c1c`,
            background: 'rgba(255,255,255,0.015)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <PersonaAvatar persona={persona} size={44} accent={accent} />
              <div>
                <h1 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 17, color: '#f0f0f0',
                  fontWeight: 400, letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}>
                  {persona.name}
                </h1>
                <p style={{
                  fontSize: 10.5, color: accent.primary,
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  fontWeight: 500, marginTop: 3, opacity: 0.7,
                }}>
                  {persona.title}
                </p>
              </div>
            </div>

            <button
              onClick={clearChat}
              title="Clear chat"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 13px', borderRadius: 9,
                fontSize: 11.5, fontWeight: 500,
                color: '#484848', border: '1px solid #1e1e1e',
                background: 'transparent', cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = accent.primary
                e.currentTarget.style.borderColor = accent.border
                e.currentTarget.style.background = accent.dim
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#484848'
                e.currentTarget.style.borderColor = '#1e1e1e'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <RotateCcw size={11} />
              <span>Clear</span>
            </button>
          </header>

          <PersonaSwitcher active={personaId} onSwitch={handleSwitch} accent={accent} />

          <ChatWindow
            messages={messages} isLoading={isLoading}
            persona={persona} error={error}
            onChipClick={send} accent={accent}
          />

          <ChatInput onSend={send} isLoading={isLoading} accent={accent} />
        </div>
      </div>
    </>
  )
}

export function PersonaAvatar({ persona, size = 36, accent }) {
  const [imgFailed, setImgFailed] = useState(false)
  if (!persona) return null

  const initials = persona.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const radius = size <= 24 ? 6 : size <= 36 ? 10 : 13

  if (persona.image && !imgFailed) {
    return (
      <img
        src={persona.image} alt={persona.name}
        onError={() => setImgFailed(true)}
        style={{
          width: size, height: size, flexShrink: 0,
          borderRadius: radius, objectFit: 'cover',
          border: `1.5px solid ${accent?.border || '#2a2a2a'}`,
          boxShadow: `0 0 0 2px ${accent?.dim || 'transparent'}`,
          transition: 'box-shadow 0.4s ease',
        }}
      />
    )
  }

  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      borderRadius: radius,
      background: '#141414',
      border: `1.5px solid ${accent?.border || '#2a2a2a'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size <= 24 ? 8 : size <= 36 ? 11 : 13,
      fontWeight: 700, color: accent?.primary || '#888',
      letterSpacing: '0.05em', userSelect: 'none',
    }}>
      {initials}
    </div>
  )
}