import { Lightbulb, AlertTriangle, FileText } from 'lucide-react'
import ChartRenderer from './ChartRenderer'
import type { AnalysisResult } from '@shared/types'

interface Props {
  analysis: AnalysisResult
}

export default function AnalysisResults({ analysis }: Props) {
  return (
    <div className="space-y-6">
      {/* Chart Section */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {analysis.chartConfig.title}
        </h3>
        <div className="h-80">
          <ChartRenderer
            chartType={analysis.chartType}
            data={analysis.chartData}
            config={analysis.chartConfig}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Summary</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insights */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Key Insights</h3>
          </div>
          <ul className="space-y-3">
            {analysis.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-900/50 text-indigo-400 text-sm flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-gray-300">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Anomalies */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Anomalies & Outliers</h3>
          </div>
          {analysis.anomalies.length > 0 ? (
            <ul className="space-y-3">
              {analysis.anomalies.map((anomaly, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-400 mt-2" />
                  <span className="text-gray-300">{anomaly}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No significant anomalies detected</p>
          )}
        </div>
      </div>
    </div>
  )
}
