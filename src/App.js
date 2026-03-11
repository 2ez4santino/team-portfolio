import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import AlfonsoPortfolio from './portfolios/AlfonsoPortfolio';
import MarcyPortfolio from './portfolios/MarcyPortfolio';
import RhamPortfolio from './portfolios/RhamPortfolio';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="route-transition-shell" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio/alfonso-ragadio" element={<AlfonsoPortfolio />} />
        <Route path="/portfolio/marcy-villegas" element={<MarcyPortfolio />} />
        <Route path="/portfolio/rham-ponce" element={<RhamPortfolio />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <header className="navbar">
        <span className="navbar-brand">TITLE HERE</span>
        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">Meet the Team</NavLink></li>
        </ul>
      </header>

      <main>
        <AnimatedRoutes />
      </main>

      <footer className="footer">
        <p>© 2026 TeamPortfolio. Built with React.</p>
      </footer>
    </Router>
  );
}

export default App;
