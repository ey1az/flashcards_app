import React from 'react';
import CreateCard from "./CreateCard";
import SearchFilterSortCard from "./SearchFilterSortCard";

const FlashcardList = ({ flashCards }) => (
  <>
    <div>
      <CreateCard />
    </div>
    <div>
      <SearchFilterSortCard flashCards={flashCards} />
    </div>
  </>
);

export default FlashcardList;