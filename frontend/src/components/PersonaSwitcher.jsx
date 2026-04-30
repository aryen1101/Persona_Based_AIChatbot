import { PERSONAS } from '../utils/personas'
import { PersonaAvatar, ACCENT } from '../App'

export default function PersonaSwitcher({ active, onSwitch, accent }) {
  return (
    <div style={{
      display: 'flex', gap: 8, padding: '10px 20px',
      borderBottom: '1px solid #181818',
      background: 'rgba(0,0,0,0.2)',
      flexShrink: 0, overflowX: 'auto',
    }}>
      {PERSONAS.map((p, i) => {
        const isActive = active === p.id
        const ac = ACCENT[p.id]
        return (
          <button
            key={p.id}
            onClick={() => onSwitch(p.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 14px', borderRadius: 10,
              fontSize: 12, fontWeight: isActive ? 500 : 400,
              whiteSpace: 'nowrap', flexShrink: 0,
              fontFamily: 'inherit', cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: isActive ? ac.dim : 'transparent',
              border: `1px solid ${isActive ? ac.border : '#1e1e1e'}`,
              color: isActive ? ac.primary : '#484848',
              boxShadow: isActive ? `0 0 16px ${ac.dim}` : 'none',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.color = '#888'
                e.currentTarget.style.borderColor = '#2a2a2a'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.color = '#484848'
                e.currentTarget.style.borderColor = '#1e1e1e'
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            <PersonaAvatar persona={p} size={20} accent={isActive ? ac : { border: '#2a2a2a', primary: '#555', dim: 'transparent' }} />
            <span>{p.name.split(' ')[0]}</span>
          </button>
        )
      })}
    </div>
  )
}