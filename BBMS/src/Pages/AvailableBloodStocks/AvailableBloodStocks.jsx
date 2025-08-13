import React, { useEffect, useState } from "react";
import districts from "../../SharedData/districts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./AvailableBloodStocks.css";

const bloodData = [
  { type: "A+", units: 120 },
  { type: "B+", units: 85 },
  { type: "AB+", units: 40 },
  { type: "O+", units: 150 },
  { type: "A-", units: 20 },
  { type: "B-", units: 15 },
  { type: "AB-", units: 10 },
  { type: "O-", units: 5 },
];

const getStatus = (units) => {
  if (units < 10) return "Critical";
  if (units < 30) return "Low";
  return "Sufficient";
};

const statusColor = {
  Critical: "bg-red-500",
  Low: "bg-yellow-400",
  Sufficient: "bg-green-500",
};

function AvailableBloodStocks({theme}) {
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const [hospitals, setHospitals] = useState([]);
  const [district, setDistrict] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleDistrict = (e) => {
    setDistrict(e.value);
  };

  

  useEffect(() => {
    fetch(`http://localhost:9191/dashboard?user_id=${userId}&user_type=${userType}/bloodStock?${district}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        console.log(district);
        setHospitals(data);
      });
  }, [district]);

  return (
    <div className={`blood-stock-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="header-controls">
        <div className="district-control">
          <label className={isDarkMode ? 'dark-label' : ''}>District:</label>
          <select
            className={`district-select ${isDarkMode ? 'dark-select' : ''}`}
            name="District"
            onChange={(e) => handleDistrict(e)}
            required
          >
            <option value=""> Overall </option>
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

      </div>

      <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'dark-title' : ''}`}>
        Available Blood Stocks
      </h2>

      {/*cards */}
      <div className="blood-card-grid">
        {bloodData.map((item) => {
          const status = getStatus(item.units);
          return (
            <div
              key={item.type}
              className={`blood-stock-card ${isDarkMode ? 'dark-card' : ''}`}
            >
              <div className={`text-lg font-semibold ${isDarkMode ? 'dark-text' : ''}`}>
                🩸 {item.type}
              </div>
              <div className={`text-2xl font-bold ${isDarkMode ? 'dark-text' : ''}`}>
                {item.units} Units
              </div>
              <span
                className={`status-${status.toLowerCase()} mt-2 text-sm px-2 py-1 rounded-full w-fit`}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className={`blood-chart-container ${isDarkMode ? 'dark-chart' : ''}`}>
        <h3 className={`blood-chart-title ${isDarkMode ? 'dark-title' : ''}`}>
          Blood Stock Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bloodData}>
            <XAxis
              dataKey="type"
              tick={{ fill: isDarkMode ? '#e5e7eb' : '#374151' }}
            />
            <YAxis
              tick={{ fill: isDarkMode ? '#e5e7eb' : '#374151' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: isDarkMode ? '1px solid #374151' : '1px solid #d1d5db',
                color: isDarkMode ? '#e5e7eb' : '#374151'
              }}
            />
            <Bar dataKey="units">
              {bloodData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    getStatus(entry.units) === "Critical"
                      ? "#EF4444"
                      : getStatus(entry.units) === "Low"
                      ? "#FACC15"
                      : "#10B981"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AvailableBloodStocks;
