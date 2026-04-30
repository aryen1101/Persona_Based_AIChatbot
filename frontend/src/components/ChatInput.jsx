import { useState, useRef, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ChatInput({ onSend, isLoading, accent }) {
  const [value, setValue] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 140)}px`
    }
  }, [value])

  const handleSend = () => {
    if (!value.trim() || isLoading) return
    onSend(value.trim())
    setValue('')
    if (ref.current) ref.current.style.height = 'auto'
  }

  const canSend = value.trim() && !isLoading

  return (
    <div style={{
      flexShrink: 0,
      padding: '12px 24px 20px',
      background: '#212121',
    }}>
      <div style={{
        maxWidth: 720, margin: '0 auto',
        position: 'relative',
        background: '#2f2f2f',
        border: `1px solid ${canSend ? accent?.border || '#444' : '#383838'}`,
        borderRadius: 16,
        display: 'flex', alignItems: 'flex-end', gap: 8,
        padding: '12px 14px',
        transition: 'border-color 0.2s ease',
        boxShadow: canSend ? `0 0 0 3px ${accent?.dim || 'transparent'}` : 'none',
      }}>
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
          }}
          disabled={isLoading}
          placeholder="Message…"
          style={{
            flex: 1, background: 'transparent',
            border: 'none', outline: 'none',
            fontSize: 14, color: '#ececec',
            resize: 'none', lineHeight: 1.6,
            minHeight: 24, maxHeight: 140,
            fontFamily: 'inherit',
          }}
        />

        <button
          onClick={handleSend}
          disabled={!canSend}
          style={{
            width: 34, height: 34, borderRadius: 9,
            border: 'none', cursor: canSend ? 'pointer' : 'default',
            background: canSend ? accent?.primary || '#ececec' : '#3a3a3a',
            color: canSend ? '#111' : '#555',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'all 0.15s ease',
          }}
        >
          {isLoading
            ? <span style={{ fontSize: 16, letterSpacing: 1 }}>···</span>
            : <ArrowUp size={16} strokeWidth={2.5} />
          }
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: 11, color: '#3a3a3a', marginTop: 10 }}>
        Persona responses are AI-generated and for educational purposes only.
      </p>
    </div>
  )
}