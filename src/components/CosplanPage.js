import React, { useState } from 'react';
import './CosplanPage.css';
import CharacterList from './CharacterList';
import CharacterStylingTab from './CharacterStylingTab';
import PropMakingTab from './PropMakingTab';
import ShoppingListTab from './ShoppingListTab';
import PhotoshootMoodboardTab from './PhotoshootMoodboardTab';

const CosplanPage = () => {
  // Initialize state for characters
  const [characters, setCharacters] = useState([
    { name: 'Character 1', game: 'Game A', image: '/images/character1.png' },
    { name: 'Character 2', game: 'Game B', image: '/images/character2.png' },
    { name: 'Character 3', game: 'Game C', image: '/images/character3.png' }
  ]);

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [activeTab, setActiveTab] = useState('Character & Styling');
  
  const [newCharacter, setNewCharacter] = useState({ name: '', game: '', image: '' });
  const [isAddingCharacter, setIsAddingCharacter] = useState(false);

  const [characterData, setCharacterData] = useState(
    characters.reduce((acc, char) => {
      acc[char.name] = {
        characterStyling: { text: '', images: [] },
        propMaking: { text: '', images: [] },
        shoppingList: [{ item: '', done: false }],
        moodboard: { text: '', images: [] }
      };
      return acc;
    }, {})
  );

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setActiveTab('Character & Styling');
  };

  const handleTextChange = (e, tab) => {
    const updatedData = { ...characterData[selectedCharacter.name] };
    if (tab === 'Character & Styling') updatedData.characterStyling.text = e.target.value;
    if (tab === 'Prop Making') updatedData.propMaking.text = e.target.value;
    if (tab === 'Photoshoot Moodboard') updatedData.moodboard.text = e.target.value;

    setCharacterData({
      ...characterData,
      [selectedCharacter.name]: updatedData
    });
  };

  const handleImageChange = (e, tab) => {
    const files = Array.from(e.target.files);
    const updatedData = { ...characterData[selectedCharacter.name] };
    if (tab === 'Character & Styling') updatedData.characterStyling.images = files;
    if (tab === 'Prop Making') updatedData.propMaking.images = files;
    if (tab === 'Photoshoot Moodboard') updatedData.moodboard.images = files;

    setCharacterData({
      ...characterData,
      [selectedCharacter.name]: updatedData
    });
  };

  const handleAddShoppingItem = () => {
    const updatedData = { ...characterData[selectedCharacter.name] };
    updatedData.shoppingList.push({ item: '', done: false });

    setCharacterData({
      ...characterData,
      [selectedCharacter.name]: updatedData
    });
  };

  const handleShoppingItemChange = (index, value) => {
    const updatedData = { ...characterData[selectedCharacter.name] };
    updatedData.shoppingList[index].item = value;

    setCharacterData({
      ...characterData,
      [selectedCharacter.name]: updatedData
    });
  };

  const handleShoppingItemToggle = (index) => {
    const updatedData = { ...characterData[selectedCharacter.name] };
    updatedData.shoppingList[index].done = !updatedData.shoppingList[index].done;

    setCharacterData({
      ...characterData,
      [selectedCharacter.name]: updatedData
    });
  };

  // Add a new character
  const handleAddCharacter = () => {
    const newChar = { ...newCharacter, image: '/images/default-character.png' }; // default image
    setCharacters([...characters, newChar]);

    // Initialize new character data for tabs
    setCharacterData({
      ...characterData,
      [newChar.name]: {
        characterStyling: { text: '', images: [] },
        propMaking: { text: '', images: [] },
        shoppingList: [{ item: '', done: false }],
        moodboard: { text: '', images: [] }
      }
    });
    
    setNewCharacter({ name: '', game: '', image: '' }); // Reset form
    setIsAddingCharacter(false); // Close form
  };

  return (
    <div className="cosplan-page-container">
      {/* Main Cosplan Page */}
      <div className="cosplan-page">
        <div className="character-header">
          <h1>{selectedCharacter.name}</h1>
          <h3>{selectedCharacter.game}</h3>
        </div>
        <div className="character-image">
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
        </div>
        <div className="tabs">
          {['Character & Styling', 'Prop Making', 'Shopping List', 'Photoshoot Moodboard'].map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === 'Character & Styling' && (
            <CharacterStylingTab
              characterStyling={characterData[selectedCharacter.name].characterStyling}
              handleTextChange={(e) => handleTextChange(e, 'Character & Styling')}
              handleImageChange={(e) => handleImageChange(e, 'Character & Styling')}
            />
          )}

          {activeTab === 'Prop Making' && (
            <PropMakingTab
              propMaking={characterData[selectedCharacter.name].propMaking}
              handleTextChange={(e) => handleTextChange(e, 'Prop Making')}
              handleImageChange={(e) => handleImageChange(e, 'Prop Making')}
            />
          )}

          {activeTab === 'Shopping List' && (
            <ShoppingListTab
              shoppingList={characterData[selectedCharacter.name].shoppingList}
              handleShoppingItemChange={handleShoppingItemChange}
              handleShoppingItemToggle={handleShoppingItemToggle}
              handleAddShoppingItem={handleAddShoppingItem}
            />
          )}

          {activeTab === 'Photoshoot Moodboard' && (
            <PhotoshootMoodboardTab
              moodboard={characterData[selectedCharacter.name].moodboard}
              handleTextChange={(e) => handleTextChange(e, 'Photoshoot Moodboard')}
              handleImageChange={(e) => handleImageChange(e, 'Photoshoot Moodboard')}
            />
          )}
        </div>
        <div className="progress-bar">
          <span>Progress (future work)</span>
        </div>
      </div>

      {/* Character List and Add Character */}
      <CharacterList 
        characters={characters} 
        onSelectCharacter={handleCharacterSelect} 
        onAddCharacter={() => setIsAddingCharacter(true)} 
      />
      
      {/* Add Character Form */}
      {isAddingCharacter && (
        <div className="add-character-modal">
          <h3>Add a new Character</h3>
          <input 
            type="text" 
            placeholder="Character Name" 
            value={newCharacter.name} 
            onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Game/Franchise" 
            value={newCharacter.game} 
            onChange={(e) => setNewCharacter({ ...newCharacter, game: e.target.value })} 
          />
          <button onClick={handleAddCharacter}>Add Character</button>
          <button onClick={() => setIsAddingCharacter(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CosplanPage;