import React, { useState, useEffect, useCallback } from "react";
import Flashcards from "./Flashcards";
import "./CSS/SearchFilterSortCard.css";

const SearchFilterSortCard = ({ flashCards, onDelete, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  const [visibleFlashcards, setVisibleFlashcards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [noMoreFlashcards, setNoMoreFlashcards] = useState(false);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [currentCard, setCurrentCard] = useState(null);
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
      case "Date":
        return (f1, f2) => new Date(f2.questionDate) - new Date(f1.questionDate);
      default:
        return (f1, f2) => {
          if (f1.questionOrder > f2.questionOrder) {
            return 1;
          } else {
            return -1;
          }
        };
    }
  };

  const handleLoadMore = useCallback(async () => {
    try {
      setSearchText("");
      setSelectedStatus("all");

      setLoadMore(true);

      const response = await fetch(
        `http://localhost:3001/flashCards?_page=${currentPage + 1}&_limit=${cardsPerPage}&_sort=questionDate&_order=desc`
      );

      if (!response.ok) {
        throw new Error(`Failed to load more flashcards. Server responded with ${response.status}`);
      }

      const newFlashcards = await response.json();

      if (newFlashcards.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));

        setVisibleFlashcards((prevVisible) => [...prevVisible, ...newFlashcards]);
        setCurrentPage((prevPage) => prevPage + 1);
      } else {
        setNoMoreFlashcards(true);
      }
    } catch (error) {
      console.error("Error loading more flashcards:", error);
    }
    finally {
      setLoadMore(false);
    }
  }, [currentPage, cardsPerPage]);

  const handleScroll = useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (!loadMore && !noMoreFlashcards && scrollHeight - scrollTop <= clientHeight + 1) {
      handleLoadMore();
    }
  }, [handleLoadMore, loadMore, noMoreFlashcards]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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

  useEffect(() => {
    const fetchInitialFlashcards = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/flashCards?_page=1&_limit=${cardsPerPage}&_sort=questionDate&_order=desc`
        );
  
        if (!response.ok) {
          throw new Error(`Failed to fetch initial flashcards. Server responded with ${response.status}`);
        }
  
        const initialFlashcards = await response.json();
        setVisibleFlashcards(initialFlashcards);
      } catch (error) {
        console.error("Error fetching initial flashcards:", error);
      }
    };
  
    fetchInitialFlashcards();
  }, [cardsPerPage]);
  
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