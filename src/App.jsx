import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/RequireAuth.jsx";
import RedirectIfAuth from "./components/RedirectIfAuth.jsx";


import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/signup.jsx";   // lowercase file
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Slabs from "./pages/Dashboard/Slabs.jsx";
import Orders from "./pages/Orders.jsx"
import Leads from "./pages/Leads.jsx";


export default function App() {
  return (
    <Routes>


      {/* Public Pages */}
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />

      <Route
        path="/signup"
        element={
          <RedirectIfAuth>
            <Signup />
          </RedirectIfAuth>
        }
      />

      {/* Protected Pages */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/slabs"
        element={
          <RequireAuth>
            <Slabs />
          </RequireAuth>
        }
      />


      <Route
        path="/orders"
        element={
          <RequireAuth>
            <Orders />
          </RequireAuth>
        }
      />

      <Route
        path="/leads"
        element={
          <RequireAuth>
            <Leads />
          </RequireAuth>
        }
      />



    </Routes>
  );
}
