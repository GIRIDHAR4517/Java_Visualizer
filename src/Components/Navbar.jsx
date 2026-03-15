import { NavLink, useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 flex items-center justify-between px-6 shadow-lg">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
          <Code2 size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Java Code Visualizer
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
              isActive
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-300 hover:text-emerald-400"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/editor"
          className={({ isActive }) =>
            `text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
              isActive
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-300 hover:text-emerald-400"
            }`
          }
        >
          Editor
        </NavLink>
        {!isLoggedIn ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-emerald-500 hover:text-white"
              }`
            }
          >
            Login
          </NavLink>
        ) : (
          <button
            className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-slate-700 text-slate-300bg-red-600 hover:bg-red-700 hover:text-white cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}
