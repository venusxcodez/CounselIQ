import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { User, Save, ArrowLeft } from 'lucide-react'; 

const STATES = [
  "Maharashtra",
  "Gujarat",
  "Delhi",
  "Karnataka",
  "West Bengal",
  "Tamil Nadu",
];

const EXAM_TYPES = [
  { value: 'JEE', label: 'JEE Mains' },
  { value: 'NEET', label: 'NEET UG' },
  { value: 'CUET', label: 'CUET UG' }
];

const CATEGORIES = [
  { value: 'GEN', label: 'General' },
  { value: 'OBC', label: 'OBC' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'EWS', label: 'EWS' }
];

const STREAMS = [
  "Computer Science and Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics & Communication",
  "Information Technology",
  "Chemical Engineering",
  "MBBS",
  "Dental",
  "Physiotherapy",
  "Ayurvedic",
  "BBA",
  "BCA",
  "BSc"
];

function ProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    exam_type: "",
    category: "",
    state: "",
    preferred_streams: [],
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8000/accounts/profile/${userId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setFormData({
          ...data,
          preferred_streams: data.preferred_streams || [],
        });
      })
      .catch(err => console.error("Error fetching profile:", err)); 
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "preferred_streams" && type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        preferred_streams: checked
          ? [...prev.preferred_streams, value]
          : prev.preferred_streams.filter((v) => v !== value),
      }));
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:8000/accounts/profile/${userId}/`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}` 
          }
        }
      );
      alert("Profile updated successfully!");
      navigate('/dashboard');
      console.log("Profile update response:", response.data);
    } catch (err) {
      console.error("Error updating profile:", err); 
    }
  };

  return (
    <div className="min-h-screen py-8 bg-slate-900 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()} 
            className="inline-flex items-center text-slate-400 hover:text-emerald-400 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <p className="text-slate-400">Update your information for better predictions</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Academic Information</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="exam_type" className="block text-sm font-medium text-slate-300 mb-2">
                    Exam Type
                  </label>

                  <select
                    id="exam_type"
                    name="exam_type"
                    value={formData.exam_type || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="" hidden>Select Exam</option>
                    {EXAM_TYPES.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                
                  <select
                    id="category"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="" hidden>Select Category</option>
                    {CATEGORIES.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-slate-300 mb-2">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="" hidden>Select State</option>
                    {STATES.map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Preferred Streams</h3>
              <p className="text-slate-400 mb-4">Select the streams you're interested in (you can select multiple)</p>
              <div className="grid md:grid-cols-3 gap-3">
                {STREAMS.map(stream => (
                  <label
                    key={stream}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-slate-600 hover:border-emerald-500/50 cursor-pointer transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      name="preferred_streams"
                      value={stream}
                      checked={formData.preferred_streams.includes(stream)}
                      onChange={handleChange}
                      className="w-4 h-4 text-emerald-500 bg-slate-700 border-slate-600 rounded focus:ring-emerald-500 focus:ring-2"
                    />
                    <span className="text-slate-300 text-sm">{stream}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.history.back()} 
                className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;