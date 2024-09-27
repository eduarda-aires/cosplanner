import React, { useState } from 'react';
import './CosplanPage.css';
import CharacterList from './CharacterList';
import CharacterStylingTab from './CharacterStylingTab';
import PropMakingTab from './PropMakingTab';
import ShoppingListTab from './ShoppingListTab';
import PhotoshootMoodboardTab from './PhotoshootMoodboardTab';

const CosplanPage = () => {
  // Sample characters list
  const characters = [
    { name: 'Character 1', game: 'Game A', image: '/images/character1.png' },
    { name: 'Character 2', game: 'Game B', image: '/images/character2.png' },
    { name: 'Character 3', game: 'Game C', image: '/images/character3.png' }
  ];

  // State for currently selected character and active tab
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [activeTab, setActiveTab] = useState('Character & Styling');

  // Initialize state for each character's individual tab data
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

  // Handle character selection
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setActiveTab('Character & Styling');
  };

  // Update character data in state for each tab
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

  return (
    <div className="cosplan-page-container">
      {/* Main Cosplan Page */}
      <div className="cosplan-page">
        {/* Character Header */}
        <div className="character-header">
          <h1>{selectedCharacter.name}</h1>
          <h3>{selectedCharacter.game}</h3>
        </div>

        {/* Character Image */}
        <div className="character-image">
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
        </div>

        {/* Tabs */}
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

        {/* Tab Content */}
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

        {/* (Future Work) Progress Bar */}
        <div className="progress-bar">
          <span>Progress (future work)</span>
        </div>
      </div>

      {/* Character List on the Right */}
      <CharacterList characters={characters} onSelectCharacter={handleCharacterSelect} />
    </div>
  );
};

export default CosplanPage;
