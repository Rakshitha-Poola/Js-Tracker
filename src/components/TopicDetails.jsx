import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Bookmark, StickyNote } from "lucide-react";

const TopicDetail = () => {
  const { topicName } = useParams();

  // Load from localStorage or fallback to data
  const loadTopics = () => {
    const saved = JSON.parse(localStorage.getItem("topics"));
    return saved || data;
  };

  const [topics, setTopics] = useState(loadTopics());
  const topicIndex = topics.findIndex((t) => t.topicName === topicName);
  const topic = topics[topicIndex];

  // Save whenever topics change
  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  if (!topic) return <h1 className="text-center mt-20">Topic not found 😢</h1>;

  // Toggle Done
  const toggleDone = (qIndex) => {
    const updated = [...topics];
    updated[topicIndex].questions[qIndex].Done =
      !updated[topicIndex].questions[qIndex].Done;
    setTopics(updated);
  };

  // Toggle Bookmark
  const toggleBookmark = (qIndex) => {
    const updated = [...topics];
    updated[topicIndex].questions[qIndex].Bookmark =
      !updated[topicIndex].questions[qIndex].Bookmark;
    setTopics(updated);
  };

  // Toggle Notes visibility
  const toggleNotes = (qIndex) => {
    const updated = [...topics];
    updated[topicIndex].questions[qIndex].showNotes =
      !updated[topicIndex].questions[qIndex].showNotes;
    setTopics(updated);
  };

  // Save Notes
  const handleNoteChange = (qIndex, value) => {
    const updated = [...topics];
    updated[topicIndex].questions[qIndex].Notes = value;
    setTopics(updated);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen px-6 md:px-20 py-20 font-poppins">
        <div className="absolute top-10 left-20">
        <Link
          to="/questions"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:shadow-lg transition"
        >
          ← Back
        </Link>
      </div>
      <h1 className="text-3xl font-extrabold text-center mb-10">
        <span className="text-gray-800">{topic.topicName}</span>{" "}
        <span className="text-green-600">
          – {topic.questions.length} Questions
        </span>
      </h1>

      <div className="space-y-8">
        {topic.questions.map((q, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg border border-gray-200"
          >
            <h2 className="font-semibold text-lg text-gray-800 mb-3">
              {idx + 1}. {q.Problem}
            </h2>

            
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

            
            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleDone(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  q.Done
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <CheckCircle size={16} />
                {q.Done ? "Done" : "Mark Done"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleBookmark(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  q.Bookmark
                    ? "bg-yellow-400 text-white shadow-md"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <Bookmark size={16} />
                {q.Bookmark ? "Bookmarked" : "Bookmark"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleNotes(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  q.showNotes
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <StickyNote size={16} />
                Notes
              </motion.button>
            </div>

           
            <AnimatePresence>
              {q.showNotes && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <textarea
                    value={q.Notes || ""}
                    onChange={(e) => handleNoteChange(idx, e.target.value)}
                    placeholder="Write your notes here..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

export default TopicDetail;
