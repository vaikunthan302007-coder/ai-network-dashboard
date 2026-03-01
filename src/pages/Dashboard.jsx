import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [latency, setLatency] = useState(0.45);
  const [bandwidth, setBandwidth] = useState(70);
  const [throughput, setThroughput] = useState(120);
  const [congestion, setCongestion] = useState(40);
  const [forecast, setForecast] = useState(75);
  const [chartData, setChartData] = useState([
    { time: "1", value: 60 },
    { time: "2", value: 65 },
    { time: "3", value: 70 },
    { time: "4", value: 75 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBandwidth = Math.floor(Math.random() * 100);
      const newLatency = (Math.random() * 1).toFixed(2);
      const newThroughput = Math.floor(Math.random() * 200);
      const newCongestion = Math.floor(Math.random() * 100);
      const predicted = Math.min(
        100,
        Math.max(40, newBandwidth + Math.floor(Math.random() * 10 - 5))
      );

      setLatency(newLatency);
      setBandwidth(newBandwidth);
      setThroughput(newThroughput);
      setCongestion(newCongestion);
      setForecast(predicted);

      setChartData((prev) => {
        const newData = [
          ...prev.slice(-6),
          { time: `${prev.length + 1}`, value: newBandwidth },
        ];
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getColor = (value, type) => {
    if (type === "congestion") {
      if (value > 75) return "text-red-400";
      if (value > 50) return "text-yellow-400";
      return "text-green-400";
    }
    if (type === "bandwidth") {
      if (value > 75) return "text-green-400";
      if (value > 40) return "text-yellow-400";
      return "text-red-400";
    }
    return "text-cyan-400";
  };

  const Card = ({ title, value, type }) => (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className={`text-2xl font-bold mt-2 ${getColor(value, type)}`}>
        {value}
      </p>
    </div>
  );

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        AI Network Analytics
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Latency" value={`${latency} ms`} />
        <Card title="Bandwidth" value={`${bandwidth}%`} type="bandwidth" />
        <Card title="Throughput" value={`${throughput} Gbps`} />
        <Card title="Congestion" value={`${congestion}%`} type="congestion" />
      </div>

      {/* AI Forecast */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-lg text-cyan-400 mb-2">AI Forecast</h2>
        <p className="text-yellow-400 font-semibold text-xl">
          Predicted Next Bandwidth: {forecast}%
        </p>
      </div>

      {/* Real-Time Chart */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg text-cyan-400 mb-4">
          Real-Time Bandwidth + Forecast
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;