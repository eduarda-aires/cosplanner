import React from 'react';

const ShoppingListTab = ({ shoppingList, handleShoppingItemChange, handleShoppingItemToggle, handleAddShoppingItem }) => {
  return (
    <div>
      <h3>Shopping List</h3>
      {shoppingList.map((item, index) => (
        <div key={index} className="shopping-item">
          <input
            type="text"
            placeholder="Add item"
            value={item.item}
            onChange={(e) => handleShoppingItemChange(index, e.target.value)}
          />
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => handleShoppingItemToggle(index)}
          />
          <span>{item.done ? 'Done' : 'Not Done'}</span>
        </div>
      ))}
      <button onClick={handleAddShoppingItem}>Add New Item</button>
    </div>
  );
};

export default ShoppingListTab;
