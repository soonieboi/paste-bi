import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { ChartConfig } from '@shared/types'

interface Props {
  chartType: 'bar' | 'line' | 'pie' | 'scatter'
  data: Record<string, unknown>[]
  config: ChartConfig
}

const COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
]

const tooltipStyle = {
  backgroundColor: '#1f2937',
  border: '1px solid #374151',
  borderRadius: '8px',
  color: '#f3f4f6',
}

export default function ChartRenderer({ chartType, data, config }: Props) {
  const { xKey, yKey } = config

  switch (chartType) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey={xKey} 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: '#9ca3af' }} />
            <Bar dataKey={yKey} fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )

    case 'line':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey={xKey} 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: '#9ca3af' }} />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ fill: '#6366f1', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#818cf8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )

    case 'pie':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={data}
              dataKey={yKey || 'value'}
              nameKey={xKey || 'name'}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#6b7280' }}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: '#9ca3af' }} />
          </PieChart>
        </ResponsiveContainer>
      )

    case 'scatter':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey={xKey} 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              name={xKey}
            />
            <YAxis 
              dataKey={yKey} 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              name={yKey}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
            <Legend wrapperStyle={{ color: '#9ca3af' }} />
            <Scatter name="Data Points" data={data} fill="#6366f1" />
          </ScatterChart>
        </ResponsiveContainer>
      )

    default:
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Unsupported chart type: {chartType}
        </div>
      )
  }
}
