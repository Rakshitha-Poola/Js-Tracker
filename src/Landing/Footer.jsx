import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-[url('https://html.designingmedia.com/eginary/assets/images/footer-bg-img.png')] bg-cover bg-center pt-30 text-center">
    
      

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24  text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
        
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>

              <h2 className="text-2xl font-bold">JS-TRACKER</h2>
            </div>
            <p className="text-sm leading-relaxed">
              Practice curated JavaScript questions, track your solved problems,
              and build consistency with daily coding insights.
            </p>
          </div>

       
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-green-300">About</a></li>
              <li><a href="/questions" className="hover:text-green-300">Questions</a></li>
              <li><a href="/progress" className="hover:text-green-300">Progress Tracker</a></li>
              <li><a href="/faq" className="hover:text-green-300">FAQ</a></li>
              <li><a href="/resources" className="hover:text-green-300">Resources</a></li>
            </ul>
          </div>

     
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="hover:text-green-300">Blog</a></li>
              <li><a href="/guides" className="hover:text-green-300">Guides</a></li>
              <li><a href="/contact" className="hover:text-green-300">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-green-300">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-green-300">Terms & Conditions</a></li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">📧 support@js-tracker.com</p>
            <p className="text-sm mb-2">🌍 Online Learning Platform</p>
            <p className="text-sm mb-4">📞 +91-98765-43210</p>
            <p className="text-md mb-4">🌐 in X</p>
          </div>
        </div>
      </div>

     
      <div className="relative z-10 text-center py-4 text-sm text-white">
        © 2024 JS-Tracker. All Rights Reserved
      </div>

      
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-green-500 w-10 hover:bg-green-600 text-white p-3 rounded-sm shadow-lg transition z-20"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
