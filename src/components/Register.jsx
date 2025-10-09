import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);

    try {
      const userDetails = { name, email, password };

      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token)
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error in Register:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left side - Register form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 rounded-md">
              <img
                src="https://res.cloudinary.com/dqxbyu1dj/image/upload/v1757942564/open-book_ksjwiw.png"
                alt="Logo"
                className="w-9 h-9"
              />
            </div>
            <span className="font-bold text-2xl mt-1">JS-Tracker</span>
          </div>

          <h2 className="text-3xl font-bold mb-6">Create Account ✨</h2>

          <form onSubmit={handleRegister}>
            {/* Name */}
            <div className="mb-4">
              <label className="text-gray-600 text-sm">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-gray-600 text-sm">Email Address</label>
              <input
                type="email"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-gray-600 text-sm">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Register button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Right side - Info */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-start p-8 md:p-10">
          <h3 className="font-semibold mb-2">JS-Tracker Academy</h3>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Track your JavaScript & DSA progress, bookmark questions, take notes,
            and measure your growth step by step. Let’s build consistency together 💻🔥
          </p>
          <button className="border border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 mb-6">
            START LEARNING
          </button>

          {/* Illustration */}
          <img
            src="https://html.designingmedia.com/eginary/assets/images/advance-career-img.png"
            alt="Illustration"
            className="w-64 md:w-72 lg:w-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
