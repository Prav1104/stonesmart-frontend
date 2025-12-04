import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">StoneSmart</h2>

      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/slabs">Slabs</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/leads">Leads</Link>
        <Link to="/login">Logout</Link>
      </nav>
    </div>
  );
}
