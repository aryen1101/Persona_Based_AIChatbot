import { useState, useRef, useEffect } from 'react'

export default function ChatInput({ onSend, isLoading, accent }) {
  const [value, setValue] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 120)}px`
    }
  }, [value])

  const handleSend = () => {
    if (!value.trim() || isLoading) return
    onSend(value.trim())
    setValue('')
  }

  const canSend = value.trim() && !isLoading

  return (
    <div style={{
      flexShrink: 0, padding: '12px 20px',
      borderTop: '1px solid #181818',
      background: '#0a0a0a',
      display: 'flex', gap: 10, alignItems: 'flex-end',
    }}>
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
        disabled={isLoading}
        placeholder="Ask a question… (Enter to send)"
        style={{
          flex: 1,
          background: '#111',
          border: '1px solid #222',
          borderRadius: 12,
          padding: '11px 15px',
          fontSize: 13.5,
          color: '#d0d0d0',
          resize: 'none',
          outline: 'none',
          minHeight: 44,
          maxHeight: 120,
          lineHeight: 1.55,
          fontFamily: 'inherit',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={e => e.target.style.borderColor = accent?.border || '#333'}
        onBlur={e => e.target.style.borderColor = '#222'}
      />

      <button
        onClick={handleSend}
        disabled={!canSend}
        style={{
          height: 44, padding: '0 20px',
          borderRadius: 12,
          fontSize: 13, fontWeight: 500,
          fontFamily: 'inherit',
          cursor: canSend ? 'pointer' : 'not-allowed',
          flexShrink: 0, border: 'none',
          transition: 'all 0.2s ease',
          background: canSend ? accent?.primary || '#e8e8e8' : '#141414',
          color: canSend ? '#060606' : '#2e2e2e',
          boxShadow: canSend ? `0 0 20px ${accent?.dim || 'transparent'}` : 'none',
        }}
      >
        {isLoading ? '···' : 'Send'}
      </button>
    </div>
  )
}