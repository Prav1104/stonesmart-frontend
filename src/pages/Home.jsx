import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to StoneSmart</h1>
      <p>Manage your slabs, leads & orders in one smart dashboard.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button style={{
            padding: "10px 18px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#1a73e8",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}>
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button style={{
            padding: "10px 18px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#f5f5f5",
            color: "#333",
            border: "1px solid #ccc",
            cursor: "pointer",
            marginLeft: "12px"
          }}>
            Signup
          </button>
        </Link>
      </div>
    </div>
  )
}
