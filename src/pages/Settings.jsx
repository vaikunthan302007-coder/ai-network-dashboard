import { useState, useEffect } from "react"

export default function Settings() {
  const [name, setName] = useState(localStorage.getItem("userName") || "Admin")
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "admin@ainetwork.com")
  const [alerts, setAlerts] = useState(true)
  const [bandwidth, setBandwidth] = useState(85)
  const [threshold, setThreshold] = useState(70)
  const [aiMode, setAiMode] = useState("Balanced")
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    localStorage.setItem("userName", name)
    localStorage.setItem("userEmail", email)
    localStorage.setItem("avatar", avatar)
  }, [name, email, avatar])

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setName("Admin")
    setEmail("admin@ainetwork.com")
    setBandwidth(85)
    setThreshold(70)
    setAiMode("Balanced")
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-cyan-400">
        System Settings
      </h1>

      {/* Profile Section */}
      <div className="glass-card p-6 space-y-6">
        <h2 className="text-lg font-semibold text-cyan-400">
          User Profile
        </h2>

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-slate-700 overflow-hidden">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : null}
          </div>

          <label className="cursor-pointer bg-cyan-500 px-4 py-2 rounded text-white hover:bg-cyan-600">
            Upload Avatar
            <input
              type="file"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-slate-800"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-slate-800"
          />
        </div>
      </div>

      {/* Network Settings */}
      <div className="glass-card p-6 space-y-6">
        <h2 className="text-lg font-semibold text-cyan-400">
          Network Configuration
        </h2>

        <div>
          <label>Max Bandwidth Limit: {bandwidth}%</label>
          <input
            type="range"
            min="50"
            max="100"
            value={bandwidth}
            onChange={(e) => setBandwidth(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>Alert Threshold: {threshold}%</label>
          <input
            type="range"
            min="50"
            max="95"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label>AI Optimization Mode</label>
          <select
            value={aiMode}
            onChange={(e) => setAiMode(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-slate-800"
          >
            <option>Conservative</option>
            <option>Balanced</option>
            <option>Aggressive</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <span>Enable Alerts</span>
          <input
            type="checkbox"
            checked={alerts}
            onChange={() => setAlerts(!alerts)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-cyan-500 px-6 py-2 rounded text-white hover:bg-cyan-600"
        >
          Save Changes
        </button>

        <button
          onClick={handleReset}
          className="bg-red-500 px-6 py-2 rounded text-white hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      {saved && (
        <p className="text-green-400 font-semibold">
          Settings saved successfully!
        </p>
      )}

    </div>
  )
}