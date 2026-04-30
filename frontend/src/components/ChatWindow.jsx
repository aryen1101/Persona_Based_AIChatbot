import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import { PersonaAvatar } from '../App'

export default function ChatWindow({ messages, isLoading, persona, error, onChipClick, accent }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (!persona) return null

  return (
    <div style={{
      flex: 1, overflowY: 'auto',
      padding: '24px 20px',
      display: 'flex', flexDirection: 'column', gap: 16,
      background: '#0a0a0a',
      scrollbarWidth: 'thin', scrollbarColor: '#1e1e1e transparent',
    }}>

      {messages.length === 0 && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 20, padding: '40px 24px',
          animation: 'fadeUp 0.4s ease both',
        }}>
          {/* Large avatar */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -6,
              borderRadius: 22,
              background: `radial-gradient(circle, ${accent.dim}, transparent 70%)`,
            }} />
            <PersonaAvatar persona={persona} size={80} accent={accent} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 20, color: '#e8e8e8',
              fontWeight: 400, letterSpacing: '-0.01em',
              marginBottom: 6,
            }}>
              {persona.name}
            </p>
            <p style={{ fontSize: 11, color: '#383838', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {persona.title}
            </p>
          </div>

          {/* Thin rule */}
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #252525, transparent)' }} />

          <p style={{ fontSize: 12, color: '#2e2e2e', letterSpacing: '0.04em' }}>
            Try one of these to begin
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxWidth: 400 }}>
            {persona.chips.map((chip, i) => (
              <button
                key={chip}
                className="chip-btn"
                onClick={() => onChipClick(chip)}
                style={{
                  fontSize: 12, padding: '8px 16px',
                  borderRadius: 20,
                  color: '#5a5a5a',
                  background: '#0f0f0f',
                  border: `1px solid #222`,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  animationDelay: `${i * 0.07}s`,
                  lineHeight: 1.4,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = accent.primary
                  e.currentTarget.style.borderColor = accent.border
                  e.currentTarget.style.background = accent.dim
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#5a5a5a'
                  e.currentTarget.style.borderColor = '#222'
                  e.currentTarget.style.background = '#0f0f0f'
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((m, i) => (
        <MessageBubble key={m.id} message={m} persona={persona} accent={accent} index={i} />
      ))}

      {isLoading && <TypingIndicator persona={persona} accent={accent} />}

      {error && (
        <div style={{
          textAlign: 'center', fontSize: 12,
          padding: '10px 18px', borderRadius: 10,
          margin: '0 auto', maxWidth: 320,
          color: '#f87171',
          background: 'rgba(248,113,113,0.05)',
          border: '1px solid rgba(248,113,113,0.12)',
        }}>
          {error}
        </div>
      )}
      <div ref={endRef} />
    </div>
  )
}