import React, { useState } from 'react';
import './PhotoshootMoodboardTab.css';

const PhotoshootMoodboardTab = ({ moodboard, handleTextChange, handleImageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  return (
    <div className="moodboard-container">
      <h3>Photoshoot Moodboard</h3>
      
      <textarea
        value={moodboard.text}
        onChange={handleTextChange}
        placeholder="Add keywords or inspiration notes here..."
        className="moodboard-textarea"
      />
      
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: '10px' }}
      />

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

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default PhotoshootMoodboardTab;
