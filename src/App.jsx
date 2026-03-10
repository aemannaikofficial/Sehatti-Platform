import React, { useState, useCallback } from 'react';
import HeroPage from './components/HeroPage';
import AssessmentPage from './components/AssessmentPage';
import ResultsPage from './components/ResultsPage';
import DecisionMakerForm from './components/forms/DecisionMakerForm';
import EmployeeForm from './components/forms/EmployeeForm';
import EmployeeInterview from './components/forms/EmployeeInterview';
import DecisionMakerInterview from './components/forms/DecisionMakerInterview';
import { employeeQuestions, hrQuestions } from './data/questions';

// Simple page state machine: 'home' | 'assessment' | 'results' | 'dm-survey' | 'emp-survey'
const App = () => {
  const [page, setPage] = useState('home');
  const [path, setPath] = useState(null); // 'employee' | 'hr'
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [finalQuestions, setFinalQuestions] = useState(null);

  const handleSelectPath = useCallback((selectedPath) => {
    setPath(selectedPath);
    setPage('assessment');
    window.scrollTo(0, 0);
  }, []);

  const handleComplete = useCallback((answers, questions, selectedPath) => {
    setFinalAnswers(answers);
    setFinalQuestions(questions);
    if (selectedPath) setPath(selectedPath);
    setPage('results');
    window.scrollTo(0, 0);
  }, []);

  const handleRestart = useCallback(() => {
    setPage('home');
    setPath(null);
    setFinalAnswers(null);
    setFinalQuestions(null);
    window.scrollTo(0, 0);
  }, []);

  if (page === 'home') {
    return (
      <HeroPage 
        onSelectPath={handleSelectPath} 
        onSelectDMSurvey={() => setPage('dm-survey')}
        onSelectEmpSurvey={() => setPage('emp-survey')}
        onSelectEmpInterview={() => setPage('emp-interview')}
        onSelectDMInterview={() => setPage('dm-interview')}
      />
    );
  }

  if (page === 'assessment') {
    return (
      <AssessmentPage
        path={path}
        onRestart={handleRestart}
        onComplete={handleComplete}
      />
    );
  }

  if (page === 'results') {
    return (
      <ResultsPage
        path={path}
        answers={finalAnswers}
        questions={finalQuestions}
        onRestart={handleRestart}
        onSelectEmpInterview={() => setPage('emp-interview')}
        onSelectDMInterview={() => setPage('dm-interview')}
      />
    );
  }

  if (page === 'emp-survey') {
    return (
      <EmployeeForm 
        onComplete={(answers) => handleComplete(answers, employeeQuestions, 'employee')} 
        onRestart={handleRestart}
      />
    );
  }

  if (page === 'dm-survey') {
    return (
      <DecisionMakerForm 
        onComplete={(answers) => handleComplete(answers, hrQuestions, 'hr')} 
        onRestart={handleRestart}
      />
    );
  }

  if (page === 'emp-interview') {
    return (
      <EmployeeInterview onRestart={handleRestart} />
    );
  }

  if (page === 'dm-interview') {
    return (
      <DecisionMakerInterview onRestart={handleRestart} />
    );
  }

  return null;
};

export default App;
