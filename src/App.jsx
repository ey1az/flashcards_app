import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import FlashcardList from "./FlashcardList";
import ContactMe from "./ContactMe";

import "./CSS/App.css";

const App = () => {
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/flashcardData.json`)
      .then((response) => response.json())
      .then((data) => {
        const updatedFlashCards = data.flashCards.map((question) => {
          return {
            id: question.id,
            questionTitle: question.questionTitle,
            questionAnswer: question.questionAnswer,
            questionOptions: question.questionOptions,
            questionDate: question.questionDate,
            questionStatus: question.questionStatus,
          };
        });
        setFlashCards(updatedFlashCards);
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  }, []);

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
            element={<FlashcardList flashCards={flashCards}/>}
          />
          <Route path="/contact-me-page" element={<ContactMe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;