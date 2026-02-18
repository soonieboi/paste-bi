import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Sparkles, Share2, MessageSquare, User } from 'lucide-react'
import { analyzeData } from '../api'
import { exampleDatasets } from '../data/examples'
import AnalysisResults from '../components/AnalysisResults'
import FollowUpChat from '../components/FollowUpChat'
import LoadingSkeleton from '../components/LoadingSkeleton'
import type { AnalysisResult } from '@shared/types'

export default function HomePage() {
  const [inputData, setInputData] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!inputData.trim()) {
      setError('Please paste some data to analyze')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const result = await analyzeData(inputData)
      setSessionId(result.sessionId)
      setAnalysis(result.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleShare = () => {
    if (sessionId) {
      const url = `${window.location.origin}/session/${sessionId}`
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  const handleAnalysisUpdate = (updated: AnalysisResult) => {
    setAnalysis(updated)
  }

  const handleExampleClick = (data: string) => {
    setInputData(data)
    setAnalysis(null)
    setSessionId(null)
    setError(null)
  }

  const handleReset = () => {
    setInputData('')
    setAnalysis(null)
    setSessionId(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-white">PasteBI</h1>
          </div>
          <Link 
            to="/about" 
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">About</span>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!analysis ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Paste your data, get instant insights
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Drop in CSV, JSON, or tab-separated data. Claude AI will analyze it 
                and generate beautiful visualizations with actionable insights.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <Sparkles className="w-6 h-6 text-indigo-400 mb-2" />
                <h3 className="text-white font-semibold mb-1">AI-Powered Analysis</h3>
                <p className="text-gray-400 text-sm">
                  Claude automatically chooses the best chart type and extracts key insights
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <MessageSquare className="w-6 h-6 text-indigo-400 mb-2" />
                <h3 className="text-white font-semibold mb-1">Chat with Your Data</h3>
                <p className="text-gray-400 text-sm">
                  Ask follow-up questions to dive deeper into your analysis
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <Share2 className="w-6 h-6 text-indigo-400 mb-2" />
                <h3 className="text-white font-semibold mb-1">Share Instantly</h3>
                <p className="text-gray-400 text-sm">
                  Generate a unique URL to share your analysis with anyone
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
              <label className="block text-gray-300 font-medium mb-2">
                Paste your data (CSV, JSON, or tab-separated)
              </label>
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Month,Revenue,Orders
January,45000,320
February,52000,380
..."
                className="w-full h-64 bg-gray-950 border border-gray-700 rounded-lg p-4 text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-600"
              />
              
              {error && (
                <div className="mt-3 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !inputData.trim()}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze Data
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Example Datasets */}
            <div className="mb-8">
              <h3 className="text-gray-300 font-medium mb-3">Try an example dataset:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {exampleDatasets.map((example) => (
                  <button
                    key={example.name}
                    onClick={() => handleExampleClick(example.data)}
                    className="text-left bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-indigo-600 rounded-lg p-4 transition-colors"
                  >
                    <h4 className="text-white font-medium mb-1">{example.name}</h4>
                    <p className="text-gray-500 text-sm">{example.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Loading Skeleton */}
            {isAnalyzing && <LoadingSkeleton />}
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={handleReset}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  New Analysis
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            <AnalysisResults analysis={analysis} />

            {/* Follow-up Chat */}
            {sessionId && (
              <FollowUpChat
                sessionId={sessionId}
                onAnalysisUpdate={handleAnalysisUpdate}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          Powered by Claude AI • Built with React + TypeScript
        </div>
      </footer>
    </div>
  )
}
