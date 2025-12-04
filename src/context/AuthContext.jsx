import React, { createContext, useContext, useEffect, useState } from "react"
import api from "../services/api"
import { jwtDecode } from "jwt-decode"


const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // -------------------------
  // Load user from token on refresh
  // -------------------------
useEffect(() => {
  const token = localStorage.getItem("token")

  if (token) {
    try {
      const decoded = jwtDecode(token)
      setUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role || "client",
      })
    } catch (err) {
      console.error("Invalid token:", err)
      localStorage.removeItem("token")
      setUser(null)
    }
  }

  setLoading(false)
}, [])


  // -------------------------
  // LOGIN FUNCTION
  // -------------------------
const login = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    if (!res.data.token) {
      return { success: false, message: "No token returned" };
    }

    const token = res.data.token;
    localStorage.setItem("token", token);

    setUser(res.data.user);

    // IMPORTANT: set loading false immediately
    setLoading(false);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};




  // -------------------------
  // SIGNUP FUNCTION
  // -------------------------
  const signup = async ({ name, email, password, role = "client" }) => {
  try {
    const res = await api.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });

    // if (res.data.token) {
    //   const token = res.data.token;
    //   localStorage.setItem("token", token);

    //   // store user directly from backend
    //   setUser(res.data.user);
    // }

    // return { success: true };

    if (res.data.token) {
  const token = res.data.token;
  localStorage.setItem("token", token);

  // 🔥 Correct user
  setUser(res.data.user);
}

  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Signup failed",
    };
  }
};

  // -------------------------
  // LOGOUT FUNCTION
  // -------------------------
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}



// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
