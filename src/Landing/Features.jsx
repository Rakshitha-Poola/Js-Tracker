import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarCheck,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      id: "01",
      title: "Track Coding Progress",
      desc: "Automatically log your solved problems from LeetCode, HackerRank, and more to keep your learning organized.",
      icon: <BarChart3 className="w-10 h-10 text-white" />,
    },
    {
      id: "02",
      title: "Consistency Insights",
      desc: "Stay motivated with streak tracking and weekly stats that highlight your consistency and coding habits.",
      icon: <CalendarCheck className="w-10 h-10 text-white" />,
    },
    {
      id: "03",
      title: "Clean & Simple UI",
      desc: "Focus only on your JavaScript growth with a distraction-free, minimal dashboard that works across devices.",
      icon: <LayoutDashboard className="w-10 h-10 text-white" />,
    },
    {
      id: "04",
      title: "Secure Local Storage",
      desc: "All your progress is saved safely in your browser — no login required, no data leaks, your privacy first.",
      icon: <ShieldCheck className="w-10 h-10 text-white" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
       
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Why Choose <span className="text-blue-600">Js-Tracker?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Designed to help you master JavaScript with structured practice,
            smart insights, and a clean experience.
          </p>
        </div>

      
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-gradient-to-b from-blue-400 to-blue-500 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              
              <div className="absolute top-4 right-6 text-6xl font-extrabold text-white/20">
                {feature.id} 
              </div>

           
              <div className="mb-6">{feature.icon}</div>

            
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>

            
              <p className="text-sm text-gray-100 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;