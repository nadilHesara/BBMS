import React, { useEffect, useState, useContext, use } from "react";
import districts from "../../SharedData/districts";
import { LoadingContext } from "../../context/LoadingContext";
import { toast } from "react-toastify";
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
import verifyAccess from "../../SharedData/verifyFunction";



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



function AvailableBloodStocks({ theme }) {

  // ✅ Use the hook properly
  const verified = verifyAccess("availableBloodStock");
  const { loading, setLoading } = useContext(LoadingContext);
  const HandleBlood = (item, blood) => {

    if (blood[typeMap[item.type]] == null) {
      return 0
    }
    return parseFloat(blood[typeMap[item.type]])
  }

  const getStatus = (units) => {
    if (units < 10) return "Critical";
    if (units < 30) return "Low";
    return "Sufficient";
  };

  const [bloodData, setBloodData] = useState([
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBlood, setNewBlood] = useState({
    bloodType: "A+",
    units: 0,
    campaignId: null,
    notes: "",
  });
  const [Campaigns, setCampaigns] = useState([]);


  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleHospital = (e) => {
    setHospital(e.target.value);
  };

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => {
    setShowAddModal(false);
    setNewBlood({
      bloodType: "",
      units: "",
      campaignId: "",
      notes: "",
    });
  };
  const handleNewBloodChange = (e) => {
    const { name, value } = e.target;
    setNewBlood(prev => ({
      ...prev,
      [name]: name === "units" ? parseInt(value, 10) : value
    }));
  };

  useEffect(() => {
    try {
      setLoading(true);
      const userId = sessionStorage.getItem("userId");
      fetch(`http://localhost:9191/dashboard/addBloodCampaigns?hospital=${userId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Fetch failed");
          return res.json();
        })
        .then((data) => {
          setCampaigns(data || []);
        });
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  }, [showAddModal, hospital]);

  const handleAddBloodSubmit = async (e, actionType) => {
    e.preventDefault();

    let dataToSend = { ...newBlood };
    if (actionType === "remove") {
      dataToSend.units = dataToSend.units * -1;
    }

    console.log(dataToSend);

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9191/dashboard/addBlood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Registration failed. Check server and data.");
      } else {
        toast.success("Blood package added successfully!");
        closeAddModal();
        setHospital("All");
      }
    } catch (error) {
      toast.error("Failed to add the package. Check server and data.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    try {
      setLoading(true);
      fetch(
        `http://localhost:9191/dashboard/bloodStock?district=${district}&hospital=${hospital}`, {

          method: "GET",
          credentials: "include", // <-- This tells fetch to send cookies
          headers: {
            "Content-Type": "application/json",
        },
      }
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
            units: HandleBlood(item, data.blood)
          }));
          setBloodData(updatedData);
        })
        .catch((err) => {
          toast.error("Server");
          setError("Failed to load hospitals data.");
        });
    } catch (error) {
      setError("Server Error")
    } finally {
      setLoading(false);
    }
  }, [district, hospital, showAddModal]);


  return (

    <>
      <div className={`blood-stock-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="page-header-row">
          <h2 className={`page-header ${isDarkMode ? 'dark-title' : ''}`}>Available Blood Stocks</h2>
          <button className="add-blood-btn" onClick={openAddModal}>Add or Remove Blood</button>
        </div>

        <div className="header-controls">
          <div className="district-control">
            <label className={isDarkMode ? 'dark-label' : ''}>District:</label>
            <select className={`district-select ${isDarkMode ? 'dark-select' : ''}`} name="District" onChange={(e) => handleDistrict(e)} required>
              <option value="All">Overall</option>
              {districts.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <label className={isDarkMode ? 'dark-label' : ''}>Hospitals:</label>
            <select className={`district-select ${isDarkMode ? 'dark-select' : ''}`} name="Hospitals" onChange={handleHospital} required>
              <option value="All"> All </option>
              {hospitals.map((d, i) => (
                <option key={i} value={d.HospitalID}>
                  {d.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="selects">
            {error && <p >{error}</p>}
            <div></div>
          </div>
        </div>




        {/*cards */}
        <div className="blood-card-grid">
          {bloodData.map((item) => {
            const status = getStatus(item.units);
            return (
              <div
                key={item.type}
                className={`blood-stock-card ${isDarkMode ? 'dark-card' : ''}`}
              >
                <div className={`text-lg font-semibold ${isDarkMode ? 'dark-text' : ''}`}>🩸 {item.type}</div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'dark-text' : ''}`}>{item.units} Units</div>
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
          <h3 className={`blood-chart-title ${isDarkMode ? 'dark-title' : ''}`}>Blood Stock Chart</h3>
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

        {showAddModal && (
          <div className="modal-overlay" onClick={closeAddModal}>
            <div className="add-blood-container">
              <div className={`modal-content ${isDarkMode ? 'dark-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Add or Remove Blood</h3>
                  <button className="modal-close-btn" onClick={closeAddModal}>×</button>
                </div>

                <form className="modal-form" onSubmit={handleAddBloodSubmit}>
                  <div className="form-row">
                    <label>Blood Type</label>
                    <select name="bloodType" onChange={handleNewBloodChange} required>
                      <option value="">Select</option>
                      {Object.keys(typeMap).map((t) => (
                        <option key={t} value={typeMap[t]}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <label>Units</label>
                    <input type="number" min={0} name="units" onChange={handleNewBloodChange} required />
                  </div>

                  <div className="form-row">
                    <label>Campaign</label>
                    <select name="campaignId" onChange={handleNewBloodChange}>
                      <option value={null}>Select</option>
                      {Campaigns.map((d, i) => (
                        <option key={i} value={d.CampaignID}>{d.CampaignName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <label>Notes</label>
                    <textarea name="notes" rows="3" onChange={handleNewBloodChange} placeholder="Optional"></textarea>
                  </div>



                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={closeAddModal}>Cancel</button>
                    <button type="submit" className="btn-primary add" onClick={(e) => handleAddBloodSubmit(e, "add")}>Add</button>
                    <button type="submit" className="btn-primary remove" onClick={(e) => handleAddBloodSubmit(e, "remove")}>Remove</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        )}



      </div >
    </>
  );
}
export default AvailableBloodStocks;
