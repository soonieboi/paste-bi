import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Github, Linkedin, Instagram } from 'lucide-react'

export default function AboutPage() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to PasteBI
        </Link>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            {imgError ? (
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold">SH</span>
              </div>
            ) : (
              <img 
                src="/pp.jpg" 
                alt="Sherms" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                onError={() => setImgError(true)}
              />
            )}
            <h1 className="text-2xl font-bold mb-2">Sherms</h1>
            <p className="text-gray-400">Creator of PasteBI</p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-indigo-400">About</h2>
              <p className="text-gray-300 leading-relaxed">
                I'm a developer passionate about building tools that make data analysis 
                accessible to everyone. PasteBI was born from the idea that getting insights 
                from your data shouldn't require complex setup or technical expertise.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-indigo-400">About PasteBI</h2>
              <p className="text-gray-300 leading-relaxed">
                PasteBI is an AI-powered data analysis tool that transforms raw data into 
                beautiful visualizations and actionable insights in seconds. Just paste your 
                CSV, JSON, or tab-separated data and let Claude AI do the heavy lifting.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3 text-indigo-400">Connect</h2>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/soonieboi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/shermin-h-4050b1187/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com/sherminh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Built with React, Express, and Claude AI
        </p>
      </div>
    </div>
  )
}
