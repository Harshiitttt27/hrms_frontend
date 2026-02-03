import { useEffect, useState } from "react";
import api from "../api/axios";
import EmployeeCard from "../components/EmployeeCard";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("employees/");
      setEmployees(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`employees/${id}/`);
      setEmployees(employees.filter((e) => e.employee_id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("employees/", newEmployee);
      setEmployees([res.data.data, ...employees]);
      setShowModal(false);
      setNewEmployee({ employee_id: "", full_name: "", email: "", department: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to create employee. Please check your inputs.");
    }
  };

  if (loading) return <div className="p-6 text-gray-600 text-center">Loading employees...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create Employee
        </button>
      </div>

      {/* Empty State */}
      {employees.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No employees found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <EmployeeCard
              key={emp.employee_id}
              employee={emp}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Create Employee</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <input
                type="text"
                name="employee_id"
                placeholder="Employee ID"
                value={newEmployee.employee_id}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={newEmployee.full_name}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={newEmployee.department}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
