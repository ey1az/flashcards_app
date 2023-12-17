import React, { useState, useEffect, useRef } from "react";
import "./CSS/Flashcard.css";

const FlashCards = ({ flashCard, onDelete, onEdit}) => {
  const [turn, setTurn] = useState(false);
  const [height, setHeight] = useState("initial");
  const [status, setStatus] = useState(flashCard.questionStatus || "Want to Learn");
  const [editMode, setEditMode] = useState(false);
  const [editedQuestionTitle, setEditedQuestionTitle] = useState(flashCard.questionTitle);
  const [editedQuestionAnswer, setEditedQuestionAnswer] = useState(flashCard.questionAnswer);
  const [setMarkedAsLearned] = useState(flashCard.questionStatus === "Learned");
  const [buttonText, setButtonText] = useState(status === "Want to Learn" ? "Mark as Noted" : "Mark as Learned");

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
};

export default FlashCards;