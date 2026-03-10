import React from 'react';
import './Sidebar.css';

const Sidebar = ({ sections, currentSectionIndex, currentQuestionIndex, answeredCount, totalQuestions, path, onSectionClick }) => {
  const pathLabel = path === 'employee' ? 'Employee Path' : 'HR / Manager Path';
  const pathTitle = path === 'employee' ? 'Personal Wellbeing Assessment' : 'Organizational Assessment';

  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <aside className="sidebar" aria-label="Assessment progress">
      {/* Path info */}
      <div className="sidebar-path">
        <div className="sidebar-path-label">{pathLabel}</div>
        <h2 className="sidebar-path-title font-playfair">{pathTitle}</h2>
      </div>

      {/* Progress bar */}
      <div className="sidebar-progress-wrap">
        <div className="sidebar-progress-labels">
          <span>Progress</span>
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        </div>
        <div className="sidebar-progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${progressPercent}% complete`}>
          <div className="sidebar-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Stepper */}
      <nav className="sidebar-stepper" aria-label="Section navigation">
        {sections.map((section, idx) => {
          const isCompleted = idx < currentSectionIndex;
          const isActive = idx === currentSectionIndex;
          const isUpcoming = idx > currentSectionIndex;

          return (
            <div
              key={section}
              className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
              onClick={() => isCompleted && onSectionClick(idx)}
              role={isCompleted ? 'button' : undefined}
              tabIndex={isCompleted ? 0 : undefined}
              aria-current={isActive ? 'step' : undefined}
              aria-label={`${section}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
              onKeyDown={e => e.key === 'Enter' && isCompleted && onSectionClick(idx)}
            >
              <div className="stepper-connector" aria-hidden="true" />
              <div className="stepper-circle" aria-hidden="true">
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span className="stepper-label">{section}</span>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>Your responses are anonymous and encrypted. Data is used only for aggregate research and your personal report.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
