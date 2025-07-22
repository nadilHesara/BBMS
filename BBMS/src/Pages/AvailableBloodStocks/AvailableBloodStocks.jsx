import React from "react";
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

function AvailableBloodStocks() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Blood Stocks</h2>

      {/*cards */}
      <div className="blood-card-grid">
        {bloodData.map((item) => {
          const status = getStatus(item.units);
          return (
            <div
              key={item.type}
              className="bg-white shadow rounded-xl p-4 flex flex-col justify-between"
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
