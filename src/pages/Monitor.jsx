import { useState, useEffect } from "react"

export default function Monitor() {
  const [servers, setServers] = useState(generateServers())
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prevServers) =>
        prevServers.map((server) => {
          const cpu = Math.floor(Math.random() * 100)
          const memory = Math.floor(Math.random() * 100)
          const risk = Math.min(100, Math.floor((cpu + memory) / 2))

          let down = risk > 95
          let recovering = false

          if (down) {
            setLogs((prev) => [
              {
                id: Date.now(),
                message: `${server.name} crashed. AI initiating recovery.`,
              },
              ...prev.slice(0, 5),
            ])
          }

          // AI Self-healing
          if (server.down && Math.random() > 0.5) {
            down = false
            recovering = false
            setLogs((prev) => [
              {
                id: Date.now(),
                message: `${server.name} successfully recovered by AI.`,
              },
              ...prev.slice(0, 5),
            ])
          }

          if (down && !server.down) {
            recovering = true
          }

          return {
            ...server,
            cpu,
            memory,
            risk,
            down,
            recovering,
          }
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-cyan-500">
        AI Self-Healing Infrastructure Monitor
      </h1>

      {/* Server Grid */}
      <div className="grid grid-cols-4 gap-6">
        {servers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>

      {/* AI Log Panel */}
      <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-cyan-400">
          AI Recovery Logs
        </h2>

        {logs.length === 0 ? (
          <p className="text-green-400">
            No incidents detected
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="mb-2 text-sm text-yellow-400"
            >
              {log.message}
            </div>
          ))
        )}
      </div>

    </div>
  )
}

/* ---------- Server Card ---------- */

function ServerCard({ server }) {
  let status = "Healthy"
  let colorClass =
    "bg-green-500/20 border-green-500 text-green-400"

  if (server.cpu > 85 || server.memory > 85) {
    status = "Critical"
    colorClass =
      "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
  } else if (server.cpu > 65 || server.memory > 65) {
    status = "Warning"
    colorClass =
      "bg-yellow-500/20 border-yellow-500 text-yellow-400"
  }

  if (server.down) {
    status = "DOWN"
    colorClass =
      "bg-red-700/40 border-red-700 text-white animate-pulse"
  }

  if (server.recovering) {
    status = "Recovering..."
    colorClass =
      "bg-blue-500/20 border-blue-500 text-blue-400 animate-pulse"
  }

  return (
    <div
      className={`p-6 rounded-xl border transition-all duration-300 ${colorClass}`}
    >
      <h2 className="font-semibold mb-2">
        {server.name}
      </h2>

      <p>CPU Usage: {server.cpu}%</p>
      <p>Memory Usage: {server.memory}%</p>

      <div className="mt-3 text-sm font-bold">
        Status: {status}
      </div>

      <div className="mt-2 text-xs text-gray-300">
        AI Failure Risk: {server.risk}%
      </div>
    </div>
  )
}

/* ---------- Initial Data ---------- */

function generateServers() {
  return Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: `Server-${i + 1}`,
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    risk: 0,
    down: false,
    recovering: false,
  }))
}