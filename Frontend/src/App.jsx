import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Educations from './pages/Educations'
import Experiences from './pages/Experiences'
import ResearchPaper from './pages/Research-Paper'
import Achievements from './pages/Achievements'
import Blog from './pages/Blog'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/Educations" exact={true} element={<Educations />} />
          <Route path="/Experiences" exact={true} element={<Experiences />} />
          <Route path="/ResearchPaper" exact={true} element={<ResearchPaper />} />
          <Route path="/Achievements" exact={true} element={<Achievements />} />
          <Route path="/Blog" exact={true} element={<Blog />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
