import React from 'react';
import './MainPage.css'; // Optional: Add styling here later

const MainPage = () => {
  return (
    <div className="main-page">
      <header className="main-header">
        <h1>Cosplay Planner</h1>
        <p>Organize your cosplans, track progress, and prepare for your next photoshoot!</p>
      </header>

      <section className="main-content">
        <h2>Your Cosplans</h2>
        <p>No cosplans yet. Start by adding a new cosplay project!</p>
        {/* You can later add buttons or forms here for adding new cosplans */}
        <button className="add-cosplay-btn">Add Cosplay Plan</button>
      </section>
    </div>
  );
};

export default MainPage;
