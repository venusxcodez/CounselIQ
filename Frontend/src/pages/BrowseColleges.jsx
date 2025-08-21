import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Star, MapPin, DollarSign, ExternalLink, GraduationCap, Bookmark } from 'lucide-react';

function BrowseColleges() {
    const [colleges, setColleges] = useState([]);
    const [savedColleges, setSavedColleges] = useState([]); 
    const [filters, setFilters] = useState({
        stream: "",
        exam: "",
        rating_gte: "",
        sort_by: "",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchColleges();
        fetchSavedColleges(); 
    }, [filters]);

    const fetchColleges = async () => {
        let query = new URLSearchParams();

        if (filters.stream) query.append("stream", filters.stream);
        if (filters.exam) query.append("exam", filters.exam);
        if (filters.rating_gte) query.append("rating_gte", filters.rating_gte);
        if (filters.sort_by) query.append("sort_by", filters.sort_by);

        try { 
            const res = await fetch(`http://127.0.0.1:8000/colleges/?${query.toString()}`);
            const data = await res.json();
            setColleges(data);
        } catch (err) {
            console.error("Error fetching colleges:", err);
            setColleges([]);
        }
    };

    const fetchSavedColleges = async () => {
        try {
            if (!token) {
                setSavedColleges([]);
                return;
            }

            const res = await fetch("http://127.0.0.1:8000/colleges/saved/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });

            if (res.status === 401) {
                setSavedColleges([]);
                return;
            }

            if (res.ok) {
                const data = await res.json();
                setSavedColleges(data.map(item => ({
                    collegeId: item.college.id,
                    savedId: item.id
                })));
            } else { 
                console.error("Failed to fetch saved colleges:", res.status, await res.text());
            }
        } catch (err) {
            console.error("Network error fetching saved colleges:", err); 
        }
    };

    const toggleSaveCollege = async (collegeId) => {
        if (!token) {
            navigate("/login");
            return;
        }

        const isSaved = savedColleges.some(c => c.collegeId === collegeId);

        try {
            if (isSaved) {
                const savedItem = savedColleges.find(c => c.collegeId === collegeId);
                if (!savedItem) return;

                const res = await fetch(`http://127.0.0.1:8000/colleges/saved/${savedItem.savedId}/delete/`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                });

                if (res.status === 401) {
                    navigate('/login');
                    return;
                }

                if (res.ok) {
                    setSavedColleges(savedColleges.filter(c => c.collegeId !== collegeId));
                } else {
                    console.error("Failed to unsave college (backend issue):", res.status, await res.text());
                }

            } else {
                const res = await fetch(`http://127.0.0.1:8000/colleges/saved/add/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Token ${token}`,
                    },
                    body: JSON.stringify({ college: collegeId }),
                });

                if (res.status === 401) {
                    navigate('/login');
                    return;
                }

                if (res.ok) {
                    const savedData = await res.json();
                    setSavedColleges([...savedColleges, {
                        collegeId: collegeId,
                        savedId: savedData.id
                    }]);
                } else {
                    console.error("Failed to save college (backend issue):", res.status, await res.text());
                }
            }
        } catch (err) {
            console.error("Network or unexpected error during save/unsave:", err);
        }
    };

    const isCollegeSaved = (collegeId) => savedColleges.some(c => c.collegeId === collegeId);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const clearFilters = () => {
        setFilters({ stream: "", exam: "", rating_gte: "", sort_by: "" });
    };

    return (
        <div className="min-h-screen py-8 bg-slate-900 text-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">Browse Colleges</h1>
                    <p className="text-slate-400">
                        Explore colleges and universities across India with detailed information and direct links.
                    </p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
                    <div className="grid lg:grid-cols-6 gap-4 mb-4">
                        <div>
                            <select
                                name="stream"
                                value={filters.stream}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="">All Streams</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Medical">Medical</option>
                                <option value="Arts_Commerce">Arts & Commerce</option>
                            </select>
                        </div>

                        <div>
                            <select
                                name="exam" 
                                value={filters.exam}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="">All Exams</option>
                                <option value="JEE">JEE</option>
                                <option value="NEET">NEET</option>
                                <option value="CUET">CUET</option>
                            </select>
                        </div>

                        <div>
                            <select
                                name="rating_gte"
                                value={filters.rating_gte}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="">Any Rating</option>
                                <option value="4">4★ & above</option>
                                <option value="3">3★ & above</option>
                                <option value="2">2★ & above</option>
                            </select>
                        </div>

                        <div>
                            <select
                                name="sort_by"
                                value={filters.sort_by}
                                onChange={handleFilterChange}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="">Sort By</option>
                                <option value="rating">Rating (High → Low)</option>
                                <option value="fees">Fees (Low → High)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-slate-400">
                            Showing {colleges.length} colleges 
                        </div>
                        <button
                            onClick={clearFilters}
                            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                    {colleges.length > 0 ? (
                        colleges.map((college) => (
                            <div
                                key={college.id}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 flex flex-col h-full"
                            >

                                <img
                                    src={college.image || `https://placehold.co/400x300/1e293b/a5f3fc?text=No+Image`}
                                    alt={college.name}
                                    className="w-full h-48 object-cover flex-shrink-0"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/1e293b/a5f3fc?text=No+Image`; }} 
                                />
                                
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{college.name}</h3>
                                        </div>
                          
                                        {college.rating && (
                                            <div className="flex items-center space-x-1 bg-emerald-500/20 px-2 py-1 rounded-full">
                                                <Star className="h-3 w-3 text-emerald-400 fill-current" />
                                                <span className="text-emerald-400 text-xs font-medium">{college.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        {college.location && (
                                            <div className="flex items-center space-x-2 text-slate-300">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                                <span className="text-sm">{college.location}</span>
                                            </div>
                                        )}
                                    
                                        {college.fees && (
                                            <div className="flex items-center space-x-2 text-slate-300">
                                                <DollarSign className="h-4 w-4 text-slate-400" />
                                                <span className="text-sm">Fees(in K): ₹{college.fees}</span>
                                            </div>
                                        )}
                     
                                        {college.exam && (
                                            <div className="flex items-center space-x-2 text-slate-300">
                                                <GraduationCap className="h-4 w-4 text-slate-400" />
                                                <span className="text-sm">{college.exam} Exam</span>
                                            </div>
                                        )}
                                    </div>


                                    <div className="flex justify-between items-center gap-2 mt-auto">
                                        {college.website && (
                                            <a
                                                href={college.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-grow inline-flex items-center justify-center py-2 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-sm font-medium rounded-lg transition-all duration-200"
                                            >
                                                Visit Website
                                                <ExternalLink className="h-4 w-4 ml-2" />
                                            </a>
                                        )}
                                        
                                        <button
                                            onClick={() => toggleSaveCollege(college.id)}
                                            className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors duration-200 shadow-md ${
                                                isCollegeSaved(college.id) 
                                                    ? 'bg-red-500/80 text-white hover:bg-red-600/90' 
                                                    : 'bg-emerald-500/80 text-white hover:bg-emerald-600/90'
                                            }`}
                                            aria-label={isCollegeSaved(college.id) ? "Unsave college" : "Save college"}
                                            title={isCollegeSaved(college.id) ? "Unsave college" : "Save college"}
                                        >
                                            <Bookmark className={`h-5 w-5 ${isCollegeSaved(college.id) ? 'fill-current' : ''}`} />
                                            <span>{isCollegeSaved(college.id) ? "Unsave" : "Save"}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) 
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <Filter className="h-16 w-16 text-slate-600 mx-auto mb-4" /> 
                            <h3 className="text-xl font-semibold text-white mb-2">No colleges found</h3>
                            <p className="text-slate-400">Try adjusting your search criteria or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BrowseColleges;