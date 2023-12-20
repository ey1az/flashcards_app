import React, { useState } from "react";
import "./CSS/CreateCard.css";

const CreateCard = ({ onAddCard }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionOptions, setQuestionOptions] = useState(["", "", "", ""]);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [showForm, setShowForm] = useState(false);
}

export default CreateCard;