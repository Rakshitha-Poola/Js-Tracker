import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "678377942873-n22g05drcqins1b7ba1ct7ah8vk69p8q.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleLoginBtn"), {
      theme: "outline",
      size: "large",
      width: 300,
    });
  }, []);

  const handleGoogleResponse = async (response) => {
    setGoogleLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        const decoded = JSON.parse(atob(data.token.split(".")[1]));
        navigate(decoded.role === "admin" ? "/admin" : "/");
      } else {
        setErrorMsg(data.message || "Google login failed");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Try again later");
    }

    setGoogleLoading(false);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("All fields are required");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        const decoded = JSON.parse(atob(data.token.split(".")[1]));
        navigate(decoded.role === "admin" ? "/admin" : "/");
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Left */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <div className="flex items-center space-x-2 mb-8">
            <img
              src="https://res.cloudinary.com/dqxbyu1dj/image/upload/v1757942564/open-book_ksjwiw.png"
              alt="Logo"
              className="w-9 h-9"
            />
            <span className="font-bold text-2xl mt-1">JS-Tracker</span>
          </div>

          <h2 className="text-3xl font-bold mb-6">Welcome Back 🚀</h2>

          {/* Google Login */}
          <div id="googleLoginBtn" className="w-full mb-6 flex justify-center"></div>

          {googleLoading && (
            <p className="text-blue-600 text-center mb-4">Signing in with Google...</p>
          )}

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR LOGIN WITH EMAIL</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Email Address"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Password"
            />
          </div>

          {/* Error */}
          {errorMsg && (
            <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
          )}

          {/* Login Button */}
          <button
            disabled={loading}
            onClick={handleLogin}
            className={`w-full text-white py-2 rounded-lg mt-3 transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Register Link */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-start p-8 md:p-10">
          <h3 className="font-semibold mb-2">JS-Tracker Academy</h3>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Build consistency in JavaScript & Data Structures 💻🔥
          </p>

          <button className="border border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 mb-6">
            START LEARNING
          </button>

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
