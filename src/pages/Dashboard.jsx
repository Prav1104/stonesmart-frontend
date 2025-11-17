import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";


export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">StoneSmart Dashboard</h1>
        <p className="dashboard-subtitle">You’re successfully logged in 🎉</p>

        <div className="dashboard-actions">
          <button className="dashboard-btn primary"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>

          <button className="dashboard-btn"
            onClick={() => navigate("/products")}
          >
            Manage Products
          </button>

          <button className="dashboard-btn"
            onClick={() => navigate("/add-product")}
          >
            Add New Product
          </button>

          <button className="dashboard-btn danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
