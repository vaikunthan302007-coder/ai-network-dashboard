import { useState, useEffect } from "react"

export default function Energy() {
  const [grid, setGrid] = useState(generateGrid())

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(generateGrid())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-cyan-500">
        Network Traffic Heatmap
      </h1>

      <div className="grid grid-cols-10 gap-2">
        {grid.map((cell) => (
          <div
            key={cell.id}
            className={`h-12 rounded-lg transition-all duration-500 ${getColor(cell.value)}`}
          />
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-400">
        Color Scale:
        <span className="ml-3 text-green-400">Low</span>
        <span className="ml-3 text-yellow-400">Medium</span>
        <span className="ml-3 text-red-400">High</span>
      </div>

    </div>
  )
}

/* ---------- Generate Heatmap Data ---------- */

function generateGrid() {
  return Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    value: Math.floor(Math.random() * 100),
  }))
}

/* ---------- Color Logic ---------- */

function getColor(value) {
  if (value > 75)
    return "bg-red-500/80"
  if (value > 50)
    return "bg-yellow-400/80"
  return "bg-green-500/80"
}