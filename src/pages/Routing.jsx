import { useState, useEffect } from "react"
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
} from "reactflow"
import "reactflow/dist/style.css"

export default function Routing() {
  return (
    <ReactFlowProvider>
      <RoutingContent />
    </ReactFlowProvider>
  )
}

function RoutingContent() {
  const [congestion, setCongestion] = useState(45)
  const [edges, setEdges] = useState(primaryEdges)
  const [decision, setDecision] = useState("Primary Route Active")
  const [confidence, setConfidence] = useState(94)

  useEffect(() => {
    const interval = setInterval(() => {
      const newCongestion = Math.floor(Math.random() * 100)
      setCongestion(newCongestion)

      if (newCongestion > 75) {
        setEdges(backupEdges)
        setDecision("AI Rerouted via Backup Mesh")
        setConfidence(97)
      } else if (newCongestion > 50) {
        setEdges(secondaryEdges)
        setDecision("AI Balanced via Secondary Path")
        setConfidence(92)
      } else {
        setEdges(primaryEdges)
        setDecision("Primary Route Optimal")
        setConfidence(95)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-cyan-500">
        Enterprise AI Routing Engine
      </h1>

      <div className="flex gap-12">

        <div>
          <p className="text-gray-400 text-sm">Congestion</p>
          <p className={
            congestion > 75
              ? "text-red-500 text-xl font-bold"
              : congestion > 50
              ? "text-yellow-400 text-xl font-bold"
              : "text-green-500 text-xl font-bold"
          }>
            {congestion}%
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">AI Decision</p>
          <p className="text-cyan-400 text-xl font-bold">
            {decision}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Confidence</p>
          <p className="text-yellow-400 text-xl font-bold">
            {confidence}%
          </p>
        </div>

      </div>

      <div className="bg-gray-100 dark:bg-slate-800 rounded-xl p-4 h-[550px]">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>

    </div>
  )
}

/* ---------------- NODES ---------------- */

const nodes = [
  { id: "1", position: { x: 100, y: 250 }, data: { label: "Edge Node A" } },
  { id: "2", position: { x: 250, y: 100 }, data: { label: "Router 1" } },
  { id: "3", position: { x: 250, y: 400 }, data: { label: "Router 2" } },
  { id: "4", position: { x: 450, y: 250 }, data: { label: "Core AI Router" } },
  { id: "5", position: { x: 650, y: 100 }, data: { label: "Router 3" } },
  { id: "6", position: { x: 650, y: 400 }, data: { label: "Router 4" } },
  { id: "7", position: { x: 850, y: 250 }, data: { label: "Edge Node B" } },
  { id: "8", position: { x: 450, y: 50 }, data: { label: "Cloud Gateway" } },
]

/* ---------------- EDGE MODES ---------------- */

const primaryEdges = [
  { id: "p1", source: "1", target: "2", animated: true },
  { id: "p2", source: "2", target: "4", animated: true },
  { id: "p3", source: "4", target: "5", animated: true },
  { id: "p4", source: "5", target: "7", animated: true },
]

const secondaryEdges = [
  { id: "s1", source: "1", target: "3", animated: true },
  { id: "s2", source: "3", target: "4", animated: true },
  { id: "s3", source: "4", target: "6", animated: true },
  { id: "s4", source: "6", target: "7", animated: true },
]

const backupEdges = [
  { id: "b1", source: "1", target: "2", animated: true, style: { stroke: "lime", strokeWidth: 3 } },
  { id: "b2", source: "2", target: "8", animated: true, style: { stroke: "lime", strokeWidth: 3 } },
  { id: "b3", source: "8", target: "4", animated: true, style: { stroke: "lime", strokeWidth: 3 } },
  { id: "b4", source: "4", target: "6", animated: true, style: { stroke: "lime", strokeWidth: 3 } },
  { id: "b5", source: "6", target: "7", animated: true, style: { stroke: "lime", strokeWidth: 3 } },
]