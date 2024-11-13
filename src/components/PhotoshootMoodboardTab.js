import React, { useState, useEffect } from 'react';
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

  // Add event listener to listen for the Escape key press to close the modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        setSelectedImage(''); // Optionally clear the selected image
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('keydown', handleEscKey);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

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
        <h4>Keywords</h4>
        <div className="keyword-input-container">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission or other default actions
                addKeyword();
              }
            }}
            placeholder="Add a keyword"
            className="keyword-input"
          />
          <button onClick={addKeyword} className="add-keyword-button">
            Add
          </button>
        </div>

        <div className="keyword-list">
          {keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
              <button onClick={() => removeKeyword(index)} className="remove-keyword-button">
                &times;
              </button>
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
      <div className="image-upload-section">
        <p className="image-upload-label"><h4>Inspiration Gallery</h4></p>

        {/* Image gallery */}
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

        {/* Upload button below the images */}
        <label htmlFor="file-upload" className="custom-file-upload">
          Upload Images
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} // Keep this to hide the input
        />
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
