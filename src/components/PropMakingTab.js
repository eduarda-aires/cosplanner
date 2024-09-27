import React from 'react';

const PropMakingTab = ({ propMaking, handleTextChange, handleImageChange }) => {
  return (
    <div>
      <h3>Prop Making</h3>
      <textarea
        placeholder="Add prop making notes..."
        value={propMaking.text}
        onChange={handleTextChange}
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
      />
      {propMaking.images && propMaking.images.map((img, idx) => (
        <img key={idx} src={URL.createObjectURL(img)} alt="Prop making" width="100" />
      ))}
    </div>
  );
};

export default PropMakingTab;
