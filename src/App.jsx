import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import FlashcardList from "./FlashcardList";
import ContactMe from "./ContactMe";

import "./CSS/App.css";

const App = ({ flashCards }) => {
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
            <li>
              <Link to="/contact-me-page">Contact Me</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/assignment3_wm1" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route
            path="/flashcards-page"
            element={<FlashcardList flashCards={flashCards} />}
          />
          <Route path="/contact-me-page" element={<ContactMe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;