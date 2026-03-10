import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import QuestionCard from './QuestionCard';
import './AssessmentPage.css';
import { employeeQuestions, hrQuestions, employeeSections, hrSections } from '../data/questions';

const AssessmentPage = ({ path, onRestart, onComplete }) => {
  const questions = path === 'employee' ? employeeQuestions : hrQuestions;
  const sections  = path === 'employee' ? employeeSections  : hrSections;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const current   = questions[currentIndex];
  const isLast    = currentIndex === questions.length - 1;
  const answered  = Object.keys(answers).length;

  const currentAnswer = answers[current.id];
  const hasAnswer = currentAnswer !== undefined &&
    (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : 
      (typeof currentAnswer === 'string' ? currentAnswer.trim() !== '' : currentAnswer !== null));

  const handleAnswer = useCallback((value) => {
    setAnswers(prev => ({ ...prev, [current.id]: value }));
  }, [current.id]);

  const handleNext = () => {
    if (isLast) {
      onComplete(answers, questions);
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const handleSkip = () => {
    if (isLast) onComplete(answers, questions);
    else setCurrentIndex(i => i + 1);
  };

  const handleSectionClick = (sectionIdx) => {
    const firstInSection = questions.findIndex(q => q.sectionIndex === sectionIdx);
    if (firstInSection !== -1) setCurrentIndex(firstInSection);
  };

  const pathTitle = path === 'employee'
    ? 'Employee Wellbeing Assessment'
    : 'Organizational Assessment';

  const totalScreens = sections.length + 2;
  const screenNum = current.sectionIndex + 2;

  return (
    <div className={`assessment-page assessment-path-${path}`}>
      {/* Fixed Header */}
      <header className="assessment-header" aria-label="Assessment header">
        <div className="logo">
          <div className="logo-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
              <circle cx="12" cy="12" r="7.5" />
              <path d="M12 7v10" strokeLinecap="round" />
              <path d="M8 10.5 Q 12 15 16 10.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="logo-text">SEH<span className="logo-accent">ATTI</span></span>
        </div>
        <div className="assessment-header-right">
          <span className="assessment-header-title">{pathTitle}</span>
          <button
            className="btn-restart"
            type="button"
            onClick={onRestart}
            aria-label="Restart assessment from beginning"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      <div className="assessment-body">
        {/* Sidebar */}
        <Sidebar
          sections={sections}
          currentSectionIndex={current.sectionIndex}
          currentQuestionIndex={currentIndex}
          answeredCount={answered}
          totalQuestions={questions.length}
          path={path}
          onSectionClick={handleSectionClick}
        />

        {/* Main content */}
        <main className="assessment-main" aria-label="Assessment question">
          <div className="question-meta">
            QUESTION {currentIndex + 1} OF {questions.length}
            &nbsp;·&nbsp;
            {current.section.toUpperCase()}
          </div>

          <QuestionCard
            key={current.id}
            questionData={current}
            selectedAnswer={currentAnswer}
            onAnswer={handleAnswer}
          />

          {/* Navigation */}
          <nav className="assessment-nav" aria-label="Question navigation">
            <button
              className="btn-prev"
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous question"
            >
              ← Previous
            </button>

            <button
              className={`btn-next ${hasAnswer ? 'active' : ''}`}
              type="button"
              onClick={handleNext}
              aria-label={isLast ? 'Submit assessment' : 'Next question'}
            >
              {isLast ? 'Submit →' : 'Next Question →'}
            </button>

            <button
              className="btn-skip"
              type="button"
              onClick={handleSkip}
              aria-label="Skip this question"
            >
              Skip
            </button>
          </nav>
        </main>
      </div>

      {/* Bottom bar */}
      <footer className="assessment-bottom-bar" aria-label="Assessment status">
        <div className="bottom-bar-screen">
          SCREEN {screenNum} OF {totalScreens} — {path === 'employee' ? 'EMPLOYEE ASSESSMENT' : 'HR ASSESSMENT'}
        </div>
        <div className="bottom-bar-dots" aria-hidden="true">
          {questions.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? 'dot-active' : ''} ${answers[questions[idx].id] !== undefined ? 'dot-answered' : ''}`}
            />
          ))}
        </div>
        <div className="bottom-bar-logo" aria-hidden="true">
          <span className="logo-text-sm">SEHATTI</span>
        </div>
      </footer>
    </div>
  );
};

export default AssessmentPage;
