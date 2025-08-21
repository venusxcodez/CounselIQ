import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Brain, User, LogOut } from 'lucide-react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");    
    localStorage.removeItem("userId");   
    localStorage.removeItem("username");
    setIsLoggedIn(false); 
    navigate("/");   
  };


  const handleProtectedLink = (path) => {
    if (!isLoggedIn) {
      navigate("/login"); 
    } else {
      navigate(path);    
    }
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-emerald-400" />
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                CounselIQ
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
           
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/about') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
              }`}
            >
              About
            </Link>

            <button
              onClick={() => handleProtectedLink("/prediction")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/prediction') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
              }`}
            >
              Prediction
            </button>


            <button
              onClick={() => handleProtectedLink("/colleges")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/colleges') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
              }`}
            >
              Browse Colleges
            </button>


            <button
              onClick={() => handleProtectedLink("/career-roadmap")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/career-roadmap') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
              }`}
            >
              Career Roadmap
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/dashboard') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-slate-800 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  className="text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-emerald-400 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/50 rounded-lg mt-2">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>


            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/about') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>


            <button
              onClick={() => handleProtectedLink("/prediction")}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left ${
                isActive('/prediction') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-700'
              }`}
            >
              Prediction
            </button>

            <button
              onClick={() => handleProtectedLink("/colleges")}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left ${
                isActive('/colleges') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-700'
              }`}
            >
              Browse Colleges
            </button>
            
            <button
              onClick={() => handleProtectedLink("/career-roadmap")}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left ${
                isActive('/career-roadmap') ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-700'
              }`}
            >
              Career Roadmap
            </button>

            
            {isLoggedIn ? (
              <>
                
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-red-400 hover:bg-slate-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
                
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;