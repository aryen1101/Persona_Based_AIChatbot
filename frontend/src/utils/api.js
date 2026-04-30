export async function sendMessage(persona, message, history = []) {
  const res = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ persona, message, history }),
  })
  
  if (!res.ok) throw new Error(`Server connection lost.`);
  
  const data = await res.json()
  return data.response
}

export function toGeminiHistory(messages) {
  return messages.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }))
}