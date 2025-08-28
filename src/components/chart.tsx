"use client"

import { cn } from "@/lib/utils"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ChartData {
  name: string
  value1: number
  value2: number
  value3?: number
}

interface ChartProps {
  data: ChartData[]
  className?: string
  title?: string
  type?: 'bar' | 'line'
  colors?: {
    value1: string
    value2: string
    value3?: string
  }
  labels?: {
    value1: string
    value2: string
    value3?: string
  }
}

export function Chart({ 
  data, 
  className, 
  title, 
  type = 'bar', 
  colors = {
    value1: '#3b82f6', // blue-500
    value2: '#10b981', // emerald-500
    value3: '#f59e0b'  // amber-500
  },
  labels = {
    value1: '데이터 1',
    value2: '데이터 2',
    value3: '데이터 3'
  }
}: ChartProps) {
  // value3가 있는 경우에만 포함
  const datasets = [
    {
      label: labels.value1,
      data: data.map(item => item.value1),
      backgroundColor: colors.value1,
      borderColor: colors.value1,
      borderWidth: 2,
      borderRadius: 4,
      tension: 0.4,
      fill: false,
    },
    {
      label: labels.value2,
      data: data.map(item => item.value2),
      backgroundColor: colors.value2,
      borderColor: colors.value2,
      borderWidth: 2,
      borderRadius: 4,
      tension: 0.4,
      fill: false,
    },
  ]

  // value3가 있는 경우에만 추가
  if (data.some(item => item.value3 !== undefined) && labels.value3 && colors.value3) {
    datasets.push({
      label: labels.value3,
      data: data.map(item => item.value3 || 0),
      backgroundColor: colors.value3,
      borderColor: colors.value3,
      borderWidth: 2,
      borderRadius: 4,
      tension: 0.4,
      fill: false,
    })
  }

  const chartData = {
    labels: data.map(item => item.name),
    datasets: datasets,
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
        },
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
          },
          padding: 8,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
          },
          padding: 8,
          callback: function(value: any) {
            return value.toLocaleString()
          }
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: 'white',
        borderWidth: 2,
      },
    },
  }

  if (type === 'line') {
    return (
      <div className={cn("rounded-lg border border-gray-200 bg-white p-6", className)}>
        {title && (
          <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
        )}
        
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("rounded-lg border border-gray-200 bg-white p-6", className)}>
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      )}
      
      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
} 