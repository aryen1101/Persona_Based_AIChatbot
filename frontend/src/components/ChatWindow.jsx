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
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        flex: 1,
        maxWidth: 720, width: '100%',
        margin: '0 auto', padding: '32px 24px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>

        {/* Empty state */}
        {messages.length === 0 && (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 20, padding: '60px 0',
            animation: 'fadeUp 0.35s ease both',
          }}>
            <PersonaAvatar persona={persona} size={72} accent={accent} />

            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontSize: 22, fontWeight: 600, color: '#ececec',
                marginBottom: 6, letterSpacing: '-0.02em',
              }}>
                {persona.name}
              </h2>
              <p style={{ fontSize: 13, color: '#555' }}>{persona.title}</p>
            </div>

            {/* Chips */}
            <div style={{
              display: 'flex', flexWrap: 'wrap',
              justifyContent: 'center', gap: 8,
              maxWidth: 500, marginTop: 8,
            }}>
              {persona.chips.map((chip, i) => (
                <button
                  key={chip}
                  className="chip-in"
                  onClick={() => onChipClick(chip)}
                  style={{
                    fontSize: 12.5, padding: '9px 16px',
                    borderRadius: 20,
                    border: '1px solid #333',
                    background: '#2a2a2a',
                    color: '#aaa',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s ease',
                    animationDelay: `${i * 0.06}s`,
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = accent.border
                    e.currentTarget.style.color = accent.primary
                    e.currentTarget.style.background = accent.dim
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#333'
                    e.currentTarget.style.color = '#aaa'
                    e.currentTarget.style.background = '#2a2a2a'
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((m, i) => (
          <MessageBubble key={m.id} message={m} persona={persona} accent={accent} index={i} />
        ))}

        {isLoading && <TypingIndicator persona={persona} accent={accent} />}

        {error && (
          <div style={{
            textAlign: 'center', fontSize: 12.5,
            padding: '10px 18px', borderRadius: 10,
            margin: '8px auto', maxWidth: 340,
            color: '#f87171',
            background: 'rgba(248,113,113,0.06)',
            border: '1px solid rgba(248,113,113,0.15)',
          }}>
            {error}
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  )
}