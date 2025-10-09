import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Bookmark, StickyNote } from "lucide-react";

const TopicDetail = () => {
  const { topicName } = useParams();
  const decodedName = decodeURIComponent(topicName);
  const token = localStorage.getItem("token");

  const [topic, setTopic] = useState(null); // single topic
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateFields = async(qIndex, field, value) => {
    try {
      const options = {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify({field, value})
    }

    const res = await fetch(`http://localhost:4000/api/topic/${topic.position}/questions/${qIndex}`, options)
    const data = await res.json()
    if(res.ok){
      console.log(data)
      setTopic(data.topic)
    }
    else{
      alert(data.message)
    }
    } catch (error) {
      console.log("Error in updating fields", error)
    }
    
    
  }

  // Fetch topic on mount
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:4000/api/topic/get-topic/${decodedName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch topic");
        }

        const data = await res.json();
        setTopic(data); // store full topic
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [decodedName, token]);

  // ---------------- Handlers ----------------
  const toggleDone = (qIndex) => {
    const newValue = !topic.questions[qIndex].Done
    updateFields(qIndex, "Done", newValue)
  };

  const toggleBookmark = (qIndex) => {
    const newValue = !topic.questions[qIndex].Bookmark
    updateFields(qIndex, "Bookmark", newValue)
  };

  const toggleNotes = (qIndex) => {
    const updated = { ...topic };
    updated.questions[qIndex].showNotes =
      !updated.questions[qIndex].showNotes;
    setTopic(updated);
  };

  const handleNoteChange = (qIndex, value) => {
    const updated = { ...topic };
    updated.questions[qIndex].Notes = value;
    setTopic(updated);
    
  };

  const saveNotes = (qIndex) => {
    const noteValue = topic.questions[qIndex].Notes;
    updateFields(qIndex, "Notes", noteValue)
  }
  // ---------------- UI ----------------
  if (loading) {
    return (
      <h1 className="text-center mt-20 text-xl text-gray-600">
        Loading topic...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-center mt-20 text-red-600">
        ❌ Error: {error}
      </h1>
    );
  }

  if (!topic) {
    return (
      <h1 className="text-center mt-20 text-gray-600">
        Topic not found 😢
      </h1>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen px-6 md:px-20 py-20 font-poppins">
      {/* Back button */}
      <div className="absolute top-10 left-20">
        <Link
          to="/questions"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:shadow-lg transition"
        >
          ← Back
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-center mb-10">
        <span className="text-gray-800">{topic.topicName}</span>{" "}
        <span className="text-green-600">
          – {topic.questions.length} Questions
        </span>
      </h1>

      {/* Questions list */}
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

            {/* Links */}
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

            {/* Action buttons */}
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

            {/* Notes textarea */}
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
    </div>
  );
};

export default TopicDetail;
