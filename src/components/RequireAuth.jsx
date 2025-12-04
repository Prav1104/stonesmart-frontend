import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  // 👉 Loading means: AuthContext is still initializing or setting user
  if (loading) {
    return <div>Loading...</div>;
  }

  // 👉 After login, user will be set BEFORE RequireAuth runs
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
