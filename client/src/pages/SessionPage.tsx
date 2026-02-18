import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BarChart3, ArrowLeft } from 'lucide-react'
import { getSession } from '../api'
import AnalysisResults from '../components/AnalysisResults'
import FollowUpChat from '../components/FollowUpChat'
import LoadingSkeleton from '../components/LoadingSkeleton'
import type { Session, AnalysisResult } from '@shared/types'

export default function SessionPage() {
  const { id } = useParams<{ id: string }>()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchSession = async () => {
      try {
        const data = await getSession(id)
        setSession(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load session')
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [id])

  const handleAnalysisUpdate = (updated: AnalysisResult) => {
    if (session) {
      setSession({ ...session, analysis: updated })
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <BarChart3 className="w-8 h-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-white">PasteBI</h1>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            New Analysis
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && <LoadingSkeleton />}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Start New Analysis
            </Link>
          </div>
        )}

        {session && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">Shared Analysis</h2>
            
            <AnalysisResults analysis={session.analysis} />

            {id && (
              <FollowUpChat
                sessionId={id}
                onAnalysisUpdate={handleAnalysisUpdate}
                initialMessages={session.followUps}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}
