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

};