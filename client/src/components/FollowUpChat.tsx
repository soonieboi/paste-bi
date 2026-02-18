import { useState } from 'react'
import { Send, MessageSquare } from 'lucide-react'
import { askFollowUp } from '../api'
import type { AnalysisResult, FollowUpMessage } from '@shared/types'

interface Props {
  sessionId: string
  onAnalysisUpdate: (analysis: AnalysisResult) => void
  initialMessages?: FollowUpMessage[]
}

export default function FollowUpChat({ sessionId, onAnalysisUpdate, initialMessages = [] }: Props) {
  const [messages, setMessages] = useState<FollowUpMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const question = input.trim()
    setInput('')
    setIsLoading(true)

    const userMessage: FollowUpMessage = {
      role: 'user',
      content: question,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await askFollowUp(sessionId, question)

      const assistantMessage: FollowUpMessage = {
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])

      if (response.updatedAnalysis) {
        onAnalysisUpdate(response.updatedAnalysis)
      }
    } catch (error) {
      const errorMessage: FollowUpMessage = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Chat with Your Data</h3>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Ask follow-up questions to explore your data further
        </p>
      </div>

      {messages.length > 0 && (
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
