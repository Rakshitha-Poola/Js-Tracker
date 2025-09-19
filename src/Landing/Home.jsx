
import { motion } from "framer-motion";
import Header from "./Header";


const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  return (
    <div className="bg-[url('https://html.designingmedia.com/eginary/assets/images/vector1.png')] flex flex-col md:flex-row justify-between bg-[position:600px_0px] items-center bg-no-repeat bg-cover min-h-screen px-6 md:px-16 relative">
      <Header/>

      
      <div className="flex flex-col md:flex-row items-center w-full mt-32 md:mt-0">
        
      
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }} 
          className="max-w-2xl space-y-6 text-center md:text-left mt-30 ml-5"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            The Smarter Way To Master JavaScript
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-base text-gray-700"
          >
            Track your coding progress from platforms like LeetCode and HackerRank. 
            Mark problems as done, monitor your consistency, and achieve your JavaScript goals — 
            all stored safely in your browser.
          </motion.p>
          
   
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="/questions" 
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition hover:scale-110 hover:shadow-2xl"
            >
              Start Practicing
            </a>
            <a 
              href="/progress" 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition hover:scale-110 hover:shadow-2xl"
            >
              Track My Progress
            </a>
          </motion.div>
        </motion.div>

     
        <div className="mt-10 md:mt-0 md:ml-10 flex justify-center">
          <img 
            src="https://html.designingmedia.com/eginary/assets/images/home-banner-img.png" 
            alt="Hero Banner" 
            className="w-[680px] sm:w-[400px] md:w-[450px] lg:w-[550px] md:h-150 md:mt-32 h-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
