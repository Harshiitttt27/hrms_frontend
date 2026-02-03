import { Users, CalendarCheck, LayoutDashboard, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const links = [
    { name: "Dashboard", to: "/", icon: <LayoutDashboard /> },
    { name: "Employees", to: "/employees", icon: <Users /> },
    { name: "Attendance", to: "/attendance", icon: <CalendarCheck /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:shadow-none`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b md:hidden">
          <h2 className="text-lg font-bold">HRMS</h2>
          <button onClick={toggleSidebar} className="p-1 rounded hover:bg-gray-200 transition">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-2 px-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => isOpen && toggleSidebar()} // close sidebar on mobile after click
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                ${
                  location.pathname === link.to
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
