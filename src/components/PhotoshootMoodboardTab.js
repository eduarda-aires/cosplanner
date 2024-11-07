import React, { useState } from 'react';
import './PhotoshootMoodboardTab.css';

const PhotoshootMoodboardTab = ({ moodboard, handleTextChange, handleImageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState(moodboard.keywords || []);

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className="moodboard-container">
      <h3>Photoshoot Moodboard</h3>
      
      {/* Keywords Section */}
      <div className="keyword-section">
        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="Add a keyword"
          className="keyword-input"
        />
        <button onClick={addKeyword} className="add-keyword-button">Add</button>
        
        <div className="keyword-list">
          {keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
              <button onClick={() => removeKeyword(index)} className="remove-keyword-button">&times;</button>
            </span>
          ))}
        </div>
      </div>

      {/* Text Notes Section */}
      <textarea
        value={moodboard.text}
        onChange={handleTextChange}
        placeholder="Add your notes here..."
        className="moodboard-textarea"
      />
      
      {/* Image Upload Section */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: '10px' }}
      />

      {/* Image Gallery */}
      <div className="image-gallery">
        {moodboard.images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Moodboard Inspiration ${index + 1}`}
            onClick={() => openModal(imgSrc)}
          />
        ))}
      </div>

      {/* Modal for viewing images in full size */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default PhotoshootMoodboardTab;
