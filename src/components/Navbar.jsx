import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderLinks = () => {

  switch (auth.role) {
    case "Admin":
      return (
        <>
          <span className="text-white">Welcome, Admin 👋 {auth.username.toUpperCase()}</span>
          
          <Link to="/create-software" className="text-white hover:text-white transition">
            Create Software
          </Link>
        </>
      );
    case "Employee":
      return (
        <>
          <span className="text-white">Welcome👋  {auth.username.toUpperCase()}</span>
          <Link to="/request-access" className="text-white hover:text-white transition">
            REQUEST ACCESS
          </Link>
        </>
      );
    case "Manager":
      return (
        <>
          <span className="text-white">Welcome👋 {auth.username.toUpperCase()}</span>
          <Link to="/pending-requests" className="text-white hover:text-white transition">
            Pending Requests
          </Link>
        </>
      );
    default:
      return null;
  }
};

  if (!auth.token) return null;

  return (
   <div className="navbar-container">
     <nav className="bg-white/10 backdrop-blur-md bg-black shadow-md border-b border-white/20 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold tracking-wide">Access Manager</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center ">
            {renderLinks()}
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 px-2 text-sm text-white">
          {renderLinks()}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-3 py-2 rounded bg-red-500 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
   </div>
  );
};

export default Navbar;
