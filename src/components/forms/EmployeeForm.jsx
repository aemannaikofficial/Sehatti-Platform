import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import '../AssessmentPage.css';
import './Forms.css';

const EmployeeForm = ({ onComplete, onRestart }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: null,
    q8: null, q9: null, q10: [], q11: '', q12: null, q13: '',
    q14: [], q15: [], q16: '', q17: []
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'q1') {
      // Only allow letters, spaces, and hyphens for names
      value = value.replace(/[^a-zA-Z\s-]/g, '');
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (qId, value) => {
    setFormData(prev => ({ ...prev, [qId]: value }));
  };

  const handleCheckboxChange = (qId, optionIdx, limit) => {
    setFormData(prev => {
      const current = prev[qId];
      if (current.includes(optionIdx)) {
        return { ...prev, [qId]: current.filter(id => id !== optionIdx) };
      }
      if (current.length < limit) {
        return { ...prev, [qId]: [...current, optionIdx] };
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    const answers = {
      1: formData.q1,
      2: formData.q2,
      3: ['Female', 'Male'].indexOf(formData.q3),
      4: ['Individual contributor', 'Team lead/supervisor', 'Manager', 'Executive'].indexOf(formData.q4),
      5: ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'].indexOf(formData.q5),
      6: ['Under 35', '35-45', '45-55', '55+'].indexOf(formData.q6),
      7: formData.q7 !== null ? formData.q7 - 1 : 0,
      8: formData.q8 !== null ? Math.round(formData.q8 / 2) - 1 : 0,
      9: formData.q9 !== null ? formData.q9 - 1 : 0,
      10: formData.q10,
      11: formData.q11 === 'Yes' ? 0 : 1,
      12: formData.q12 !== null ? formData.q12 - 1 : 0,
      13: ['Never', 'Occasionally', 'Monthly', 'Weekly', 'Multiple times per week'].indexOf(formData.q13),
      14: formData.q14,
      15: formData.q15,
      16: ['Push notifications on mobile', 'In-dashboard banners only', 'Email summaries', 'SMS/text alerts', 'No notifications—check manually'].indexOf(formData.q16),
      17: formData.q17,
    };
    if (onComplete) onComplete(answers);
  };

  const supportOptions = ['Friends/family', 'Manager', 'Apps/online', 'Therapist/professional', 'No one'];
  const barrierOptions = ['Privacy concerns', 'Time constraints', 'Lack of trust', 'No interest', 'No barriers'];
  const sharingOptions = ['Anonymized team trends only', 'Selective personal summaries', 'Detailed stress pattern reports', 'No sharing—I want full privacy', 'Manager-requested check-ins'];
  const featureOptions = ['Growth & behavior overview', 'Learning & development hub', 'Community support', 'Wellness report', 'Employee assistance program'];

  const steps = [
    {
      id: "q1", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label" htmlFor="q1">Name</label>
          <p className="form-help">Please enter your full name for report personalization.</p>
          <input id="q1" type="text" name="q1" className="form-input" value={formData.q1} onChange={handleChange} placeholder="Your name" />
        </div>
      )
    },
    {
      id: "q2", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label" htmlFor="q2">Email</label>
          <p className="form-help">Your report will be sent to this address.</p>
          <input id="q2" type="email" name="q2" className="form-input" value={formData.q2} onChange={handleChange} placeholder="Your email" />
        </div>
      )
    },
    {
      id: "q3", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label">Gender</label>
          <p className="form-help">This helps us benchmark your results.</p>
          <div className="options-grid">
            {['Female', 'Male'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q3 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q3" value={opt} onChange={handleChange} checked={formData.q3 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q4", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label">Your job role type</label>
          <p className="form-help">Select the level that best describes your position.</p>
          <div className="options-grid">
            {['Individual contributor', 'Team lead/supervisor', 'Manager', 'Executive'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q4 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q4" value={opt} onChange={handleChange} checked={formData.q4 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q5", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label">Years in current role</label>
          <p className="form-help">Select your tenure in your current position.</p>
          <div className="options-grid">
            {['Less than 1 year', '1-3 years', '3-5 years', '5+ years'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q5 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q5" value={opt} onChange={handleChange} checked={formData.q5 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q6", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label">Work hours per week (average)</label>
          <p className="form-help">Please estimate your typical weekly commitment.</p>
          <div className="options-grid">
            {['Under 35', '35-45', '45-55', '55+'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q6 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q6" value={opt} onChange={handleChange} checked={formData.q6 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q7", section: "Stress & current support", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">How often do you experience work-related stress?</label>
          <p className="form-help">Reflect on your experience over the past month. (1=Rarely, 5=Daily)</p>
          <div className="scale-container">
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} className={`scale-item ${formData.q7 === num ? 'selected' : ''}`}>
                <input type="radio" name="q7" value={num} onChange={() => handleRatingChange('q7', num)} checked={formData.q7 === num} />
                {num}
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q8", section: "Stress & current support", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">How severe are your stress symptoms (fatigue, anxiety, etc.)?</label>
          <p className="form-help">Rate the intensity on a scale from Manageable (1) to Overwhelming (10).</p>
          <div className="scale-container" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <label key={num} className={`scale-item ${formData.q8 === num ? 'selected' : ''}`}>
                <input type="radio" name="q8" value={num} onChange={() => handleRatingChange('q8', num)} checked={formData.q8 === num} />
                {num}
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q9", section: "Stress & current support", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">Comfort level discussing wellbeing issues at work</label>
          <p className="form-help">Scale: Not comfortable (1) to Very comfortable (5).</p>
          <div className="scale-container">
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} className={`scale-item ${formData.q9 === num ? 'selected' : ''}`}>
                <input type="radio" name="q9" value={num} onChange={() => handleRatingChange('q9', num)} checked={formData.q9 === num} />
                {num}
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q10", section: "Stress & current support", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">Where do you currently seek stress support? (Select up to 2)</label>
          <p className="form-help">Choose the most common sources of support for you.</p>
          <div className="options-grid">
            {supportOptions.map((opt, idx) => (
              <label key={opt} className={`option-radio ${formData.q10.includes(idx) ? 'selected' : ''}`}>
                <input type="checkbox" checked={formData.q10.includes(idx)} onChange={() => handleCheckboxChange('q10', idx, 2)} />
                <span className="radio-check checkbox-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q11", section: "Stress & current support", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">Have you needed mental health support in the past year?</label>
          <p className="form-help">Your response remains strictly confidential.</p>
          <div className="options-grid">
            {['Yes', 'No'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q11 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q11" value={opt} onChange={handleChange} checked={formData.q11 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q12", section: "Tool Interest [Phase 2]", sectionIndex: 2,
      render: () => (
        <div className="form-group">
          <label className="form-label">Likelihood to use a wearable-based stress insights tool</label>
          <p className="form-help">Scale: Not likely (1) to Very likely (5).</p>
          <div className="scale-container">
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} className={`scale-item ${formData.q12 === num ? 'selected' : ''}`}>
                <input type="radio" name="q12" value={num} onChange={() => handleRatingChange('q12', num)} checked={formData.q12 === num} />
                {num}
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q13", section: "Tool Interest", sectionIndex: 2,
      render: () => (
        <div className="form-group">
          <label className="form-label">Expected usage frequency if provided by employer</label>
          <p className="form-help">How often would you utilize biofeedback cues?</p>
          <div className="options-grid">
            {['Never', 'Occasionally', 'Monthly', 'Weekly', 'Multiple times per week'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q13 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q13" value={opt} onChange={handleChange} checked={formData.q13 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q14", section: "Tool Interest", sectionIndex: 2,
      render: () => (
        <div className="form-group">
          <label className="form-label">Top 2 barriers to using such a tool</label>
          <p className="form-help">Select the primary factors holding you back.</p>
          <div className="options-grid">
            {barrierOptions.map((opt, idx) => (
              <label key={opt} className={`option-radio ${formData.q14.includes(idx) ? 'selected' : ''}`}>
                <input type="checkbox" checked={formData.q14.includes(idx)} onChange={() => handleCheckboxChange('q14', idx, 2)} />
                <span className="radio-check checkbox-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q15", section: "Platform usage", sectionIndex: 3,
      render: () => (
        <div className="form-group">
          <label className="form-label">How would you prefer to share wellbeing insights? (Select up to 2)</label>
          <p className="form-help">Reflect on your comfort level with data sharing.</p>
          <div className="options-grid">
            {sharingOptions.map((opt, idx) => (
              <label key={opt} className={`option-radio ${formData.q15.includes(idx) ? 'selected' : ''}`}>
                <input type="checkbox" checked={formData.q15.includes(idx)} onChange={() => handleCheckboxChange('q15', idx, 2)} />
                <span className="radio-check checkbox-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q16", section: "Platform usage", sectionIndex: 3,
      render: () => (
        <div className="form-group">
          <label className="form-label">What notification style would work best for stress alerts?</label>
          <p className="form-help">Choose your primary preference for proactive alerts.</p>
          <div className="options-grid">
            {['Push notifications on mobile', 'In-dashboard banners only', 'Email summaries', 'SMS/text alerts', 'No notifications—check manually'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q16 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q16" value={opt} onChange={handleChange} checked={formData.q16 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q17", section: "Platform usage", sectionIndex: 3,
      render: () => (
        <div className="form-group">
          <label className="form-label">Most important features in a wellness platform (Select up to 2)</label>
          <p className="form-help">Select the components that would provide most value to you.</p>
          <div className="options-grid">
            {featureOptions.map((opt, idx) => (
              <label key={opt} className={`option-radio ${formData.q17.includes(idx) ? 'selected' : ''}`}>
                <input type="checkbox" checked={formData.q17.includes(idx)} onChange={() => handleCheckboxChange('q17', idx, 2)} />
                <span className="radio-check checkbox-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    }
  ];

  const current = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const sections = ['Personal info & work details', 'Stress & current support', 'Tool Interest', 'Platform usage'];

  const handleNext = () => {
    if (isLast) handleSubmit();
    else setCurrentStep(s => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const answeredCount = Object.values(formData).filter(val => {
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === 'string') return val.trim() !== '';
    return val !== null;
  }).length;

  const handleSectionClick = (idx) => {
    const targetStep = steps.findIndex(s => s.sectionIndex === idx);
    if (targetStep !== -1) setCurrentStep(targetStep);
  };

  // Determine if current question is answered
  let hasAnswer = false;
  const curVal = formData[current.id];
  if (Array.isArray(curVal)) {
    hasAnswer = curVal.length > 0;
  } else if (typeof curVal === 'string') {
    hasAnswer = curVal.trim() !== '';
  } else {
    hasAnswer = curVal !== null;
  }

  return (
    <div className="assessment-page assessment-path-employee theme-employee">
      <header className="assessment-header">
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
          <span className="assessment-header-title">Employee Wellbeing Survey</span>
          <button className="btn-restart" type="button" onClick={onRestart}>
            ← Back to Home
          </button>
        </div>
      </header>

      <div className="assessment-body">
        <Sidebar
          sections={sections}
          currentSectionIndex={current.sectionIndex}
          currentQuestionIndex={currentStep}
          answeredCount={answeredCount}
          totalQuestions={steps.length}
          path="employee"
          onSectionClick={handleSectionClick}
        />

        <main className="assessment-main">
          <div className="survey-badge">PHASE 2 VALIDATION</div>
          
          <div className="question-meta" style={{ marginBottom: '24px', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '2px', fontWeight: '700' }}>
            QUESTION {currentStep + 1} OF {steps.length} &nbsp;·&nbsp; {current.section.toUpperCase()}
          </div>

          <div className="survey-container" style={{ margin: 0, padding: 0, maxWidth: '800px' }}>
            {current.render()}
          </div>

          <nav className="assessment-nav">
            <button className="btn-prev" type="button" onClick={handlePrev} disabled={currentStep === 0}>
              ← Previous
            </button>
            <button className={`btn-next ${hasAnswer ? 'active' : ''}`} type="button" onClick={handleNext}>
              {isLast ? 'Submit Results →' : 'Next Question →'}
            </button>
            <button className="btn-skip" type="button" onClick={handleNext}>
              Skip
            </button>
          </nav>
        </main>
      </div>
      
      <footer className="assessment-bottom-bar">
        <div className="bottom-bar-screen">
          SCREEN {current.sectionIndex + 2} OF {sections.length + 2} — EMPLOYEE ASSESSMENT
        </div>
        <div className="bottom-bar-dots">
          {steps.map((_, idx) => {
            const val = formData[`q${idx+1}`];
            let ans = false;
            if (Array.isArray(val)) ans = val.length > 0;
            else if (typeof val === 'string') ans = val.trim() !== '';
            else ans = val !== null;
            return <span key={idx} className={`dot ${idx === currentStep ? 'dot-active' : ''} ${ans ? 'dot-answered' : ''}`} />
          })}
        </div>
        <div className="bottom-bar-logo">
          <span className="logo-text-sm">SEHATTI</span>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeForm;
