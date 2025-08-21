import React, { useState } from 'react';
import { Target, Clock, BookOpen, ExternalLink, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';

const CareerRoadmap = () => {
    const [selectedCareer, setSelectedCareer] = useState("");
    const [careerData, setCareerData] = useState(null); 

    const careers = [
        "Data Scientist",
        "Software Engineer",
        "Artificial Intelligence and Machine Learning Engineer",
        "Cybersecurity Analyst",
        "Full-Stack Developer",
        "Game Developer",
        "Service Engineer",
        "Mechanical Engineer",
        "Civil Engineer",
        "Doctor (MBBS)",
        "Physiotherapy",
        "Ayurvedic Doctor",
        "Dentist",
        "Counselor",
        "Investment Banker"
    ];

    const handleChange = async (e) => {
        const career = e.target.value;
        setSelectedCareer(career);

        if (career !== "") {
            try {
                const response = await fetch(`http://localhost:5000/api/careers/${career}`);
                const data = await response.json();
                setCareerData(data);
            } catch (error) {
                console.error("Error fetching career:", error);
                setCareerData(null); 
            }
        } else {
            setCareerData(null); 
        }
    };

    return (
        <div className="min-h-screen py-8 bg-slate-900 text-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">Career Roadmap</h1>
                    <p className="text-slate-400">
                        Explore detailed career paths with skills, resources, and timelines to guide your professional journey.
                    </p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Choose Your Career Path</h2>
                    <select
                        value={selectedCareer}
                        onChange={handleChange}
                        className="w-full md:w-1/2 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="" hidden>-- Select Career --</option>
                        {careers.map((career, index) => (
                            <option key={index} value={career}>
                                {career}
                            </option>
                        ))}
                    </select>
                </div>

                {careerData ? (
                    <div className="space-y-8">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                    <Target className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{careerData.career_name}</h2>
                                    <p className="text-slate-400">{careerData.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {careerData.stages.map((stage, index) => ( 
                                <div
                                    key={index}
                                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 relative"
                                >

                                    <div className="absolute -left-4 top-6 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>

                                    <div className="flex items-center justify-between mb-6 ml-6">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{stage.stage_name}</h3> 
                                            <div className="flex items-center space-x-2 text-slate-400 mt-1">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-sm">{stage.duration_years} years</span> 
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-6 ml-6">
                                        <div>
                                            <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                                                <CheckCircle className="h-5 w-5 text-emerald-400 mr-2" />
                                                Key Skills to Develop
                                            </h4>
                                            <div className="space-y-2">
                                                {stage.key_skills.map((skill, skillIndex) => ( 
                                                    <div
                                                        key={skillIndex}
                                                        className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg"
                                                    >
                                                        <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                                                        <span className="text-slate-300">{skill}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                                                <BookOpen className="h-5 w-5 text-cyan-400 mr-2" />
                                                Learning Resources
                                            </h4>
                                            <div className="space-y-3">
                                                {stage.resources.map((res, resourceIndex) => (
                                                    <a
                                                        key={resourceIndex}
                                                        href={res.link} 
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-200 group"
                                                    >
                                                        <span className="text-slate-300 group-hover:text-white">
                                                            {res.name} 
                                                        </span>
                                                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-cyan-400" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {index < careerData.stages.length - 1 && ( 
                                        <div className="flex justify-center mt-6">
                                            <ArrowRight className="h-6 w-6 text-slate-600" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {careerData.tips && careerData.tips.length > 0 && ( 
                            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl p-6 border border-emerald-500/20">
                                <h3 className="text-xl font-semibold text-white mb-4">Tips for Success</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                                    {careerData.tips.map((tip, index) => ( 
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <div className="font-medium text-white">{tip}</div> 
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
                        <TrendingUp className="h-16 w-16 text-slate-600 mx-auto mb-4" /> 
                        <h3 className="text-xl font-semibold text-white mb-2">Choose Your Path</h3>
                        <p className="text-slate-400">
                            Select a career from the dropdown above to see a detailed roadmap with skills, 
                            resources, and timelines to guide your professional journey.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CareerRoadmap;