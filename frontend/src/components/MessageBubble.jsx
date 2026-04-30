import { PersonaAvatar } from '../App'

export default function MessageBubble({ message, persona, accent, index }) {
  if (!persona || !message) return null

  const isUser = message.role === 'user'
  const displayContent = message.content.replace(/<thought>[\s\S]*?<\/thought>/g, '').trim()

  return (
    <div
      className="msg-enter"
      style={{
        display: 'flex', gap: 10,
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        animationDelay: `${Math.min(index * 0.03, 0.15)}s`,
      }}
    >
      {/* Avatar */}
      {isUser ? (
        <div style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: '#141414', border: '1px solid #242424',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 600, color: '#404040',
          letterSpacing: '0.04em', userSelect: 'none',
        }}>
          YOU
        </div>
      ) : (
        <PersonaAvatar persona={persona} size={30} accent={accent} />
      )}

      {/* Bubble */}
      {isUser ? (
        <div style={{
          maxWidth: '76%',
          padding: '10px 15px',
          fontSize: 13.5, lineHeight: 1.7,
          borderRadius: '16px 4px 16px 16px',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          background: '#141414',
          color: '#c8c8c8',
          border: '1px solid #242424',
        }}>
          {displayContent}
        </div>
      ) : (
        <div style={{
          maxWidth: '78%',
          display: 'flex', gap: 0,
        }}>
          {/* Accent left stripe */}
          <div style={{
            width: 2.5, flexShrink: 0, borderRadius: 4,
            background: `linear-gradient(to bottom, ${accent.primary}, transparent)`,
            opacity: 0.5, marginRight: 10,
            alignSelf: 'stretch',
          }} />
          <div style={{
            padding: '10px 15px',
            fontSize: 13.5, lineHeight: 1.75,
            borderRadius: '4px 16px 16px 16px',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            background: 'rgba(255,255,255,0.025)',
            color: '#c2c2c2',
            border: '1px solid #1c1c1c',
          }}>
            {displayContent}
          </div>
        </div>
      )}
    </div>
  )
}