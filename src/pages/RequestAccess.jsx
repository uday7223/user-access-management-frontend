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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500 text-white">
        <h2 className="text-xl font-semibold">⛔ Access Denied: Employees only</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-700 px-4 request-access-page">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-lg shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Request Software Access</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <select
            value={softwareId}
            onChange={(e) => setSoftwareId(e.target.value)}
            required
            className="w-full my-2 px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="">Select Software</option>
            {softwareList.map((sw) => (
              <option key={sw.id} value={sw.id}>
                {sw.name}
              </option>
            ))}
          </select>

          <select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
            required
            className="w-full my-2 px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option className="w-full"  value="">Select Access Type</option>
            <option value="Read">Read</option>
            <option value="Write">Write</option>
            <option value="Admin">Admin</option>
          </select>

          <textarea
            placeholder="Reason for access"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full my-2 px-4 py-2 h-24 rounded-md bg-white/20 text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <button
            type="submit"
            className="w-full mt-3 bg-white/20 hover:bg-white/40 text-white py-2 rounded-md font-semibold transition backdrop-blur-sm"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestAccess;
