import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("topics")) || [];
    const allBookmarks = [];
    const topicNames = new Set();

    saved.forEach((topic) => {
      topic.questions.forEach((q, idx) => {
        if (q.Bookmark) {
          allBookmarks.push({
            ...q,
            topicName: topic.topicName,
            index: idx,
          });
          topicNames.add(topic.topicName);
        }
      });
    });

    setBookmarks(allBookmarks);
    setTopics(["All", ...Array.from(topicNames)]);
  }, []);

  const toggleDone = (idx) => {
    setBookmarks((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, Done: !q.Done } : q))
    );
  };

  const filteredBookmarks =
    selectedTopic === "All"
      ? bookmarks
      : bookmarks.filter((q) => q.topicName === selectedTopic);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen font-poppins">
      <nav className="w-full flex justify-between items-center md:px-6 md:px-20 py-6 px-2 relative">
        {/* Logo */}
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

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center text-black font-medium text-lg">
          <Link to="/questions" className="hover:underline transition">
            Questions
          </Link>
          <Link to="/progress" className="hover:underline transition">
            Progress
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full right-6 mt-2 w-40 bg-white shadow-lg rounded-xl flex flex-col z-50">
            <Link
              to="/questions"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              Questions
            </Link>
            <Link
              to="/progress"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 hover:bg-gray-100 rounded-lg"
            >
              Progress
            </Link>
          </div>
        )}
      </nav>

      <div className="px-6 md:px-20 py-12 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
        <h1 className="text-3xl font-extrabold text-center md:text-left">
          📌 Bookmarked <span className="text-green-600">Questions</span>
        </h1>

        
        <div className="flex justify-center md:justify-end">
          <div className="relative w-auto md:w-60">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="appearance-none px-5 py-3 pr-10 border rounded-xl shadow-md bg-white text-gray-700 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {topics.map((topic, i) => (
                <option key={i} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 md:right-22 right-3 flex items-center text-gray-500 pointer-events-none">
              ▼
            </span>
          </div>
        </div>
      </div>

      
      <div className="px-6 md:px-20 pb-12">
        {filteredBookmarks.length === 0 ? (
          <p className="text-center text-gray-600">
            No questions bookmarked yet.
          </p>
        ) : (
          <div className="space-y-8">
            {filteredBookmarks.map((q, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg border border-gray-200"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2 md:gap-0">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {idx + 1}. {q.Problem || q.question}
                  </h2>

                  <button
                    onClick={() => toggleDone(idx)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition ${
                      q.Done
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    }`}
                  >
                    <CheckCircle size={16} />
                    {q.Done ? "Completed" : "Mark as Done"}
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Topic: <span className="font-medium">{q.topicName}</span>
                </p>

                <div className="flex gap-4 text-sm text-green-700 mb-4 flex-wrap">
                  {q.URL && (
                    <a
                      href={q.URL}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      GeeksForGeeks
                    </a>
                  )}
                  {q.LeetCode && (
                    <a
                      href={q.LeetCode}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      LeetCode
                    </a>
                  )}
                  {q.Video && (
                    <a
                      href={q.Video}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      Video
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
