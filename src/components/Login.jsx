import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "372126662453-1utbq39iurlogsc82as93vqc334g522l.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleLoginBtn"), {
      theme: "outline",
      size: "large",
      width: 300,
    });
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        const decoded = JSON.parse(atob(data.token.split(".")[1]));
        if (decoded.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setErrorMsg(data.message || "Google login failed");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Try again later", error);
    }
  };

  const handleLogin = async () => {
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
        if (decoded.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <img
              src="https://res.cloudinary.com/dqxbyu1dj/image/upload/v1757942564/open-book_ksjwiw.png"
              alt="Logo"
              className="w-9 h-9"
            />
            <span className="font-bold text-2xl mt-1">JS-Tracker</span>
          </div>

          <h2 className="text-3xl font-bold mb-6">Welcome Back 🚀</h2>

          {/* Google login button */}
          <div id="googleLoginBtn" className="w-full mb-6 flex justify-center"></div>

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

          

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
          )}

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 mt-3"
          >
            Log In
          </button>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-600 hover:underline">
              Sign up
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
