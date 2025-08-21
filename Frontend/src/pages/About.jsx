import React from 'react';
import { Target, Users, Award, Lightbulb, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Accuracy First",
      description: "Our ML models achieve 95%+ accuracy by analyzing years of admission data and cutoff trends."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Student-Centric",
      description: "Every feature is designed with students in mind, providing clear guidance for their academic journey."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We continuously improve our algorithms to provide the most reliable predictions possible."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Privacy",
      description: "Your data is secure with us. We prioritize privacy and transparent prediction methodologies."
    }
  ];

  const stats = [
    { number: "90%", label: "Accuracy Rate" },
    { number: "3", label: "Major Exams Covered" }
  ];

  return (
    <div className="py-16 bg-slate-900 text-slate-100"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CounselIQ</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing college admission guidance through artificial intelligence, 
            helping students make informed decisions about their educational future.
          </p>
        </div>
      </div>

      <div className="bg-slate-800/50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Every year, millions of students face uncertainty about college admissions. 
                Traditional counseling methods often lack the data-driven insights needed 
                for accurate predictions.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                CounselIQ bridges this gap by leveraging advanced machine learning algorithms 
                to analyze historical admission data, providing students with reliable predictions 
                and personalized recommendations for their college journey.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
                <div className="grid grid-cols-2 gap-6"> 
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                      <div className="text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How Our Predictions Work</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our AI system combines multiple data sources and advanced algorithms to provide accurate admission predictions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Data Collection</h3>
            <p className="text-slate-300">
              We analyze historical cutoff data from thousands of colleges across JEE, NEET, and CUET examinations.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">ML Processing</h3>
            <p className="text-slate-300">
              Advanced machine learning models process your profile data against historical trends and patterns.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Predictions</h3>
            <p className="text-slate-300">
              Get personalized admission probability percentages tailored to your profile.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              These core principles guide everything we do at CounselIQ.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-slate-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;