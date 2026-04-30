import { PersonaAvatar, ACCENT } from '../App'
import { RotateCcw } from 'lucide-react'

export default function Sidebar({ personas, active, onSwitch, onClear, accent }) {
  return (
    <div style={{
      width: 240, flexShrink: 0,
      background: '#171717',
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid #2c2c2c',
      padding: '16px 10px',
      gap: 4,
    }}>

      {/* Logo / Brand */}
      <div style={{
        padding: '8px 12px 16px',
        borderBottom: '1px solid #2a2a2a',
        marginBottom: 8,
      }}>
        <span style={{
          fontSize: 13, fontWeight: 600, color: '#888',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          Scaler AI
        </span>
      </div>

      <p style={{ fontSize: 10.5, color: '#444', padding: '0 12px', marginBottom: 4,
        letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
        Personas
      </p>

      {/* Persona list */}
      {personas.map((p) => {
        const isActive = active === p.id
        const ac = ACCENT[p.id]
        return (
          <button
            key={p.id}
            onClick={() => onSwitch(p.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 10,
              cursor: 'pointer', border: 'none',
              fontFamily: 'inherit', textAlign: 'left',
              width: '100%',
              background: isActive ? '#2a2a2a' : 'transparent',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#222' }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
          >
            <PersonaAvatar persona={p} size={32} accent={isActive ? ac : { border: '#333', primary: '#555' }} />
            <div style={{ overflow: 'hidden' }}>
              <p style={{
                fontSize: 13, fontWeight: isActive ? 500 : 400,
                color: isActive ? '#ececec' : '#888',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                transition: 'color 0.15s',
              }}>
                {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </p>
              <p style={{
                fontSize: 10.5, color: isActive ? ac.primary : '#444',
                marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden',
                textOverflow: 'ellipsis', transition: 'color 0.15s',
              }}>
                {p.title}
              </p>
            </div>

            {/* Active dot */}
            {isActive && (
              <div style={{
                marginLeft: 'auto', width: 6, height: 6,
                borderRadius: '50%', background: ac.primary, flexShrink: 0,
                boxShadow: `0 0 6px ${ac.primary}`,
              }} />
            )}
          </button>
        )
      })}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Clear chat */}
      <button
        onClick={onClear}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 12px', borderRadius: 10,
          cursor: 'pointer', border: '1px solid #2a2a2a',
          fontFamily: 'inherit', background: 'transparent',
          color: '#555', fontSize: 12.5, fontWeight: 400,
          width: '100%', transition: 'all 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#e0e0e0'
          e.currentTarget.style.background = '#222'
          e.currentTarget.style.borderColor = '#3a3a3a'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = '#555'
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = '#2a2a2a'
        }}
      >
        <RotateCcw size={13} />
        Clear conversation
      </button>
    </div>
  )
}