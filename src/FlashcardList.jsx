import React from 'react';
import Flashcards from './Flashcards';
import CreateCard from "./CreateCard";

const FlashcardList = ({ flashCards, onDelete, onEdit, onAddCard}) => (
  <>
      <div>
      <CreateCard onAddCard={onAddCard} />
      </div>
      <div className="card-cont">
      {flashCards
        .map((flashCard) => (
          <Flashcards
            key={flashCard.id}
            flashCard={flashCard}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
  </>
);

export default FlashcardList;
