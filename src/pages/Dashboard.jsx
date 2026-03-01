import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function Dashboard() {
  const [data, setData] = useState([
    { time: "1", bandwidth: 60 },
    { time: "2", bandwidth: 55 },
    { time: "3", bandwidth: 58 },
    { time: "4", bandwidth: 62 },
    { time: "5", bandwidth: 65 },
  ])

  const [alerts, setAlerts] = useState([])
  const [prediction, setPrediction] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1].bandwidth
        const newValue = Math.floor(Math.random() * 40) + 50

        const predicted = Math.round(last + (newValue - last) * 0.7)
        setPrediction(predicted)

        if (newValue > 85) {
          setAlerts((prevAlerts) => [
            {
              id: Date.now(),
              message: "Critical congestion spike detected!",
            },
            ...prevAlerts.slice(0, 4),
          ])
        }

        return [
          ...prev.slice(1),
          {
            time: (parseInt(prev[prev.length - 1].time) + 1).toString(),
            bandwidth: newValue,
          },
        ]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const chartData = prediction
    ? [
        ...data,
        {
          time: (parseInt(data[data.length - 1].time) + 1).toString(),
          bandwidth: null,
          predicted: prediction,
        },
      ]
    : data

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-cyan-400">
        AI Network Analytics
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Latency" value="0.45 ms" color="text-cyan-400" />
        <StatCard title="Bandwidth" value="87%" color="text-yellow-400" />
        <StatCard title="Throughput" value="118 Gbps" color="text-green-400" />
        <StatCard title="Congestion" value="50%" color="text-red-400" />
      </div>

      {/* Forecast */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-2 text-cyan-400">
          AI Forecast
        </h2>

        {prediction ? (
          <p className="text-yellow-400 text-xl font-bold">
            Predicted Next Bandwidth: {prediction}%
          </p>
        ) : (
          <p className="text-gray-400">Calculating prediction...</p>
        )}
      </div>

      {/* Chart */}
      <div className="glass-card p-6 h-[420px]">
        <h2 className="text-lg font-semibold mb-4 text-cyan-400">
          Real-Time Bandwidth + Forecast
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="bandwidth" stroke="#06b6d4" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="predicted" stroke="#facc15" strokeDasharray="5 5" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 text-cyan-400">
          AI Alerts
        </h2>

        {alerts.length === 0 ? (
          <p className="text-green-400">No anomalies detected</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="mb-3 p-3 rounded-lg bg-red-500/20 border border-red-500">
              <p className="text-red-400 font-semibold">{alert.message}</p>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

function StatCard({ title, value, color }) {
  return (
    <div className="glass-card p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}