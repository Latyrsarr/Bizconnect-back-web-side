// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import PrkwNous from './pages/PrkwNous/PrkwNous';
import Services from './pages/Services/services';
import Team from './pages/Team/Team';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-us" element={<PrkwNous />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
