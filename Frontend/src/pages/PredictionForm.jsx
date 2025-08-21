import React, { useState } from "react";
import { Target, TrendingUp, Award, AlertCircle, Star, MapPin, DollarSign, ExternalLink, GraduationCap, Bookmark } from 'lucide-react';

const PredictionForm = () => {
  const [collegeName, setCollegeName] = useState("");
  const [userMarks, setUserMarks] = useState("");
  const [predictions, setPredictions] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error,setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPredictions([]); 
    setIsLoading(true); 

    try {
      var userToken = localStorage.getItem("token")
      const response = await fetch("http://localhost:8000/prediction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${userToken}`
        },
        body: JSON.stringify({
          college_name: collegeName,
          user_marks: userMarks,
        }),
      });

      const data = await response.json();
      if (data.detail) {
        setError(data.detail);
        setPredictions([]);
      } else {
        console.log(data.results.predictions);
        setPredictions(data.results.predictions || []); 
      }
    } catch (err) {
      console.error(err);
      setPredictions([]); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">College Admission Predictions</h1>
          <p className="text-slate-400">
            Get AI-powered predictions for your admission chances based on historical data and cutoff trends.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-6">Enter Your Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="collegeName" className="block text-sm font-medium text-slate-300 mb-2">
                    Select College
                  </label>
                  <select
                    id="collegeName"
                    name="collegeName"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)} 
                    required
                    className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="" hidden>-- Select a College --</option>
                    <option value="AIIMS Delhi">AIIMS Delhi</option>
                    <option value="BITS Pilani">BITS Pilani</option>
                    <option value="CMC Vellore">CMC Vellore</option>
                    <option value="Christ University Bengaluru">Christ University Bengaluru</option>
                    <option value="DU Delhi">DU Delhi</option>
                    <option value="IIIT Hyderabad">IIIT Hyderabad</option>
                    <option value="IIT Bombay">IIT Bombay</option>
                    <option value="IIT Delhi">IIT Delhi</option>
                    <option value="JIPMER Puducherry">JIPMER Puducherry</option>
                    <option value="KEM Mumbai">KEM Mumbai</option>
                    <option value="Lady Shri Ram College Delhi">Lady Shri Ram College Delhi</option>
                    <option value="MIT Pune">MIT Pune</option>
                    <option value="NIT Surathkal">NIT Surathkal</option>
                    <option value="NIT Trichy">NIT Trichy</option>
                    <option value="PGIMER Chandigarh">PGIMER Chandigarh</option>
                    <option value="St. Xavier Kolkata">St. Xavier Kolkata</option>
                    <option value="VIT Vellore">VIT Vellore</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="userMarks" className="block text-sm font-medium text-slate-300 mb-2">
                    Your Marks/Score
                  </label>
                  <input
                    type="number"
                    id="userMarks"
                    name="userMarks"
                    value={userMarks}
                    onChange={(e) => setUserMarks(e.target.value)} 
                    required
                    className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your score"
                  />
                </div>

                {error && (
          <div className="text-red-400 font-semibold text-md" style={{ marginTop: "8px" }}>
            {error}
          </div>
        )}

                <button
                  type="submit"
                  disabled={isLoading} 
                  className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Get Predictions
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            {predictions && predictions.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Prediction Results</h3>
                      <p className="text-slate-400">{collegeName} - All Streams</p> 
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {predictions.map((pred, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-medium text-white">{pred.stream}</h4>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mb-4"> 
                          <div>
                            <div className="text-sm text-slate-400">Admission Probability</div>
                            <div className="text-2xl font-bold text-emerald-400">
                              {pred.prediction ? `${pred.prediction}%` : pred.error || "N/A"}
                            </div>
                          </div>
                        </div>

                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: pred.prediction ? `${pred.prediction}%` : '0%' }} 
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Important Notes</h4>
                      <ul className="text-slate-300 space-y-1 text-sm">
                        <li>• Predictions are based on historical cutoff data and trends</li>
                        <li>• Actual cutoffs may vary based on exam difficulty and seat availability</li>
                        <li>• Consider applying to colleges with different probability ranges</li>
                        <li>• Keep backup options and explore multiple colleges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
                <TrendingUp className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Ready for Predictions?</h3>
                <p className="text-slate-400">
                  Fill in your details on the left to get personalized admission probability predictions
                  for your preferred streams at your chosen college.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;