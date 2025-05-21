import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const { auth } = useAuth();

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");
      setRequests(res.data);
    } catch (err) {
      alert("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await API.patch(`/requests/${id}`, { status });
      alert(`Request ${status}`);
      fetchRequests(); // Refresh
    } catch (err) {
      alert("Action failed");
    }
  };

  if (auth.role !== "Manager") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-500 to-pink-600 text-white">
        <h2 className="text-xl font-semibold">⛔ Access Denied: Managers only</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-600 to-blue-800 p-4 flex flex-col items-center justify-start text-white">
      <h2 className="text-3xl font-bold my-6 text-center">Pending Access Requests</h2>

      <div className="w-full max-w-5xl overflow-x-auto bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
        {requests.length === 0 ? (
          <p className="text-center text-white/80">No pending requests 🎉</p>
        ) : (
          <table className="w-full table-auto text-sm sm:text-base">
            <thead>
              <tr className="text-left text-white/90 border-b border-white/20">
                <th className="py-2">User</th>
                <th>Software</th>
                <th>Access</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-white/10">
                  <td className="py-2">{req.user.username}</td>
                  <td>{req.software.name}</td>
                  <td>{req.accessType}</td>
                  <td>{req.reason}</td>
                  <td>{req.status}</td>
                  <td className="flex gap-2 justify-center mt-2">
                    <button
                      onClick={() => handleAction(req.id, "Approved")}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white text-sm transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "Rejected")}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;
