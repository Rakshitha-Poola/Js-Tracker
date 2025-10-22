import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const colorPalette = [
  { bar: "from-green-400 to-green-600" },
  { bar: "from-blue-400 to-blue-600" },
  { bar: "from-purple-400 to-purple-600" },
  { bar: "from-pink-400 to-pink-600" },
  { bar: "from-yellow-400 to-yellow-600" },
  { bar: "from-indigo-400 to-indigo-600" },
];

const Progress = () => {
  const [topics, setTopics] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalProgress, setTotalProgress] = useState(null)
  const token = localStorage.getItem("token")
  

  useEffect(() => {
      const eachTopicProgress = async() => {
        const options = {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }

        const res = await fetch('http://localhost:4000/api/topic/each-topic/progress', options)
        const data = await res.json()
        if(res.ok){
          setTopics(data.progress)
        }
        
      }
      eachTopicProgress()

    const progress = async() => {
      const options = {
        method: "GET",
        headers:{
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      const res = await fetch("http://localhost:4000/api/topic/all-topics/progress", options)
      const data = await res.json();
      if(res.ok){
        setTotalProgress(data.totalPercent)
      }
    } 
    progress()
  }, []);

  // Calculate overall completion across all topics
  
  const overallCompletion = totalProgress;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 px-2 md:px-20 font-poppins">
      
      <nav className="w-full flex justify-between items-center px-1.5 md:px-8 py-6 relative">
      
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
          <div className="absolute top-full right-6 mt-2 w-40 bg-white shadow-lg rounded-xl flex flex-col">
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

      
      <div className="max-w-6xl mx-auto text-center mt-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl py-16 px-8 shadow-xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Track Your Progress
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Visualize your journey and stay motivated with clear progress insights across topics.
          </p>
        </motion.div>
      </div>

     
      <div className="max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-10 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Overall Completion</h2>
          <div className="relative w-44 h-44 mx-auto">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="transparent"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="#6366F1"
                strokeWidth="12"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={2 * Math.PI * 70 * (1 - overallCompletion / 100)}
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - overallCompletion / 100) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
              {overallCompletion}%
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Great job! You’ve completed {overallCompletion}% of your practice journey 🚀
          </p>
        </motion.div>

       
        <div className="mt-16 space-y-6">
          {topics.map((topic, i) => {
            const total = topic.totalQuestions;
            const done = topic.completed;
            const percent = topic.percentCompleted;
            const colors = colorPalette[i % colorPalette.length];

            return (
              <motion.div
                key={topic.topicName}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between mb-3">
                  <span className="text-gray-800 font-semibold">{topic.topicName}</span>
                  <span className="text-gray-600">{percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-4 rounded-full bg-gradient-to-r ${colors.bar}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;