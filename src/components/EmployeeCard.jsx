export default function EmployeeCard({ employee, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {employee.full_name}
        </h3>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {employee.department}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Employee ID:</span>{" "}
          {employee.employee_id}
        </p>

        <p>
          <span className="font-medium text-gray-700">Email:</span>{" "}
          {employee.email}
        </p>

        <p>
          <span className="font-medium text-gray-700">Joined:</span>{" "}
          {employee.created_at}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => onDelete(employee.employee_id)}
          className="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
