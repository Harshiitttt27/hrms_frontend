import { Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  return (
    <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-3 shadow-md md:shadow-none">
      <h1 className="text-xl font-bold">HRMS</h1>
      <button className="md:hidden p-2 rounded hover:bg-blue-500 transition" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
    </div>
  );
}
