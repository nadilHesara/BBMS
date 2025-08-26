import { useContext, useEffect } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import "./GlobalLoading.css";

export default function GlobalLoading() {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);
  

  useEffect(() => {
    if (!loading) return; // run effect only when loading is true

    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/login"); 
      
    }, 5000);

    return () => clearTimeout(timer); // cleanup if unmounted
  }, [loading, navigate]);

  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
