const API_URL = "https://persona-based-aichatbot.onrender.com";

export async function sendMessage(persona, message, history = []) {
  const res = await fetch(`${API_URL}/api/chat`, { //
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ persona, message, history }),
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Server error: ${res.status}`);
  }
  
  const data = await res.json();
  return data.response; 
}

export function toGeminiHistory(messages) {
  return messages.slice(0, -1).map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }))
}