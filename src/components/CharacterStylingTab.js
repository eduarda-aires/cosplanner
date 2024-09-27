import React from 'react';

const CharacterStylingTab = ({ characterStyling, handleTextChange, handleImageChange }) => {
  return (
    <div>
      <h3>Character Styling</h3>
      <textarea
        placeholder="Add styling notes..."
        value={characterStyling.text}
        onChange={handleTextChange}
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
      />
      {characterStyling.images && characterStyling.images.map((img, idx) => (
        <img key={idx} src={URL.createObjectURL(img)} alt="Character styling" width="100" />
      ))}
    </div>
  );
};

export default CharacterStylingTab;
