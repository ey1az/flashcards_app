import React, { useState, useEffect, useRef } from "react";
import "./CSS/Flashcard.css";

const FlashCards = ({ flashCard }) => {
  const [turn, setTurn] = useState(false);
  const [height, setHeight] = useState("initial");
  const [status, setStatus] = useState(flashCard.questionStatus || "Want to Learn");
  const [editMode, setEditMode] = useState(false);
  const [editedQuestionTitle, setEditedQuestionTitle] = useState(flashCard.questionTitle);
  const [editedQuestionAnswer, setEditedQuestionAnswer] = useState(flashCard.questionAnswer);
  const [buttonText, setButtonText] = useState(status === "Want to Learn" ? "Mark as Noted" : "Mark as Learned");
  const [isDeleted, setIsDeleted] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  const questionTitleEl = useRef();
  const questionAnswerEl = useRef();
  const questionStatusEl = useRef();

  const handleClick = () => {
    if (!editMode) {
      setTurn(!turn);
    }
  };

  const handleMouseEnter = () => {
    setHeight("auto");
  };

  const handleMouseLeave = () => {
    setHeight("initial");
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:3002/flashCards/${flashCard.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete flashcard. Server responded with ${response.status}`);
      }

      setIsDeleted(true);
      setShowDeletedMessage(true);

    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(true);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(false);
    setTurn(!turn);

    const initialQuestionTitle = flashCard.questionTitle;
    const initialQuestionAnswer = flashCard.questionAnswer;

    const lowercaseOptions = flashCard.questionOptions.map((option) => option.toLowerCase());
    const lowercaseEditedAnswer = editedQuestionAnswer.toLowerCase();

    if (!lowercaseOptions.includes(lowercaseEditedAnswer)) {
      alert("Updated answer must be one of the current options!");
      setEditedQuestionTitle(initialQuestionTitle);
      setEditedQuestionAnswer(initialQuestionAnswer);
      return;
    }

    const currentDate = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    try {
      const response = await fetch(`http://localhost:3002/flashCards/${flashCard.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionTitle: editedQuestionTitle,
          questionAnswer: editedQuestionAnswer,
          questionDate: currentDate,
          questionStatus: "Want to Learn",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit flashcard. Server responded with ${response.status}`);
      }

    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };

  const handleGoBack = () => {
    setEditMode(false);
    setTurn(!turn);
  };

  const handleMarkAsNoted = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const newStatus = status === "Want to Learn" ? "Noted" : "Learned";
      const response = await fetch(`http://localhost:3002/flashCards/${flashCard.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionStatus: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status. Server responded with ${response.status}`);
      }

      setStatus(newStatus);
      setButtonText(newStatus === "Noted" ? "Mark as Learned" : "Mark as Noted");
    } catch (error) {
      console.error('Error updating flashcard status:', error);
    }
  };

  const setMaxHeight = () => {
    if (questionTitleEl.current && questionAnswerEl.current && questionStatusEl.current) {
      const heightQuestionTitle = questionTitleEl.current.getBoundingClientRect().height;
      const heightQuestionAnswer = questionAnswerEl.current.getBoundingClientRect().height;
      const heightQuestionStatus = questionStatusEl.current.getBoundingClientRect().height;
      setHeight(Math.max(heightQuestionTitle, heightQuestionAnswer, heightQuestionStatus, 120));
    }
  };

  useEffect(() => {
    setMaxHeight();
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, [editedQuestionTitle, editedQuestionAnswer]);

  return (
    <div
      key={flashCard.id}
      className={`card ${turn ? "turn" : ""} ${editMode ? "edit-mode" : ""}`}
      style={{ height: height }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showDeletedMessage ? (
        <div className="deleted-message">Successfully Deleted!</div>
      ) :
        (isDeleted ? null : editMode ? (
          <EditView
            editedQuestionTitle={editedQuestionTitle}
            editedQuestionAnswer={editedQuestionAnswer}
            handleTitleChange={(e) => setEditedQuestionTitle(e.target.value)}
            handleAnswerChange={(e) => setEditedQuestionAnswer(e.target.value)}
            handleUpdateClick={handleUpdateClick}
            handleGoBack={handleGoBack}
          />
        ) : (
          <DisplayView
            questionTitle={editedQuestionTitle}
            questionOptions={flashCard.questionOptions}
            questionAnswer={editedQuestionAnswer}
            turn={turn}
            buttonText={buttonText}
            handleMarkAsNoted={handleMarkAsNoted}
            height={height}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            status={status}
            questionTitleEl={questionTitleEl}
            questionAnswerEl={questionAnswerEl}
          />
        ))}
    </div>
  );
};

const EditView = ({
  editedQuestionTitle,
  editedQuestionAnswer,
  handleTitleChange,
  handleAnswerChange,
  handleUpdateClick,
  handleGoBack,
}) => (
  <>
    <input
      className="updateTitle"
      type="text"
      id="updateTitle"
      value={editedQuestionTitle}
      onChange={handleTitleChange}
      onClick={(e) => e.stopPropagation()}
    />
    <input
      className="updateAnswer"
      type="text"
      id="updateAnswer"
      value={editedQuestionAnswer}
      onChange={handleAnswerChange}
      onClick={(e) => e.stopPropagation()}
    />
    <div className="edit-buttons">
      <button className="updateBtnEditMode" onClick={handleUpdateClick}>
        Update
      </button>
      <button className="goBackBtnEditMode" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  </>
);

const DisplayView = ({
  questionTitle,
  questionOptions,
  questionAnswer,
  turn,
  buttonText,
  handleMarkAsNoted,
  height,
  handleDeleteClick,
  handleEditClick,
  status,
  questionTitleEl,
  questionAnswerEl,
}) => (
  <>
    {!turn && (
      <div className="questionTitle" ref={questionTitleEl}>
        <div>{questionTitle}</div>
        <ul className="questionOptions">
          {questionOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
    )}
    <div className="questionAnswer" ref={questionAnswerEl}>
      {turn && (
        <div className={`answer ${turn ? "flipped" : ""}`}>{questionAnswer}</div>
      )}
      {turn && (
        <div className={`flashcard-act ${turn ? "flipped" : ""}`}>
          {status !== "Learned" && (
            <button className="noted-button" onClick={handleMarkAsNoted}>
              {buttonText}
            </button>
          )}
        </div>
      )}
    </div>
    {height === "auto" && (
      <div className={`flashcard-act ${turn ? "flipped" : ""}`}>
        <button className="deleteBtn" onClick={handleDeleteClick}>Delete</button>
        <button className="editBtn" onClick={handleEditClick}>Edit</button>
      </div>
    )}
    <div className={`status-corner ${turn ? "flipped" : ""}`}>{status}</div>
  </>
);

export default FlashCards;
