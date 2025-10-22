import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 bg-white overflow-hidden font-['Poppins'] mt-10">
    
      <motion.img
        src="https://html.designingmedia.com/eginary/assets/images/vector-shape1.png"
        alt="Decoration"
        className="absolute top-0 left-0 w-40 md:w-56 opacity-70"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10 mr-2">
      
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }} // animate every time it enters view
          transition={{ duration: 0.8 }}
        >
          <span className="text-green-500 font-semibold uppercase tracking-widest">
            JS-Tracker
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-6 leading-snug">
            Discover Smarter Ways To <br /> Solve JavaScript Questions
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            With <span className="font-semibold">Js-Tracker</span>, you can
            practice JavaScript problems, track your coding journey, and even
            solve challenges in multiple languages. Stay consistent and build
            the confidence to master real-world problem solving.
          </p>

          
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="space-y-5 mb-10"
          >
            {[
              "Solve curated JavaScript problems & track your daily progress",
              "Compare solutions in other languages like Python, C++, and Java",
              "Stay consistent with progress insights and streak tracking"
            ].map((text, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-base md:text-lg">{text}</span>
              </motion.li>
            ))}
          </motion.ul>

          
          <Link to="/questions">
            <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-400 to-green-500 text-white px-7 py-3 rounded-xl mb-8 md:mb-0 font-semibold shadow-lg hover:shadow-xl transition duration-200"
          >
            Explore Questions
          </motion.button>
          </Link>
          
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center relative"
        >
          <img
            src="https://html.designingmedia.com/eginary/assets/images/find-out-img.png"
            alt="Learning Illustration"
            className="max-w-sm md:max-w-md -mt-10"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;