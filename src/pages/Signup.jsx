import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password,
      });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed: " + err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-indigo-600 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-md shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full my-2 px-4 py-2 rounded-md bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full my-2 px-4 py-2 rounded-md bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-white/20 hover:bg-white/40 text-white py-2 rounded-md transition duration-200 ease-in-out font-semibold backdrop-blur-sm"
          >
            Sign Up
          </button>
          <p className="text-center mt-2" >Already have an account ? <span onClick={() => navigate("/login")} className="cursor-pointer hover:underline">Login</span> </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;
