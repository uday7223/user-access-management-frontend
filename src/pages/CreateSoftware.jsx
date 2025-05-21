import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateSoftware = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevels, setAccessLevels] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();

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
      alert("Failed to create software: " + err.response.data.message);
    }
  };

  if (auth.role !== "Admin") {
    return <h2>Unauthorized - Only Admin can access this page.</h2>;
  }

  return (
    <div>
      <h2>Create Software</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Software Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br />
        <label>
          <input
            type="checkbox"
            value="Read"
            onChange={handleCheckboxChange}
            checked={accessLevels.includes("Read")}
          /> Read
        </label>
        <label>
          <input
            type="checkbox"
            value="Write"
            onChange={handleCheckboxChange}
            checked={accessLevels.includes("Write")}
          /> Write
        </label>
        <label>
          <input
            type="checkbox"
            value="Admin"
            onChange={handleCheckboxChange}
            checked={accessLevels.includes("Admin")}
          /> Admin
        </label><br />
        <button type="submit">Create Software</button>
      </form>
    </div>
  );
};

export default CreateSoftware;
