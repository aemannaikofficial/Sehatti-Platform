import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ questionData, selectedAnswer, onAnswer }) => {
  const { question, subtitle, type, options, section, id, maxSelections } = questionData;

  const handleRadioChange = (idx) => {
    onAnswer(idx);
  };

  const handleCheckboxChange = (idx) => {
    const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
    let next;
    
    if (current.includes(idx)) {
      next = current.filter(i => i !== idx);
    } else {
      // Enforcement of maxSelections
      if (maxSelections && current.length >= maxSelections) {
        // Option: Replace the oldest selection or just return?
        // Let's just return to prevent selection beyond limit
        return;
      }

      // If 'None' option is selected, clear others
      if (options[idx].score === 0) {
        next = [idx];
      } else {
        // Remove any 'None' option
        const noneIdx = options.findIndex(o => o.score === 0);
        next = [...current.filter(i => i !== noneIdx), idx];
      }
    }
    onAnswer(next);
  };

  return (
    <div className="question-card" key={id}>
      <div className="question-section-tag">{section}</div>

      <h3 className="question-text font-playfair">{question}</h3>

      {subtitle && (
        <p className="question-subtitle">{subtitle}</p>
      )}

      {type === 'text' ? (
        <div className="text-input-container">
          <input
            type="text"
            className="text-input-field"
            placeholder={`Enter your answer`}
            value={selectedAnswer || ''}
            onChange={(e) => onAnswer(e.target.value)}
          />
        </div>
      ) : (
        <div className="options-list" role={type === 'radio' ? 'radiogroup' : 'group'} aria-label={question}>
          {options.map((option, idx) => {
            const isSelected = type === 'radio'
              ? selectedAnswer === idx
              : Array.isArray(selectedAnswer) && selectedAnswer.includes(idx);

            const inputId = `q${id}-opt${idx}`;

            return (
              <label
                key={idx}
                htmlFor={inputId}
                className={`option-item ${isSelected ? 'selected' : ''} ${type === 'checkbox' ? 'checkbox-type' : ''}`}
              >
                <input
                  type={type === 'checkbox' ? 'checkbox' : 'radio'}
                  id={inputId}
                  name={`question-${id}`}
                  checked={isSelected}
                  onChange={() => type === 'radio' ? handleRadioChange(idx) : handleCheckboxChange(idx)}
                  className="sr-only"
                  aria-label={option.label}
                />
                <span className="option-bubble" aria-hidden="true">
                  {isSelected && type === 'radio' && (
                    <span className="option-bubble-inner" />
                  )}
                  {isSelected && type === 'checkbox' && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <polyline points="1.5,5 4,7.5 8.5,2" stroke="var(--navy-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <div className="option-label">{option.label}</div>
              {option.score !== null && option.score !== undefined && (
                <div className="option-score">Score: {option.score}</div>
              )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
