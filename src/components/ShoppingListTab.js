import React from 'react';
import './ShoppingListTab.css';

const ShoppingListTab = ({ shoppingList, handleShoppingItemChange, handleShoppingItemToggle, handleAddShoppingItem }) => {
  return (
    <div className="shopping-list-container">
      <h3>Shopping List</h3>
      {shoppingList.map((item, index) => (
        <div key={index} className={`shopping-item ${item.done ? 'completed' : ''}`}>
          <input
            type="text"
            placeholder="Add item"
            value={item.item}
            onChange={(e) => handleShoppingItemChange(index, e.target.value)}
            className="shopping-item-text"
          />
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => handleShoppingItemToggle(index)}
            className="shopping-item-checkbox"
          />
        </div>
      ))}
      <button onClick={handleAddShoppingItem} className="add-item-button">Add New Item</button>
    </div>
  );
};

export default ShoppingListTab;
