import { useState, useCallback, useEffect } from 'react'
import { sendMessage, toGeminiHistory } from '../utils/api'

const STORAGE_KEY = (persona) => `scaler_chat_${persona}`

export function useChat(persona) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY(persona))
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]         = useState(null)

  // Reload from localStorage when persona switches
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY(persona))
      setMessages(saved ? JSON.parse(saved) : [])
      setError(null)
    } catch {
      setMessages([])
    }
  }, [persona])

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY(persona), JSON.stringify(messages))
    } catch {}
  }, [messages, persona])

  const send = useCallback(async (text) => {
    if (!text.trim() || isLoading) return

    const userMsg = { role: 'user', content: text, id: Date.now() }
    const next    = [...messages, userMsg]
    setMessages(next)
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendMessage(persona, text, toGeminiHistory(next))
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response, id: Date.now() + 1 },
      ])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [messages, persona, isLoading])

  const clearChat = useCallback(() => {
    setMessages([])
    setError(null)
    try {
      localStorage.removeItem(STORAGE_KEY(persona))
    } catch {}
  }, [persona])

  return { messages, isLoading, error, send, clearChat }
}