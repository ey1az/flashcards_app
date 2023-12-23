import React, { useState, useEffect } from "react";
import Flashcards from "./Flashcards";
import "./CSS/SearchFilterSortCard.css";

const SearchFilterSortCard = ({ flashCards, onDelete, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const [visibleFlashcards, setVisibleFlashcards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const cardsPerPage = 9;

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
  };

  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    setSelectedSortOption(sortOption);
  };

  const getSortingFunction = () => {
    switch (selectedSortOption) {
      case "ID":
        return (f1, f2) => f1.id - f2.id;
      case "Question":
        return (f1, f2) => f1.questionTitle.localeCompare(f2.questionTitle);
      case "Answer":
        return (f1, f2) => f1.questionAnswer.localeCompare(f2.questionAnswer);
      default:
        return (f1, f2) => new Date(f2.questionDate) - new Date(f1.questionDate);
    }
  };

  const handleCardSelect = (cardId) => {
    setSelectedCards((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(cardId)) {
        newSelected.delete(cardId);
      } else {
        newSelected.add(cardId);
      }
      return newSelected;
    });
  };

  const handleShareSelected = () => {
    const selectedCardDetails = flashCards
      .filter((card) => selectedCards.has(card.id))
      .map(({ id, questionTitle, questionAnswer, questionOptions, questionDate, questionStatus }) => ({
        id,
        questionTitle,
        questionAnswer,
        questionOptions,
        questionDate,
        questionStatus
      }));

    const jsonData = JSON.stringify(selectedCardDetails, null, 2);
    const mailtoLink = `mailto:?subject=Flashcards Details&body=${encodeURIComponent(jsonData)}`;
    window.open(mailtoLink, '_blank');
    setSelectedCards(new Set());
  };

  const filteredFlashCards = visibleFlashcards
    .filter((flashCard) => {
      const searchString = searchText.toLowerCase();

      return (
        flashCard.questionTitle.toLowerCase().includes(searchString) ||
        flashCard.questionOptions.some((option) => option.toLowerCase().includes(searchString)) ||
        flashCard.questionAnswer.toLowerCase().includes(searchString)
      );
    })
    .filter((flashCard) => {
      if (selectedStatus === "all") {
        return true;
      } else {
        return flashCard.questionStatus === selectedStatus;
      }
    })
    .sort(getSortingFunction());

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search flashcards..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="filter-opt">
        <label className="filter-opt-select">
          Filter by Status:
          <select onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
            <option value="Learned">Learned</option>
          </select>
        </label>
        <label>
          Sort by:
          <select onChange={handleSortChange}>
            <option value="default">Date</option>
            <option value="ID">ID</option>
            <option value="Question">Question</option>
            <option value="Answer">Answer</option>
          </select>
        </label>
      <div className="share-button">
        {selectedCards.size > 0 && (
          <button onClick={handleShareSelected}>Share Selected</button>
        )}
      </div>
      </div>
      <div className="card-cont">
        {filteredFlashCards.map((flashCard) => (
          <div key={flashCard.id} className="flashcard-item">
            <Flashcards
              flashCard={flashCard}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFilterSortCard;