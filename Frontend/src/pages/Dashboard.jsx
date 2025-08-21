import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Target, BookOpen, TrendingUp, Edit, Award, Calendar, Star, MapPin, DollarSign, ExternalLink, GraduationCap, Bookmark, AlertTriangle } from 'lucide-react';

function Dashboard() {
  const [savedColleges, setSavedColleges] = useState([]);
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedColleges();
    fetchProfile();
  }, [token]); 

  const handleUnsave = async (savedId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/colleges/saved/${savedId}/delete/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Token ${token}`
        }
      });

      if (res.ok) {
        setSavedColleges(prevSavedColleges => prevSavedColleges.filter(c => c.savedId !== savedId));
      } else if (res.status === 401) {
        navigate('/login'); 
      } else {
        console.error("Failed to unsave:", res.status, await res.text());
        fetchSavedColleges(); 
      }
    } catch (err) {
      console.error("Error unsaving college:", err);
      fetchSavedColleges();
    }
  }

  const fetchSavedColleges = async () => {
    if (!token) return;

    try {
      const res = await fetch('http://127.0.0.1:8000/colleges/saved/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        }
      });

      if (res.status === 401) {
        setSavedColleges([]);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setSavedColleges(data.map(item => ({
          college: item.college,
          savedId: item.id      
        })));
      } else {
        console.error("Failed to fetch saved colleges:", res.status, await res.text());
      }
    } catch (err) {
      console.error("Network error fetching saved colleges:", err);
    }
  }

  const fetchProfile = async () => {
    if (!token) {
      setProfile(null);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/accounts/me/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        }
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        console.error("Failed to fetch profile:", res.status, await res.text());
        setProfile(null);
      }
    } catch (err) {
      console.error("Network error fetching profile:", err);
      setProfile(null);
    }
  };


  const quickActions = [
    {
      title: 'Admission Prediction',
      description: 'Check your admission chances',
      icon: <Target className="h-6 w-6" />,
      link: '/prediction',
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Browse Colleges',
      description: 'Explore college options',
      icon: <BookOpen className="h-6 w-6" />,
      link: '/colleges', 
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Career Roadmap',
      description: 'Plan your career path',
      icon: <TrendingUp className="h-6 w-6" />,
      link: '/career-roadmap',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen py-8 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {username ? username : "User"}! 
              </h1>
              <p className="text-slate-400 mt-2">
                Track your college admission journey and get personalized recommendations.
              </p>
            </div>
            <Link
              to="/profileForm" 
              className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors duration-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Update Profile 
            </Link>
          </div>
        </div>

        {profile && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{profile.username || username}</h2> 
                {profile.email && <p className="text-slate-400">{profile.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-slate-400">Exam Type</div>
                <div className="text-lg font-semibold text-white">{profile.exam_type || 'Not Set'}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-slate-400">Category</div>
                <div className="text-lg font-semibold text-white">{profile.category || 'Not Set'}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-slate-400">State</div>
                <div className="text-lg font-semibold text-white">{profile.state || 'Not Set'}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-slate-400">Preferred Streams</div>
                <div className="text-lg font-semibold text-white">
                  {profile.preferred_streams?.length || 0} Selected
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                  {action.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{action.title}</h4>
                <p className="text-slate-400">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-6">Your Saved Colleges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedColleges.length > 0 ? (
              savedColleges.map((item) => ( 
                <div
                  key={item.savedId} 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 flex flex-col h-full"
                >
               
                  <img
                    src={item.college.image || `https://placehold.co/400x300/1e293b/a5f3fc?text=No+Image`}
                    alt={item.college.name}
                    className="w-full h-48 object-cover flex-shrink-0"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/1e293b/a5f3fc?text=No+Image`; }}
                  />

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{item.college.name}</h3>
                      </div>

                      {item.college.rating && (
                        <div className="flex items-center space-x-1 bg-emerald-500/20 px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 text-emerald-400 fill-current" />
                          <span className="text-emerald-400 text-xs font-medium">{item.college.rating}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      {item.college.location && (
                        <div className="flex items-center space-x-2 text-slate-300">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{item.college.location}</span>
                        </div>
                      )}
                      {item.college.fees && (
                        <div className="flex items-center space-x-2 text-slate-300">
                          <DollarSign className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">Fees(in K): ₹{item.college.fees}</span>
                        </div>
                      )}
                      {item.college.exam && (
                        <div className="flex items-center space-x-2 text-slate-300">
                          <GraduationCap className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{item.college.exam} Exam</span>
                        </div>
                      )}
                    </div>


                    <div className="flex justify-between items-center gap-2 mt-auto">
                      {item.college.website && (
                        <a
                          href={item.college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-grow inline-flex items-center justify-center py-2 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
                        >
                          Visit Website
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      )}

                      <button
                        onClick={() => handleUnsave(item.savedId)}
                        className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors duration-200 shadow-md bg-red-500/80 text-white hover:bg-red-600/90"
                      >
                        <span>Unsave</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <AlertTriangle className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Saved Colleges Yet</h3>
                <p className="text-slate-400">Browse colleges and save your favorites to see them here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;