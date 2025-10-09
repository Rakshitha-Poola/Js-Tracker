import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Bookmark, StickyNote, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [notesOpen, setNotesOpen] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ---------------- Fetch bookmarks ----------------
  const fetchBookmarked = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch("http://localhost:4000/api/topic/bookmarked", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setBookmarks(data);
      } else {
        setErrorMsg(data.message || "Failed to fetch bookmarks");
      }
    } catch (error) {
      setErrorMsg("Error fetching bookmarks. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBookmarked();
  }, [token, navigate]);

  // ---------------- Update topics dynamically ----------------
  useEffect(() => {
    const topicNames = new Set();

    // 🧩 Make sure topic field matches backend key (use `topicName` or `TopicName`)
    bookmarks.forEach((q) => {
      if (q.topicName) topicNames.add(q.topicName);
      if (q.TopicName) topicNames.add(q.TopicName);
    });

    setTopics(["All", ...Array.from(topicNames)]);

    if (!topicNames.has(selectedTopic)) setSelectedTopic("All");
  }, [bookmarks, selectedTopic]);

  // ---------------- Update field ----------------
  const updateField = async (q, field, value, idx) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/topic/${q.topicId}/questions/${q.questionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ field, value }),
        }
      );

      if (res.ok) {
        if (field === "Bookmark" && !value) {
          setBookmarks((prev) =>
            prev.filter((item) => item.questionId !== q.questionId)
          );
        } else {
          setBookmarks((prev) =>
            prev.map((item, i) =>
              i === idx ? { ...item, [field]: value } : item
            )
          );
        }
      } else {
        console.error("Failed to update field:", field);
      }
    } catch (error) {
      console.error("Error updating field:", field, error);
    }
  };

  const toggleDone = (idx, q) => updateField(q, "Done", !q.Done, idx);
  const toggleBookmark = (idx, q) =>
    updateField(q, "Bookmark", !q.Bookmark, idx);
  const toggleNotes = (idx) =>
    setNotesOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const handleNoteChange = (idx, value) => {
    const updated = [...bookmarks];
    updated[idx].Notes = value;
    setBookmarks(updated);
  };

  const saveNotes = (idx) => {
    const noteValue = bookmarks[idx].Notes || "";
    updateField(bookmarks[idx], "Notes", noteValue, idx);
  };

  // ---------------- Filtering fix ----------------
  const filteredBookmarks =
    selectedTopic === "All"
      ? bookmarks
      : bookmarks.filter(
          (q) =>
            q.topicName === selectedTopic || q.TopicName === selectedTopic
        );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen font-poppins px-6 md:px-20">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-4 md:py-6 relative mb-10">
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <img
            src="https://res.cloudinary.com/dqxbyu1dj/image/upload/v1757942564/open-book_ksjwiw.png"
            alt="Logo"
            className="w-12 h-12 animate-bounce"
          />
          <h1 className="text-3xl text-gray-800 font-extrabold tracking-wide animate-pulse">
            Js-Tracker
          </h1>
        </Link>

        <div className="hidden md:flex gap-8 items-center text-black font-medium text-lg">
          <Link to="/questions" className="hover:underline transition">
            Questions
          </Link>
          <Link to="/progress" className="hover:underline transition">
            Progress
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full right-6 mt-2 w-40 rounded-xl flex flex-col z-50 bg-white border shadow-lg">
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

      <div className="mt-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-8">
          <h1 className="text-3xl font-extrabold text-center md:text-left">
            📌 Bookmarked <span className="text-green-600">Questions</span>
          </h1>

          <div className="flex justify-center md:justify-end">
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
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && errorMsg && (
          <div className="text-center text-red-600 font-medium py-10">
            {errorMsg}
          </div>
        )}

        <div>
          {!loading && !errorMsg && filteredBookmarks.length === 0 ? (
            <p className="text-center text-gray-600">
              No questions bookmarked yet.
            </p>
          ) : (
            <div className="space-y-8">
              {filteredBookmarks.map((q, idx) => (
                <motion.div
                  key={q.questionId}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl shadow-sm bg-white hover:shadow-lg border border-gray-200"
                >
                  <h2 className="font-semibold text-lg text-gray-800 mb-3">
                    {idx + 1}. {q.Problem || q.question}
                  </h2>

                  <div className="flex gap-4 text-sm text-green-700 mb-3 flex-wrap">
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
                    
                  </div>

                  <div className="flex gap-4 flex-wrap mb-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleDone(idx, q)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                        q.Done
                          ? "bg-green-500 text-white shadow-md"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <CheckCircle size={16} />{" "}
                      {q.Done ? "Done" : "Mark Done"}
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleBookmark(idx, q)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                        q.Bookmark
                          ? "bg-yellow-400 text-white shadow-md"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Bookmark size={16} />{" "}
                      {q.Bookmark ? "Bookmarked" : "Bookmark"}
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleNotes(idx)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                        notesOpen[idx]
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <StickyNote size={16} /> Notes
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {notesOpen[idx] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <textarea
                          value={q.Notes || ""}
                          onChange={(e) =>
                            handleNoteChange(idx, e.target.value)
                          }
                          onBlur={() => saveNotes(idx)}
                          placeholder="Write your notes here..."
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
