export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Chart skeleton */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="h-6 w-48 bg-gray-800 rounded mb-4" />
        <div className="h-80 bg-gray-800 rounded" />
      </div>

      {/* Summary skeleton */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="h-6 w-32 bg-gray-800 rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
          <div className="h-4 bg-gray-800 rounded w-4/6" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insights skeleton */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="h-6 w-32 bg-gray-800 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-full" />
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anomalies skeleton */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="h-6 w-40 bg-gray-800 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-full" />
                  <div className="h-4 bg-gray-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
