import React, { useState } from "react";
import "./CSS/CreateCard.css";

const CreateCard = ({ onAddCard }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionOptions, setQuestionOptions] = useState(["", "", "", ""]);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [showForm, setShowForm] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    return {
      questionDate: formattedDateTime,
    };
  };

  const handleAddCard = async () => {

    if (!questionOptions.includes(questionAnswer)) {
        alert("Please make sure that one of the options is equal to the answer.");
        return;
    }

    const { questionDate } = getCurrentDateTime();

    const newCard = {
      questionTitle,
      questionOptions,
      questionAnswer,
      questionDate,
      questionStatus: "Want to Learn",
    };

    try {
      const response = await fetch("http://localhost:3001/flashCards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      if (!response.ok) {
        throw new Error(`Failed to add flashcard. Server responded with ${response.status}`);
      }

      const addedCard = await response.json();
      onAddCard(addedCard);
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }

    setQuestionTitle("");
    setQuestionOptions(["", "", "", ""]);
    setQuestionAnswer("");
    setShowForm(false); 
  };

  return (
    <div className="add-card">
      <button className="add-intf-btn" onClick={() => setShowForm(!showForm)}>Click to add a FlashCard</button>
      {showForm && (
        <>
          <h3>Add a New Flashcard</h3>
          <label>
            Question Title:
            <input
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
          </label>
          <label>
            Question Options:
            {questionOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...questionOptions];
                  updatedOptions[index] = e.target.value;
                  setQuestionOptions(updatedOptions);
                }}
              />
            ))}
          </label>
          <label>
            Question Answer:
            <input
              type="text"
              value={questionAnswer}
              onChange={(e) => setQuestionAnswer(e.target.value)}
            />
          </label>
          <button className="add-card-btn" onClick={handleAddCard}>Add Card</button>
        </>
      )}
    </div>
  );
};

export default CreateCard;