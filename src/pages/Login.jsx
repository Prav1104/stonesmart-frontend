// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/api";
// import "../styles/auth.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       toast.success("Login successful 🎉");
//       setTimeout(() => navigate("/dashboard"), 800);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed ❌");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p className="switch-link">
//           Don’t have an account? <a href="/signup">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // ✅ for redirect

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful 🎉");

        // ✅ Redirect after a short delay so toast appears
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error("No token received from server ❌");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="switch-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
