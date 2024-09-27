import React, { useState } from 'react';
import './CosplanPage.css';
import CharacterList from './CharacterList';

const CosplanPage = () => {
  // Sample characters list
  const characters = [
    { name: 'Character 1', game: 'Game A', image: '/images/character1.png' },
    { name: 'Character 2', game: 'Game B', image: '/images/character2.png' },
    { name: 'Character 3', game: 'Game C', image: '/images/character3.png' }
  ];

  // State to hold the currently selected character
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);

  // State to control which tab is active
  const [activeTab, setActiveTab] = useState('Character & Styling');

  // Tabs array
  const tabs = ['Character & Styling', 'Prop Making', 'Shopping List', 'Photoshoot Moodboard'];

  // Handle character selection
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    // Optionally reset to the default tab when switching characters
    setActiveTab('Character & Styling');
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

        {/* Tabs for Sections */}
        <div className="tabs">
          {tabs.map((tab, index) => (
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
          {activeTab === 'Character & Styling' && <div>Character & Styling Content</div>}
          {activeTab === 'Prop Making' && <div>Prop Making Content</div>}
          {activeTab === 'Shopping List' && <div>Shopping List Content</div>}
          {activeTab === 'Photoshoot Moodboard' && <div>Photoshoot Moodboard Content</div>}
        </div>

        {/* (Future Work) Progress Bar */}
        <div className="progress-bar">
          <span>Progress (future work)</span>
        </div>
      </div>

      {/* Character List on the Right */}
      <CharacterList
        characters={characters}
        onSelectCharacter={handleCharacterSelect}
      />
    </div>
  );
};

export default CosplanPage;
