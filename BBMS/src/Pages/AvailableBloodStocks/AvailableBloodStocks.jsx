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


const typeMap = {
  "A+": "A_plus",
  "B+": "B_plus",
  "AB+": "AB_plus",
  "O+": "O_plus",
  "A-": "A_minus",
  "B-": "B_minus",
  "AB-": "AB_minus",
  "O-": "O_minus",
};

const statusColor = {
  Critical: "bg-red-500",
  Low: "bg-yellow-400",
  Sufficient: "bg-green-500",
};



function AvailableBloodStocks() {
  
  const HandleBlood = (item , blood) => {

    if (blood[typeMap[item.type]] == null){
      return 0
    }
    return parseFloat(blood[typeMap[item.type]])
  }

  const getStatus = (units) => {
    if (units < 10) return "Critical";
    if (units < 30) return "Low";
    return "Sufficient";
  };

  const [bloodData,setBloodData] = useState([
  { type: "A+", units: 0 },
  { type: "B+", units: 0 },
  { type: "AB+", units: 0 },
  { type: "O+", units: 0 },
  { type: "A-", units: 0 },
  { type: "B-", units: 0 },
  { type: "AB-", units: 0 },
  { type: "O-", units: 0 },
])

  const [hospitals, setHospitals] = useState([]);
  const [district, setDistrict] = useState("All");
  const [error, setError] = useState(null);
  const [hospital, setHospital] = useState("All");

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

    const handleHospital = (e) => {
      setHospital(e.target.value);
  };

  useEffect(() => {
    fetch(
      `http://localhost:9191/dashboard/bloodStock?district=${district}&hospital=${hospital}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {      
        setHospitals(data.hospitals || []);
        setHospital("All")
        
        const updatedData = bloodData.map(item => ({
          ...item,
          units: HandleBlood(item,data.blood)
        }));

        setBloodData(updatedData);
      })
      .catch((err) => {
        console.error("Error fetching hospital data:", err.message);
        setError("Failed to load hospitals data.");
      });
  }, [district,hospital]);


  return (
    <div className="p-6">
      <div className="selects">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>District:</label>
      <select name="District" onChange={(e) => handleDistrict(e)} required>
        <option value="All">Overall</option>
        {districts.map((d, i) => (
          <option key={i} value={d}>
            {d}
          </option>
        ))}
      </select>

      <label>Hospitals:</label>
      <select name="Hospitals" onChange={handleHospital} required>
        <option value="All"> All </option>
        {hospitals.map((d, i) => (
          <option key={i} value={d.HospitalID}>
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
