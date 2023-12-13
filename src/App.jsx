import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import Flashcards from "./Flashcards";

import "./CSS/App.css";

function App() {
  return (
    <Router>
      <div className="App">

        <nav>
          <ul>
            <li>
              <Link to="/home-page">Home Page</Link>
            </li>
            <li>
              <Link to="/flashcards-page">Flashcards</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/assignment3_wm1" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/flashcards-page" element={<Flashcards />} />
        </Routes>

      </div>
    </Router>
  );
}
export default App;