import { useState } from "react";
import api from "../api/axios";

export default function Attendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  // Helper to get today's date in YYYY-MM-DD format
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Fetch attendance history for the employee
  const fetchHistory = async () => {
    if (!employeeId) {
      alert("Please enter Employee ID");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.get(`attendance/${employeeId}/`);
      setHistory(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch history. Check Employee ID."
      );
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  // Mark Present or Absent
  const markAttendance = async (status) => {
    if (!employeeId) {
      alert("Please enter Employee ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send POST request to backend
      await api.post("attendance/", {
        employee_id: employeeId,
        status,
        date: getTodayDate(),
      });

      alert(`Marked ${status} successfully`);
      // Fetch updated attendance history
      await fetchHistory();
      setEmployeeId(""); // reset input
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to mark attendance. Check Employee ID."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Employee Attendance</h2>

      {/* Input & Buttons */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 flex-col sm:flex-row mb-4">
          <button
            disabled={loading}
            onClick={() => markAttendance("PRESENT")}
            className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-1/3 disabled:opacity-50 hover:bg-green-700 transition"
          >
            Present
          </button>

          <button
            disabled={loading}
            onClick={() => markAttendance("ABSENT")}
            className="bg-red-600 text-white px-4 py-2 rounded w-full sm:w-1/3 disabled:opacity-50 hover:bg-red-700 transition"
          >
            Absent
          </button>

          <button
            disabled={loading}
            onClick={fetchHistory}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-1/3 disabled:opacity-50 hover:bg-blue-700 transition"
          >
            Fetch History
          </button>
        </div>

        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* Attendance History */}
      {history.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Attendance History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b px-3 py-2">Date</th>
                  <th className="border-b px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="border-b px-3 py-2">{record.date}</td>
                    <td
                      className={`border-b px-3 py-2 font-medium ${
                        record.status === "PRESENT"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {history.length === 0 && !error && (
        <p className="text-gray-500 text-center mt-4">No attendance records to display</p>
      )}
    </div>
  );
}
