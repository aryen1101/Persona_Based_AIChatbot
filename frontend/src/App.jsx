import { useState } from 'react'
import { PERSONAS } from './utils/personas'
import { useChat } from './hooks/useChat'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'

const ACTIVE_PERSONA_KEY = 'scaler_active_persona'

export const ACCENT = {
  anshuman:  { primary: '#4ade80', dim: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.22)' },
  abhimanyu: { primary: '#818cf8', dim: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.22)' },
  kshitij:   { primary: '#fb923c', dim: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.22)'  },
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #212121; color: #ececec; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3a3a3a; border-radius: 10px; }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes dotPulse { 0%,80%,100% { transform:scale(0.55); opacity:0.25; } 40% { transform:scale(1); opacity:1; } }
        @keyframes chipIn   { from { opacity:0; transform:scale(0.94) translateY(4px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .msg-in  { animation: fadeUp 0.22s ease both; }
        .chip-in { animation: chipIn 0.28s ease both; }
      `}</style>

      <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
        <Sidebar
          personas={PERSONAS} active={personaId}
          onSwitch={handleSwitch} onClear={clearChat}
          accent={accent}
        />

        {/* Main panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#212121' }}>

          {/* Topbar */}
          <div style={{
            height: 54, display: 'flex', alignItems: 'center',
            padding: '0 28px', borderBottom: '1px solid #2c2c2c',
            flexShrink: 0, gap: 10,
          }}>
            <PersonaAvatar persona={persona} size={28} accent={accent} />
            <span style={{ fontSize: 14, fontWeight: 500, color: '#ececec' }}>{persona.name}</span>
            <span style={{
              fontSize: 10.5, color: '#555', background: '#2a2a2a',
              padding: '2px 10px', borderRadius: 20, fontWeight: 400,
            }}>
              {persona.title}
            </span>
          </div>

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

export function PersonaAvatar({ persona, size = 32, accent }) {
  const [imgFailed, setImgFailed] = useState(false)
  if (!persona) return null
  const initials = persona.name.split(' ').map(n => n[0]).join('').slice(0, 2)
  const r = size <= 28 ? 8 : size <= 40 ? 10 : 13

  if (persona.image && !imgFailed) {
    return (
      <img src={persona.image} alt={persona.name} onError={() => setImgFailed(true)}
        style={{ width: size, height: size, borderRadius: r, objectFit: 'cover',
          flexShrink: 0, border: `1.5px solid ${accent?.border || '#333'}` }} />
    )
  }
  return (
    <div style={{ width: size, height: size, borderRadius: r, flexShrink: 0,
      background: '#2a2a2a', border: `1.5px solid ${accent?.border || '#333'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size <= 28 ? 9 : 12, fontWeight: 600,
      color: accent?.primary || '#888', userSelect: 'none' }}>
      {initials}
    </div>
  )
}