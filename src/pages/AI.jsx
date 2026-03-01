import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function AI() {
  const [confidence, setConfidence] = useState(88)
  const [performanceData, setPerformanceData] = useState([])
  const [logs, setLogs] = useState([
    "AI Engine Initialized",
    "Monitoring Network Traffic...",
  ])
  const [routingMode, setRoutingMode] = useState("Balanced")

  // Generate live performance data safely
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData((prev) => {
        const newPoint = {
          time: new Date().toLocaleTimeString(),
          efficiency: Math.floor(Math.random() * 15) + 85,
        }
        return [...prev.slice(-9), newPoint]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const runOptimization = () => {
    setLogs((prev) => [...prev, "Running Advanced Optimization..."])
    setConfidence(Math.floor(Math.random() * 10) + 90)

    setTimeout(() => {
      setLogs((prev) => [...prev, "Routing recalculated successfully."])
    }, 1500)
  }

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold text-cyan-400">
        AI Optimization Engine
      </h1>

      {/* REAL-TIME PERFORMANCE CHART */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-cyan-400 mb-4">
          Real-Time AI Performance
        </h2>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis dataKey="time" hide />
              <YAxis domain={[70, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard title="Prediction Confidence" value={`${confidence}%`} />
        <AnalyticsCard title="Routing Efficiency" value="94%" />
        <AnalyticsCard title="Failure Probability" value="9%" />
      </div>

      {/* ROUTING CONTROL */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-cyan-400">
          AI Routing Mode
        </h2>

        <select
          value={routingMode}
          onChange={(e) => setRoutingMode(e.target.value)}
          className="bg-slate-800 p-2 rounded w-full"
        >
          <option>Conservative</option>
          <option>Balanced</option>
          <option>Aggressive</option>
        </select>

        <button
          onClick={runOptimization}
          className="bg-cyan-500 px-6 py-2 rounded text-white hover:bg-cyan-600"
        >
          Run Optimization
        </button>

        <div className="bg-slate-900 p-4 rounded max-h-40 overflow-y-auto text-sm space-y-2">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-400">
              • {log}
            </p>
          ))}
        </div>
      </div>

    </div>
  )
}

function AnalyticsCard({ title, value }) {
  return (
    <div className="glass-card p-6 text-center">
      <h3 className="text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-cyan-400 mt-2">
        {value}
      </p>
    </div>
  )
}