import React, { useState } from "react";
import "./CSS/CreateCard.css";

const CreateCard = ({ onCardAdded }) => {
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

    if (!questionTitle || !questionAnswer) {
      alert("Please fill in all required fields: Question Title and Question Answer.");
      return;
    }

    if (!questionOptions.map(option => option.toLowerCase()).includes(questionAnswer.toLowerCase())) {
      alert("Please make sure that one of the options is equal to the answer.");
      return;
    }

    const { questionDate } = getCurrentDateTime();

    try {
      const response = await fetch("http://localhost:3002/flashCards");
      if (!response.ok) {
        throw new Error(`Failed to fetch flashcards. Server responded with ${response.status}`);
      }

      const flashCards = await response.json();

      const maxQuestionOrder = flashCards.reduce((maxOrder, card) => {
        return Math.max(maxOrder, card.questionOrder || 0);
      }, 0);

      const newCard = {
        id: flashCards.length + 1,
        questionTitle,
        questionOptions,
        questionAnswer,
        questionDate,
        questionStatus: "Want to Learn",
        questionOrder: maxQuestionOrder + 1,
      };

      const addNewCardResponse = await fetch("http://localhost:3002/flashCards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      if (!addNewCardResponse.ok) {
        throw new Error(`Failed to add flashcard. Server responded with ${addNewCardResponse.status}`);
      }

      onCardAdded(newCard);

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
              id="questionTitle"
              name="questionTitle"
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
                id={`option-${index}`}
                name={`option-${index}`}
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
              id="questionAnswer"
              name="questionAnswer"
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