import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import "./GlobalLoading.css";

export default function GlobalLoading() {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
