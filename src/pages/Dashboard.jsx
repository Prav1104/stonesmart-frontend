import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

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
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome to StoneSmart Dashboard 👋</h2>
        <p>You are successfully logged in!</p>
        <button onClick={handleLogout} style={{ marginTop: "20px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}
