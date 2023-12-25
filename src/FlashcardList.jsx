import React from 'react';
import CreateCard from "./CreateCard";
import SearchFilterSortCard from "./SearchFilterSortCard";

const FlashcardList = ({ flashCards, onDelete, onEdit, onAddCard}) => (
  <>
    <div>
      <CreateCard onAddCard={onAddCard} />
    </div>
    <div>
      <SearchFilterSortCard flashCards={flashCards} onDelete={onDelete} onEdit={onEdit}/>
    </div>
  </>
);

export default FlashcardList;