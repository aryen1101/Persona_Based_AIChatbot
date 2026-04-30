import { PersonaAvatar } from '../App'

export default function TypingIndicator({ persona, accent }) {
  if (!persona) return null
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '6px 0' }}>
      <PersonaAvatar persona={persona} size={30} accent={accent} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center', paddingTop: 8 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 7, height: 7, borderRadius: '50%',
            background: accent?.primary || '#888',
            display: 'inline-block',
            animation: 'dotPulse 1.4s infinite ease-in-out',
            animationDelay: `${i * 0.16}s`,
          }} />
        ))}
      </div>
    </div>
  )
}