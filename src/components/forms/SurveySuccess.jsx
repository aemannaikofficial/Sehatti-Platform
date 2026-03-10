import React from 'react';
import './Forms.css';

const SurveySuccess = ({ title = "Thank You!", message = "Your responses have been recorded successfully. Our team will review the information and get back to you shortly." }) => {
  return (
    <div className="survey-container">
      <div className="success-container">
        <div className="success-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="success-title">{title}</h2>
        <p className="success-message">
          {message}
        </p>
        <button 
          className="submit-btn" 
          style={{ width: 'auto', padding: '14px 40px', marginTop: '40px' }}
          onClick={() => window.location.reload()}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default SurveySuccess;
