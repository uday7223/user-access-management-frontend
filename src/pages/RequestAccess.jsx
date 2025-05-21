import { useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const RequestAccess = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [softwareId, setSoftwareId] = useState("");
  const [accessType, setAccessType] = useState("");
  const [reason, setReason] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const res = await API.get("/software");
        setSoftwareList(res.data);
      } catch (err) {
        alert("Failed to fetch software list");
      }
    };
    fetchSoftware();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/requests", { softwareId, accessType, reason });
      alert("Access request submitted!");
      setSoftwareId("");
      setAccessType("");
      setReason("");
    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Failed to request");
    }
  };

  if (auth.role !== "Employee") {
    return <h2>Unauthorized - Only Employees can access this page.</h2>;
  }

  return (
    <div>
      <h2>Request Software Access</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Software:</label>
        <select
          value={softwareId}
          onChange={(e) => setSoftwareId(e.target.value)}
          required
        >
          <option value="">--Select--</option>
          {softwareList.map((sw) => (
            <option key={sw.id} value={sw.id}>
              {sw.name}
            </option>
          ))}
        </select><br />

        <label>Access Type:</label>
        <select
          value={accessType}
          onChange={(e) => setAccessType(e.target.value)}
          required
        >
          <option value="">--Select--</option>
          <option value="Read">Read</option>
          <option value="Write">Write</option>
          <option value="Admin">Admin</option>
        </select><br />

        <textarea
          placeholder="Reason for access"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        /><br />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestAccess;
