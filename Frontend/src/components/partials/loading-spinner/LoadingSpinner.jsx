import React from "react";
import "./LoadingSpinner.scss"; // Assume you have some CSS for the spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
