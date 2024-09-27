import React from 'react';
import './CharacterList.css';

const CharacterList = ({ characters, onSelectCharacter }) => {
  return (
    <div className="character-list">
      <h3>Your Characters</h3>
      <ul>
        {characters.map((character, index) => (
          <li key={index} onClick={() => onSelectCharacter(character)}>
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
