import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      login(res.data.token, res.data.role);

      if (res.data.role === "Admin") navigate("/create-software");
      else if (res.data.role === "Employee") navigate("/request-access");
      else if (res.data.role === "Manager") navigate("/pending-requests");
    } catch (err) {
      alert("Login failed: " + err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-md shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/40 text-white py-2 rounded-md transition duration-200 ease-in-out font-semibold backdrop-blur-sm"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
