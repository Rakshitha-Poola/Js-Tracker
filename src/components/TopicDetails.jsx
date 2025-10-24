import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Bookmark, StickyNote } from "lucide-react";
import { useQuestions } from "../context/QuestionContext";

const TopicDetails = () => {
  const { topicName } = useParams();
  const decodedName = decodeURIComponent(topicName);
  const { topics, updateQuestion, fetchTopicWithProgress } = useQuestions();
  const [showNotesMap, setShowNotesMap] = useState({});
  const [localNotes, setLocalNotes] = useState({});
  const [debounceTimers, setDebounceTimers] = useState({});

  // Reload once & fetch topic
  useEffect(() => {
    const hasReloaded = localStorage.getItem("reloadedOnce");

    if (!hasReloaded) {
      localStorage.setItem("reloadedOnce", "true");
      window.location.reload();
    }

    const topic = topics.find((t) => t.topicName === decodedName);
    if (!topic) fetchTopicWithProgress(decodedName);
  }, [decodedName, topics, fetchTopicWithProgress]);

  const topic = topics.find((t) => t.topicName === decodedName);

  // ✅ Loader while fetching topic
  if (!topic || !topic.questions) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-yellow-400 border-t-green-500 rounded-full"
        />
      </div>
    );
  }

  const toggleDone = (q) => updateQuestion(topic._id, q._id, "Done", !q.Done);
  const toggleBookmark = (q) => updateQuestion(topic._id, q._id, "Bookmark", !q.Bookmark);
  const toggleNotes = (q) => setShowNotesMap((prev) => ({ ...prev, [q._id]: !prev[q._id] }));

  const handleNoteChange = (q, value) => {
    setLocalNotes((prev) => ({ ...prev, [q._id]: value }));
    setShowNotesMap((prev) => ({ ...prev, [q._id]: true }));

    if (debounceTimers[q._id]) clearTimeout(debounceTimers[q._id]);
    const timer = setTimeout(() => {
      updateQuestion(topic._id, q._id, "Notes", value);
    }, 500);
    setDebounceTimers((prev) => ({ ...prev, [q._id]: timer }));
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen px-6 md:px-20 py-20 font-poppins relative">
      <div className="absolute top-4 left-4 sm:top-10 sm:left-20">
        <Link
          to="/questions"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:shadow-lg transition"
        >
          ← Back
        </Link>
      </div>

      <h1 className="text-3xl font-extrabold text-center mb-10">
        <span className="text-gray-800">{topic.topicName}</span>{" "}
        <span className="text-green-600">– {topic.questions.length} Questions</span>
      </h1>

      <div className="space-y-8">
        {topic.questions.map((q, idx) => (
          <motion.div
            key={q._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg border border-gray-200"
          >
            <h2 className="font-semibold text-lg text-gray-800 mb-3">
              {idx + 1}. {q.problem}
            </h2>

            <div className="flex gap-4 text-sm text-green-700 mb-4 flex-wrap">
              {q.URL && <a href={q.URL} target="_blank" rel="noreferrer" className="hover:underline">GeeksForGeeks</a>}
              {q.URL2 && <a href={q.URL2} target="_blank" rel="noreferrer" className="hover:underline">Coding Ninjas</a>}
            </div>

            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDone(q)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${q.Done ? "bg-green-500 text-white shadow-md" : "bg-gray-200 text-gray-700"}`}
              >
                <CheckCircle size={16} /> {q.Done ? "Done" : "Mark Done"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleBookmark(q)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${q.Bookmark ? "bg-yellow-400 text-white shadow-md" : "bg-gray-200 text-gray-700"}`}
              >
                <Bookmark size={16} /> {q.Bookmark ? "Bookmarked" : "Bookmark"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleNotes(q)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${showNotesMap[q._id] ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-gray-700"}`}
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
                  className="mt-4"
                >
                  <textarea
                    value={localNotes[q._id] ?? q.Notes ?? ""}
                    onChange={(e) => handleNoteChange(q, e.target.value)}
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

export default TopicDetails;
