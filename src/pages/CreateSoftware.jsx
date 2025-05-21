import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateSoftware = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevels, setAccessLevels] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setAccessLevels((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/software", { name, description, accessLevels });
      alert("Software created successfully");
      setName("");
      setDescription("");
      setAccessLevels([]);
    } catch (err) {
      alert("Failed to create software: " + err.response?.data?.message || "Error");
    }
  };

  if (auth.role !== "Admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 text-white">
        <h2 className="text-xl font-semibold">⛔ Access Denied: Admins only</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-700 px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-lg shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create New Software</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Software Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 h-28 rounded-md bg-white/20 placeholder-white text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <div className="flex gap-4 flex-wrap">
            {["Read", "Write", "Admin"].map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={level}
                  checked={accessLevels.includes(level)}
                  onChange={handleCheckboxChange}
                  className="accent-white"
                />
                <span>{level}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/40 text-white py-2 rounded-md font-semibold transition backdrop-blur-sm"
          >
            Create Software
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSoftware;
