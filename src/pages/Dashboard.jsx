import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa"; // Icons for cards

export default function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [absentToday, setAbsentToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
        const empRes = await api.get("employees/");
        const employees = empRes.data.data || [];
        setTotalEmployees(empRes.data.count || employees.length);

        const today = new Date().toISOString().split("T")[0];
        let presentCount = 0;
        let absentCount = 0;

        await Promise.all(
          employees.map(async (emp) => {
            const attRes = await api.get(`attendance/${emp.employee_id}/`);
            const records = attRes.data.data || [];
            const todayRecord = records.find((r) => r.date === today);

            if (todayRecord) {
              if (todayRecord.status === "PRESENT") presentCount += 1;
              else if (todayRecord.status === "ABSENT") absentCount += 1;
            }
          })
        );

        setPresentToday(presentCount);
        setAbsentToday(absentCount);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <p className="p-6 text-center text-gray-600 animate-pulse">
        Loading dashboard...
      </p>
    );
  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">{error}</p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        HRMS Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Employees */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 transform transition hover:scale-105">
          <div className="p-4 bg-blue-100 rounded-full">
            <FaUsers className="text-blue-600 w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Total Employees</p>
            <p className="text-3xl font-bold text-gray-800">{totalEmployees}</p>
          </div>
        </div>

        {/* Present Today */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 transform transition hover:scale-105">
          <div className="p-4 bg-green-100 rounded-full">
            <FaUserCheck className="text-green-600 w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Present Today</p>
            <p className="text-3xl font-bold text-green-600">{presentToday}</p>
          </div>
        </div>

        {/* Absent Today */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 transform transition hover:scale-105">
          <div className="p-4 bg-red-100 rounded-full">
            <FaUserTimes className="text-red-600 w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Absent Today</p>
            <p className="text-3xl font-bold text-red-600">{absentToday}</p>
          </div>
        </div>
      </div>

      {/* Optional: Quick Stats / Charts Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Quick Overview
        </h3>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <p className="text-gray-600">
            Total employees are automatically fetched from the system. The
            present and absent counts reflect today's attendance.
          </p>
        </div>
      </div>
    </div>
  );
}
