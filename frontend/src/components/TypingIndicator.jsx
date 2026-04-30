import { PersonaAvatar } from '../App'

export default function TypingIndicator({ persona, accent }) {
  if (!persona) return null

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <PersonaAvatar persona={persona} size={30} accent={accent} />
      <div style={{
        display: 'flex', gap: 0,
      }}>
        <div style={{
          width: 2.5, borderRadius: 4, flexShrink: 0,
          background: `linear-gradient(to bottom, ${accent.primary}, transparent)`,
          opacity: 0.4, marginRight: 10, alignSelf: 'stretch',
          minHeight: 42,
        }} />
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid #1c1c1c',
          borderRadius: '4px 16px 16px 16px',
          padding: '13px 18px',
          display: 'flex', gap: 5, alignItems: 'center',
        }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              width: 5, height: 5, borderRadius: '50%',
              background: accent.primary,
              display: 'inline-block', opacity: 0.3,
              animation: 'dotBounce 1.3s infinite ease-in-out',
              animationDelay: `${i * 0.18}s`,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}