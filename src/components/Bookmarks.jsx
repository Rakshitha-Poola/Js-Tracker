import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Bookmark, StickyNote } from "lucide-react";
import { useQuestions } from "../context/QuestionContext";
import { Link, useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const { topics, updateQuestion } = useQuestions();
  const [showNotesMap, setShowNotesMap] = useState({});
  const [localNotes, setLocalNotes] = useState({});
  const [selectedTopic, setSelectedTopic] = useState("All");

  const navigate = useNavigate();

  const bookmarks = topics.flatMap((t) =>
    t.questions
      .filter((q) => q.Bookmark)
      .map((q) => ({ ...q, topicId: t._id, topicName: t.topicName }))
  );

  const topicOptions = ["All", ...Array.from(new Set(bookmarks.map((b) => b.topicName)))];
  const filteredBookmarks =
    selectedTopic === "All" ? bookmarks : bookmarks.filter((q) => q.topicName === selectedTopic);

  const toggleDone = (q) => updateQuestion(q.topicId, q._id, "Done", !q.Done);
  const toggleBookmark = (q) => updateQuestion(q.topicId, q._id, "Bookmark", !q.Bookmark);
  const toggleNotes = (q) => setShowNotesMap((prev) => ({ ...prev, [q._id]: !prev[q._id] }));

  const handleNoteChange = (q, value) => {
    setLocalNotes((prev) => ({ ...prev, [q._id]: value }));
    setShowNotesMap((prev) => ({ ...prev, [q._id]: true }));
  };

  const handleNoteBlur = (q) => {
    updateQuestion(q.topicId, q._id, "Notes", localNotes[q._id] ?? "");
  };

  return (
    <div className="min-h-screen font-poppins bg-gray-50">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-20 py-4">
        <Link to="/" className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img
            src="https://res.cloudinary.com/dqxbyu1dj/image/upload/v1757942564/open-book_ksjwiw.png"
            alt="Logo"
            className="w-12 h-12 animate-bounce"
          />
          <h1 className="text-3xl text-gray-800 font-extrabold tracking-wide animate-pulse">Js-Tracker</h1>
        </Link>

        <div className="hidden md:flex gap-6 items-center text-black font-medium text-lg">
          <Link to="/questions" className="hover:underline transition">Questions</Link>
          <Link to="/progress" className="hover:underline transition">Progress</Link>
          <button
            onClick={() => navigate("/bookmarks")}
            className="flex items-center gap-2 bg-yellow-400 text-white px-3 py-2 rounded-full shadow-md hover:bg-yellow-500 transition"
          >
            <Bookmark size={18} /> Bookmarks
          </button>
        </div>
      </nav>

      <div className="h-24" />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-6 md:px-20 mb-10">
        <h1 className="text-4xl md:text-[40px] font-extrabold text-gray-800 mb-4 md:mb-0">
          📌 Bookmarked <span className="text-green-600">Questions</span>
        </h1>

        {bookmarks.length > 0 && (
          <select
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto text-sm md:text-base"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {topicOptions.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        )}
      </div>

      {filteredBookmarks.length === 0 && (
        <p className="text-center mt-20 text-gray-600">
          No bookmarked questions{selectedTopic !== "All" ? ` for "${selectedTopic}"` : ""}.
        </p>
      )}

      <div className="space-y-8 px-6 md:px-20 pb-20">
        {filteredBookmarks.map((q, idx) => (
          <motion.div
            key={q._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg border border-gray-200"
          >
            <h2 className="font-semibold text-lg mb-2">{idx + 1}. {q.problem}</h2>

            <div className="flex gap-4 text-sm text-green-700 mb-4 flex-wrap ml-5">
              {q.URL && <a href={q.URL} target="_blank" rel="noreferrer" className="hover:underline">GeeksForGeeks</a>}
              {q.URL2 && <a href={q.URL2} target="_blank" rel="noreferrer" className="hover:underline">Coding Ninjas</a>}
            </div>

            <div className="flex gap-4 flex-wrap mb-3 ml-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDone(q)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${q.Done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                <CheckCircle size={16} /> {q.Done ? "Done" : "Mark Done"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleBookmark(q)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${q.Bookmark ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                <Bookmark size={16} /> {q.Bookmark ? "Bookmarked" : "Bookmark"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleNotes(q)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${showNotesMap[q._id] ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                <StickyNote size={16} /> Notes
              </motion.button>
            </div>

            <AnimatePresence>
              {showNotesMap[q._id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2"
                >
                  <textarea
                    value={localNotes[q._id] ?? q.Notes ?? ""}
                    onChange={(e) => handleNoteChange(q, e.target.value)}
                    onBlur={() => handleNoteBlur(q)}
                    placeholder="Write your notes here..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={5}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
