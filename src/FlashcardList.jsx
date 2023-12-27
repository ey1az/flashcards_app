import React from 'react';
import CreateCard from "./CreateCard";
import SearchFilterSortCard from "./SearchFilterSortCard";

const FlashcardList = () => (
  <>
    <div>
      <CreateCard />
    </div>
    <div>
      <SearchFilterSortCard />
    </div>
  </>
);

export default FlashcardList;