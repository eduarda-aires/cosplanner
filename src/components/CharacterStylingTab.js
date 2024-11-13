import React, { useState } from 'react';

const CharacterStylingTab = ({ characterStyling, handleTextChange, handleImageChange }) => {
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
    <div>
      <h3>Character Styling</h3>
      <textarea
        value={characterStyling.text}
        onChange={handleTextChange}
        placeholder="Add your notes here..."
        style={{
          width: '100%',
          height: '100px',
          boxSizing: 'border-box',
          backgroundColor: '#333', // Dark background color
          color: '#fff', // White text color for contrast
          border: '1px solid #555', // Border to match dark theme
          borderRadius: '5px', // Rounded corners
          padding: '10px' // Padding for better text placement
        }}
      />

      {/* Image Upload Section */}
      <div className="image-upload-section">
        <p className="image-upload-label"><h4>References</h4></p>

        {/* Image gallery */}
        <div className="image-gallery">
          {characterStyling.images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Character Styling ${index + 1}`}
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

      {/* Modal for displaying images */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal} style={modalStyle}>
          <img src={selectedImage} alt="Selected" style={modalImageStyle} />
        </div>
      )}
    </div>
  );
};

// Modal styles
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark semi-transparent background
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000 // Ensure it appears above other elements
};

// Image styles for modal
const modalImageStyle = {
  maxWidth: '90%',
  maxHeight: '90%',
  borderRadius: '10px' // Rounded corners for the image
};

export default CharacterStylingTab;
