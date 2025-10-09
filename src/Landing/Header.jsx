import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect to login
  };

  return (
    <div>
      {/* Logo */}
      <div className="absolute top-8 md:left-0 left-3 flex items-center space-x-3 md:ml-20">
        <Link to="/" className="flex">
          <img
            src="https://res.cloudinary.com/dqxbyu1dj/image/upload/v1757942564/open-book_ksjwiw.png"
            alt="Logo"
            className="w-12 h-12 animate-bounce"
          />
          <h1 className="text-3xl ml-3 text-gray-800 font-['Poppins'] tracking-wide animate-pulse">
            Js-Tracker
          </h1>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="absolute top-8 right-10 hidden md:flex gap-8 text-2xl text-white font-poppins font-medium mr-20">
        <Link to="/questions" className="hover:underline transition">
          Questions
        </Link>
        <Link to="/progress" className="hover:underline transition">
          Progress
        </Link>

        {/* Stylish Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2  text-white-800  hover:underline transition"
        >
          <LogOut size={28} className="pt-1"/>
          Logout
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="absolute top-8 right-6 md:hidden text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 right-6 flex flex-col bg-white shadow-lg rounded-lg p-4 gap-4 text-lg font-medium z-50 md:hidden">
          <Link
            to="/questions"
            className="hover:text-green-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Questions
          </Link>
          <Link
            to="/progress"
            className="hover:text-green-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Progress
          </Link>

          {/* Mobile Logout */}
          <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
        </div>
      )}
    </div>
  );
};

export default Header;
