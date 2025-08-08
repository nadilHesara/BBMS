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



const statusColor = {
  Critical: "bg-red-500",
  Low: "bg-yellow-400",
  Sufficient: "bg-green-500",
};



function AvailableBloodStocks() {
  
  const getStatus = (units) => {
    if (units < 10) return "Critical";
    if (units < 30) return "Low";
    return "Sufficient";
  };
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const [hospitals, setHospitals] = useState([]);
  const [district, setDistrict] = useState("All");
  const [error, setError] = useState(null);

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  useEffect(() => {
    fetch(
      `http://localhost:9191/dashboard/bloodStock?district=${district}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setHospitals(data.hospitals || []);
      })
      .catch((err) => {
        console.error("Error fetching hospital data:", err.message);
        setError("Failed to load hospitals data.");
      });
  }, [district]);


  return (
    <div className="p-6">
      <div className="selects">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>District:</label>
      <select name="District" onChange={handleDistrict} required>
        <option value="All">Overall</option>
        {districts.map((d, i) => (
          <option key={i} value={d}>
            {d}
          </option>
        ))}
      </select>

      <label>Hospitals:</label>
      <select name="Hospitals" required>
        <option value=""> All </option>
        {hospitals.map((d, i) => (
          <option key={i} value={d.Name}>
            {d.Name}
          </option>
        ))}
      </select>
      </div>

      <h2 className="text-2xl font-bold mb-4">Available Blood Stocks</h2>

      {/*cards */}
      <div className="blood-card-grid">
        {bloodData.map((item) => {
          const status = getStatus(item.units);
          return (
            <div
              key={item.type}
              className="blood-stock-card"
            >
              <div className="text-lg font-semibold">🩸 {item.type}</div>
              <div className="text-2xl font-bold">{item.units} Units</div>
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
<div className="blood-chart-container">
  <h3 className="blood-chart-title">Blood Stock Chart</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={bloodData}>
      <XAxis dataKey="type" />
      <YAxis />
      <Tooltip />
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
