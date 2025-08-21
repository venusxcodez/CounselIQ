import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CareerRoadmap from './pages/CareerRoadmap';
import Signup from './pages/Signup';
import ProfileForm from './pages/ProfileForm';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PredictionForm from './pages/PredictionForm';
import BrowseColleges from './pages/BrowseColleges';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import { useState,useEffect } from 'react';

const PrivateRoute = ({ children,token }) => {
  // const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(()=> {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <Navbar/>
      <div className='pt-16'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path = '/about' element={<About/>}/>
        <Route path='/signup' element={<Signup setToken={setToken}/>} />
        <Route path='/profileform' element={<ProfileForm />} />
        <Route 
          path='/prediction' 
          element={
            <PrivateRoute token ={token}>
              <PredictionForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/career-roadmap' 
          element={
            <PrivateRoute token ={token}>
              <CareerRoadmap/>
            </PrivateRoute>
          } 
        />
        <Route path='/login' element={<Login setToken={setToken}/>} />
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoute token={token}>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route path='/colleges' element={<BrowseColleges />} />
      </Routes>
      <ChatWidget/>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;