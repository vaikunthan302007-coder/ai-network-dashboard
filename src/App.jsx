import { useEffect, useState } from "react"
import { Routes, Route, NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Monitor,
  Brain,
  Route as RouteIcon,
  Zap,
  Settings as SettingsIcon,
} from "lucide-react"

import Dashboard from "./pages/Dashboard"
import MonitorPage from "./pages/Monitor"
import Routing from "./pages/Routing"
import Energy from "./pages/Energy"
import Settings from "./pages/Settings"
import AI from "./pages/AI"

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") !== "light"
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 text-black dark:text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-cyan-500 mb-10">
          AI Network
        </h1>

        <nav className="space-y-3">
          <SidebarLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <SidebarLink to="/monitor" icon={<Monitor size={18} />} label="Monitor" />
          <SidebarLink to="/ai" icon={<Brain size={18} />} label="AI" />
          <SidebarLink to="/routing" icon={<RouteIcon size={18} />} label="Routing" />
          <SidebarLink to="/energy" icon={<Zap size={18} />} label="Heatmap" />
          <SidebarLink to="/settings" icon={<SettingsIcon size={18} />} label="Settings" />
        </nav>

        {/* Theme Switch */}
        <div className="mt-10">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/monitor" element={<MonitorPage />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/routing" element={<Routing />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition
        ${
          isActive
            ? "bg-cyan-500/20 text-cyan-500"
            : "hover:bg-cyan-500/10"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}