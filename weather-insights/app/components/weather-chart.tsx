"use client"

import { useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface ForecastDay {
  date: string
  high: number
  low: number
  condition: string
  icon: string
  description: string
}

interface WeatherChartProps {
  data: ForecastDay[]
}

export function WeatherChart({ data }: WeatherChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null)

  const labels = data.map((day) =>
    new Date(day.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  )

  const chartData = {
    labels,
    datasets: [
      {
        label: "High Temperature",
        data: data.map((day) => day.high),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Low Temperature",
        data: data.map((day) => day.low),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
          font: {
            size: 12,
            weight: "bold" as const,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        padding: 10,
        titleFont: {
          size: 14,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          afterLabel: (context: any) => {
            const index = context.dataIndex
            return `Condition: ${data[index].description}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "white",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "white",
          font: {
            size: 11,
          },
          callback: (value: any) => value + "°C",
        },
        suggestedMin: Math.min(...data.map((day) => day.low)) - 2,
        suggestedMax: Math.max(...data.map((day) => day.high)) + 2,
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 6,
      },
    },
    animation: {
      duration: 1000,
    },
  }

  return (
    <div className="w-full h-full">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  )
}
