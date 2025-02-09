import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Educations from './pages/Educations'
import Experiences from './pages/Experiences'
import Achievements from './pages/Achievements'
import Blog from './pages/Blog'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Error from "./pages/Error";
import ResearchPaperList from "./pages/Research/ResearchPaperList";
import ResearchPaperDetait from "./pages/Research/ResearchPaperDetail";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/Educations" exact={true} element={<Educations />} />
          <Route path="/Experiences" exact={true} element={<Experiences />} />
          <Route path="/Achievements" exact={true} element={<Achievements />} />
          <Route path="/Blog" exact={true} element={<Blog />} />
          <Route path="/ResearchPaper" element={<ResearchPaperList />} />
          <Route path="/research-paper/:id" element={<ResearchPaperDetait />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>

      </BrowserRouter>
    </>
  );
}

export default App;
