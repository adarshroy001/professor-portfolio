import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Education from './pages/Education';
import Experience from './pages/Experience';
import ResearchPapers from './pages/ResearchPapers';
import Achievements from './pages/Achievements';
import Blogs from './pages/Blogs';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
              <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/research-papers" element={<ResearchPapers />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/blogs" element={<Blogs />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;