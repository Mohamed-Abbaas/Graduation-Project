import React from "react";
import "./loader.css"; // You can define your loading indicator styles in this CSS file

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loader;
