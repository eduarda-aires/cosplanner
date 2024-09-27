import React from 'react';

const PhotoshootMoodboardTab = ({ moodboard, handleTextChange, handleImageChange }) => {
  return (
    <div>
      <h3>Photoshoot Moodboard</h3>
      <textarea
        placeholder="Add photoshoot ideas..."
        value={moodboard.text}
        onChange={handleTextChange}
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
      />
      {moodboard.images && moodboard.images.map((img, idx) => (
        <img key={idx} src={URL.createObjectURL(img)} alt="Moodboard" width="100" />
      ))}
    </div>
  );
};

export default PhotoshootMoodboardTab;
