// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import PatientListPage from './components/PatientListPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import DoctorRegistration from './components/DoctorRegistration';
import DoctorListPage from './components/DoctorListPage';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
           <h1>Patient Management System</h1>
         </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/patients-list" element={<PatientListPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctorRegistration" element={<DoctorRegistration/>}/>
          <Route path="/doctors-list" element={<DoctorListPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
