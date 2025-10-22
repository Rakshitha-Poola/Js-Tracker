import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Rakshitha P",
    role: "JS-Tracker User",
    text: "JS-Tracker helped me stay consistent with solving JavaScript problems daily. The progress tracker motivates me to never break my streak!",
    avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Frontend Developer",
    text: "The curated question sets felt like interview practice. I improved my JS fundamentals and problem-solving speed.",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Student",
    text: "I love comparing JS solutions with Python and Java inside the app — it made me understand algorithms much better.",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
    rating: 4,
  },
  {
    name: "Karan Patel",
    role: "Software Engineer",
    text: "Using JS-Tracker daily sharpened my problem-solving mindset. Now I can approach coding challenges with more confidence and speed.",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    rating: 5,
  },
  {
    name: "Ananya Verma",
    role: "Aspiring Developer",
    text: "I really enjoy the streak feature — it pushes me to stay consistent and keep learning every single day.",
    avatar: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
    rating: 4,
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right"); 

  const handlePrev = () => {
    setDirection("left");
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const handleNext = () => {
    setDirection("right");
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  const active = testimonials[current];

  return (
    <section className="relative overflow-hidden bg-white py-24 mt-20 mb-20">
    
      <img
        src="https://html.designingmedia.com/eginary/assets/images/green-circle-shape.png"
        alt="green circle"
        className="absolute left-0 top-20 w-24 md:w-32 opacity-80 animate-float"
      />

      <img
        src="https://html.designingmedia.com/eginary/assets/images/triangle-vector1.png"
        alt="triangle"
        className="absolute left-20 bottom-50 w-10 opacity-80 animate-floatX"
      />
      <img
        src="https://html.designingmedia.com/eginary/assets/images/triangle-vector1.png"
        alt="triangle"
        className="absolute right-20 top-35 w-10 opacity-80 animate-floatX "
      />
      <img
        src="https://html.designingmedia.com/eginary/assets/images/green-circle-shape.png"
        alt="green circle"
        className="absolute right-0 bottom-40 w-24 md:w-32 opacity-80 animate-float transform scale-x-[-1]"
      />

   
      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.3 }} 
      >
        <div className="text-green-500 font-semibold tracking-widest uppercase">
          Testimonials
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
          Success Stories
        </h2>
      </motion.div>

     
      <div className="relative z-10 max-w-3xl mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "right" ? -50 : 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-2xl px-8 py-12 text-center relative"
          >
          
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <img
                src={active.avatar}
                alt={active.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
              />
            </div>

            <h3 className="mt-10 text-lg font-semibold text-gray-800">
              {active.name}
            </h3>
            <p className="text-sm text-gray-500">{active.role}</p>

            <p className="mt-6 text-gray-600 italic leading-relaxed">
              “ {active.text} ”
            </p>

           
            <div className="flex justify-center mt-5 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={i < active.rating ? "#F6C25A" : "none"}
                  stroke={i < active.rating ? "#F6C25A" : "#e5e7eb"}
                  strokeWidth="1.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .587l3.668 7.431L23.6 9.747l-5.8 5.646L18.998 24 12 20.016 5.002 24l1.197-8.607L.399 9.747l7.932-1.729L12 .587z" />
                </svg>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-10 gap-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{
              background: "linear-gradient(135deg,#7c4dff,#4f6bff)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{
              background: "linear-gradient(135deg,#7c4dff,#4f6bff)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}