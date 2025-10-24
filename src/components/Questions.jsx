import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  Layers,
  Box,
  Code,
  Shuffle,
  Bookmark,
  Star,
  Menu,
  X,
} from "lucide-react";

const topicIcons = {
  Array: <Layers size={28} />,
  Matrix: <Box size={28} />,
  String: <Code size={28} />,
  "Searching & Sorting": <Shuffle size={28} />,
};

const colorPalette = [
  { bg: "bg-green-100 text-green-600", bar: "from-green-400 to-green-600" },
  { bg: "bg-blue-100 text-blue-600", bar: "from-blue-400 to-blue-600" },
  { bg: "bg-purple-100 text-purple-600", bar: "from-purple-400 to-purple-600" },
  { bg: "bg-pink-100 text-pink-600", bar: "from-pink-400 to-pink-600" },
  { bg: "bg-yellow-100 text-yellow-600", bar: "from-yellow-400 to-yellow-600" },
  { bg: "bg-indigo-100 text-indigo-600", bar: "from-indigo-400 to-indigo-600" },
];

const Questions = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const token = localStorage.getItem("token");
  console.log(`API URL ${import.meta.env.VITE_API_URL}`)

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // Fetch topics and progress in parallel
        const [topicsRes, progressRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/topic/get-allTopics`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/topic/each-topic/progress`, { headers }),
        ]);

        const topicsData = await topicsRes.json();
        const progressData = await progressRes.json();
        // Merge progress into topics immediately
        const mergedTopics = (topicsData.topics || []).map((topic) => {
          const tProg = (progressData.progress || []).find(
            (p) => p.topicName === topic.topicName
          );

          return {
            ...topic,
            totalQuestions: topic.questions.length,
            completed: tProg?.completed || 0,
            percentCompleted: tProg?.percentCompleted || 0,
          };
        });

        setTopics(mergedTopics);
      } catch (err) {
        console.error(err);
        setErrorMsg("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen font-poppins">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-2 md:px-20 py-4 relative">
        <Link
          to="/"
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="https://res.cloudinary.com/dqxbyu1dj/image/upload/v1757942564/open-book_ksjwiw.png"
            alt="Logo"
            className="w-12 h-12 animate-bounce"
          />
          <h1 className="text-3xl text-gray-800 font-extrabold tracking-wide animate-pulse">
            Js-Tracker
          </h1>
        </Link>

        <div className="hidden md:flex gap-6 items-center text-black font-medium text-lg">
          <Link to="/questions" className="hover:underline transition">Questions</Link>
          <Link to="/progress" className="hover:underline transition">Progress</Link>
          <button
            onClick={() => navigate("/bookmarks")}
            className="flex items-center gap-2 bg-yellow-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-yellow-500 transition"
          >
            <Bookmark size={18} />
            Bookmarks
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full right-6 mt-2 w-44 bg-white shadow-lg rounded-xl flex flex-col z-50">
            <Link to="/questions" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-100 rounded-lg">Questions</Link>
            <Link to="/progress" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-100 rounded-lg">Progress</Link>
            <button
              onClick={() => { setMenuOpen(false); navigate("/bookmarks"); }}
              className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              <Bookmark size={18} />
              Bookmarks
            </button>
          </div>
        )}
      </nav>

      {/* Header */}
      <div className="pt-25 text-center relative px-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Track Your <span className="text-green-600">Progress</span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Click any topic below to view all its questions 🚀
        </p>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {!loading && errorMsg && (
        <div className="text-center text-red-600 font-medium py-10">{errorMsg}</div>
      )}

      {/* Empty State */}
      {!loading && !errorMsg && topics.length === 0 && (
        <div className="text-center text-gray-600 font-medium py-10">
          No topics available yet 📭
        </div>
      )}

      {/* Topics Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-8 py-16">
        {!loading && !errorMsg && topics.map((topic, index) => {
          const total = topic.totalQuestions;
          const solved = topic.completed;
          const percent = topic.percentCompleted;
          const colors = colorPalette[index % colorPalette.length];

          return (
            <motion.div
              key={topic._id || index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
              onClick={() => navigate(`/get-topic/${encodeURIComponent(topic.topicName)}`)}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${colors.bg}`}>
                {topicIcons[topic.topicName] || <Code size={28} />}
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold mb-1 text-gray-800">{topic.topicName}</h2>
              <p className="text-sm text-gray-500 mb-4">{total} Questions</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1.2 }}
                  className={`h-3 rounded-full bg-gradient-to-r ${colors.bar}`}
                />
              </div>

              {/* Status */}
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-gray-700">{solved}/{total}</span>
                {solved === 0 ? (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>
                ) : solved < total ? (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    <Star size={14} className="text-green-500" /> Started
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Completed</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
