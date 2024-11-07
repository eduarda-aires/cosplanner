import React, { useState } from 'react';

const PropMakingTab = ({ propMaking, handleTextChange, handleImageChange }) => {
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
      <h3>Prop Making</h3>
      <textarea
        value={propMaking.text}
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
      
      <input
        type="file"
        multiple // Allow multiple file selection
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: '10px' }}
      />

      <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        {propMaking.images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Prop Reference ${index + 1}`}
            style={{ width: '100px', height: 'auto', margin: '5px', cursor: 'pointer' }}
            onClick={() => openModal(imgSrc)} // Open modal to show image
          />
        ))}
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

export default PropMakingTab;
