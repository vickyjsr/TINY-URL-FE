import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlShortener from './components/UrlShortener';
import Redirect from './components/Redirect';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UrlShortener />} />
          <Route path="/:code" element={<Redirect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
