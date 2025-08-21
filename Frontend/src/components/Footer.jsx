import React from "react";
import { Link } from "react-router-dom";
import { Brain, Mail, Phone, MapPin } from 'lucide-react'; // Added Lucide icons for styling

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-emerald-400" />
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                CounselIQ
              </span>
            </Link>
            <p className="text-slate-300 mb-4">
              AI-powered college admission predictions helping students make informed decisions about their educational future.
            </p>
          </div>


          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                About
              </Link>
              <Link to="/prediction" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                Prediction
              </Link>
              <Link to="/colleges" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                Browse Colleges
              </Link>
              <Link to="/career-roadmap" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                Career Roadmap
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Exams Covered</h3>
            <div className="space-y-2">
              <div className="text-slate-300">JEE Mains</div>
              <div className="text-slate-300">NEET UG</div>
              <div className="text-slate-300">CUET UG</div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <div className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">
                Help Center
              </div>
              <div className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">
                Privacy Policy
              </div>
              <div className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">
                Terms of Service
              </div>
              <div className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">
                Contact Us
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} CounselIQ. All rights reserved. Made for students across India.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;