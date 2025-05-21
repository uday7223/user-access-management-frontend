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
      fetchRequests(); // Refresh list
    } catch (err) {
      alert("Action failed");
    }
  };

  if (auth.role !== "Manager") {
    return <h2>Unauthorized - Only Managers can access this page.</h2>;
  }

  return (
    <div>
      <h2>Pending Access Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>User</th>
              <th>Software</th>
              <th>Access Type</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.user.username}</td>
                <td>{req.software.name}</td>
                <td>{req.accessType}</td>
                <td>{req.reason}</td>
                <td>{req.status}</td>
                <td>
                  <button onClick={() => handleAction(req.id, "Approved")}>
                    Approve
                  </button>
                  <button onClick={() => handleAction(req.id, "Rejected")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequests;
