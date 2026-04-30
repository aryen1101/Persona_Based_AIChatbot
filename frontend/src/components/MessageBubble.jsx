import { PersonaAvatar } from '../App'

export default function MessageBubble({ message, persona, accent, index }) {
  if (!persona || !message) return null

  const isUser = message.role === 'user'
  const displayContent = message.content.replace(/<thought>[\s\S]*?<\/thought>/g, '').trim()

  // User message — right-aligned pill (GPT style)
  if (isUser) {
    return (
      <div className="msg-in" style={{
        display: 'flex', justifyContent: 'flex-end',
        marginBottom: 4,
        animationDelay: `${Math.min(index * 0.02, 0.12)}s`,
      }}>
        <div style={{
          maxWidth: '70%',
          background: '#2f2f2f',
          border: '1px solid #3a3a3a',
          borderRadius: '18px 18px 4px 18px',
          padding: '11px 16px',
          fontSize: 14, lineHeight: 1.65,
          color: '#e8e8e8',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>
          {displayContent}
        </div>
      </div>
    )
  }

  // AI message — avatar + plain flowing text (GPT style)
  return (
    <div className="msg-in" style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      marginBottom: 4, padding: '6px 0',
      animationDelay: `${Math.min(index * 0.02, 0.12)}s`,
    }}>
      <div style={{ flexShrink: 0, marginTop: 2 }}>
        <PersonaAvatar persona={persona} size={30} accent={accent} />
      </div>
      <div style={{
        fontSize: 14, lineHeight: 1.75,
        color: '#d1d1d1',
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        flex: 1, paddingTop: 3,
      }}>
        {displayContent}
      </div>
    </div>
  )
}