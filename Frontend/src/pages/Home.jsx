import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Users, Zap, BookOpen, Award } from 'lucide-react';
import img1 from "../images/Home.jpg"; 

const Home = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze historical data to predict your admission chances with high accuracy."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Real-time Analysis",
      description: "Get instant predictions based on the latest cutoff trends and admission statistics from top colleges."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Career Roadmaps",
      description: "Detailed career paths with skill requirements and learning resources for your chosen field."
    }
  ];

  const stats = [
    { number: "90%", label: "Prediction Accuracy" },
    { number: "10+", label: "Career Paths" }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-900"> 

      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg')] bg-cover bg-center opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex text-center items-center px-3 py-1 rounded-full text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Zap className="h-4 w-4 mr-2" />
                  AI-Powered College Predictions
                </div>
                <h1 className="text-5xl lg:text-6xl text-white font-bold leading-tight">
                  Your Path to
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent block">
                    Dream College
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Get accurate admission predictions for JEE, NEET, and CUET with our advanced AI system. 
                  Make informed decisions about your future with personalized college recommendations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/prediction"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Get Predictions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/colleges"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-all duration-200"
                >
                  Browse Colleges
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 mb-12"> 
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-emerald-400">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center items-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-2xl overflow-hidden
             transition-all duration-300 hover:shadow-emerald-500/50 hover:border-emerald-500"> 
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl" />
                <img 
                    src={img1} 
                    alt="Students studying or celebrating graduation" 
                    className="relative z-10 w-full h-auto max-w-full rounded-lg object-contain max-h-96" 
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/500x300/1e293b/a5f3fc?text=Visual+Placeholder`; }}
                />
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-slate-800/50"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose CounselIQ?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with comprehensive data analysis 
              to provide you with the most accurate college admission predictions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> 
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-slate-900/50 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect College?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully found their dream colleges with CounselIQ's AI-powered predictions.
          </p>
          <Link
            to="/colleges" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;