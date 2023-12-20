import React from 'react';
import Flashcards from './Flashcards';

const FlashcardList = ({ flashCards, onDelete, onEdit, onAddCard}) => (
  <>
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
