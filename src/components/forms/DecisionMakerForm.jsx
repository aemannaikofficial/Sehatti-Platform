import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import '../AssessmentPage.css';
import './Forms.css';

const DecisionMakerForm = ({ onComplete, onRestart }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '',
    q8: null, q9: [], q10: '', q11: null, q12: '', q13: '',
    q14: '', q15: '', q16: '', q17: null
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

  const jobTitleOptions = ['CEO', 'Managing director', 'HR manager', 'Wellbeing/People Lead', 'Learning & development', 'Other'];
  const industryOptions = ['Tech/IT', 'Finance', 'Healthcare', 'Manufacturing', 'Other'];
  const solutionOptions = ['None', 'EAP (Employee Assistance Program)', 'Wellness workshops', 'Digital platform/app', 'Insurance-based support', 'Other'];

  const handleSubmit = () => {
    const answers = {
      1: formData.q1,
      2: formData.q2,
      3: ['Female', 'Male', 'Prefer not to say'].indexOf(formData.q3),
      4: jobTitleOptions.indexOf(formData.q4),
      5: ['Less than 50', '50-200', '200-500', '500-2,000', 'More than 2,000'].indexOf(formData.q5),
      6: industryOptions.indexOf(formData.q6),
      7: ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'].indexOf(formData.q7),
      8: formData.q8 !== null ? formData.q8 - 1 : 0,
      9: formData.q9,
      10: solutionOptions.indexOf(formData.q10),
      11: formData.q11 !== null ? formData.q11 - 1 : 0,
      12: ['Less than $50', '$50-$100', '$100-$200', '$200-$500', 'More than $500'].indexOf(formData.q12),
      13: ['0-3 months', '3-6 months', '6-12 months', 'No current plans'].indexOf(formData.q13),
      14: ['Reduced turnover', 'Reduced absenteeism', 'Higher productivity', 'Better engagement scores', 'Employer branding'].indexOf(formData.q14),
      15: ['Yes', 'Maybe', 'No'].indexOf(formData.q15),
      16: ['Real-time stress insights and alerts', 'Productivity/ROI analytics', 'Team performance overview', 'Integration with wearables/tools', 'Other'].indexOf(formData.q16),
      17: formData.q17 !== null ? formData.q17 - 1 : 0,
    };
    if (onComplete) onComplete(answers);
  };

  const steps = [
    {
      id: "q1", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label" htmlFor="q1">Name</label>
          <p className="form-help">Please enter your full name.</p>
          <input id="q1" type="text" name="q1" className="form-input" value={formData.q1} onChange={handleChange} placeholder="Your full name" />
        </div>
      )
    },
    {
      id: "q2", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label" htmlFor="q2">Email</label>
          <p className="form-help">Your report will be sent to this address.</p>
          <input id="q2" type="email" name="q2" className="form-input" value={formData.q2} onChange={handleChange} placeholder="work@company.com" />
        </div>
      )
    },
    {
      id: "q3", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label">Gender</label>
          <div className="options-grid">
            {['Female', 'Male', 'Prefer not to say'].map(opt => (
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
          <label className="form-label">Your job title</label>
          <p className="form-help">Select the role that best describes your position.</p>
          <div className="options-grid">
            {jobTitleOptions.map(opt => (
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
          <label className="form-label" htmlFor="q5">Company size (total employees)</label>
          <p className="form-help">Select your organization scale.</p>
          <div className="options-grid">
            {['Less than 50', '50-200', '200-500', '500-2,000', 'More than 2,000'].map(opt => (
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
          <label className="form-label">Industry</label>
          <p className="form-help">Select your primary sector.</p>
          <div className="options-grid">
            {industryOptions.map(opt => (
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
      id: "q7", section: "Personal info & work details", sectionIndex: 0,
      render: () => (
        <div className="form-group">
          <label className="form-label">Years in current role</label>
          <p className="form-help">Select your tenure in your current position.</p>
          <div className="options-grid">
            {['Less than 1 year', '1-3 years', '3-5 years', '5+ years'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q7 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q7" value={opt} onChange={handleChange} checked={formData.q7 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q8", section: "Problem & current practice", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">How serious are employee stress/wellbeing issues in your company right now?</label>
          <p className="form-help">Scale: Not an issue to Critical issue. (1-5)</p>
          <div className="scale-container">
            {[1, 2, 3, 4, 5].map(num => (
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
      id: "q9", section: "Problem & current practice", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">Select up to 3 current wellbeing challenges:</label>
          <p className="form-help">Select the primary issues impacting your workforce.</p>
          <div className="options-grid">
            {['High burnout rates', 'Absenteeism', 'Low employee engagement', 'High turnover', 'Mental health complaints', 'No major issues'].map((opt, idx) => (
              <label key={opt} className={`option-radio ${formData.q9.includes(idx) ? 'selected' : ''}`}>
                <input type="checkbox" checked={formData.q9.includes(idx)} onChange={() => handleCheckboxChange('q9', idx, 3)} />
                <span className="radio-check checkbox-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q10", section: "Problem & current practice", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">What is the main current wellbeing solution used?</label>
          <p className="form-help">Select your primary organizational support tool.</p>
          <div className="options-grid">
            {solutionOptions.map(opt => (
              <label key={opt} className={`option-radio ${formData.q10 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q10" value={opt} onChange={handleChange} checked={formData.q10 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q11", section: "Problem & current practice", sectionIndex: 1,
      render: () => (
        <div className="form-group">
          <label className="form-label">Satisfaction with your current main solution</label>
          <p className="form-help">1=Very dissatisfied, 5=Very satisfied</p>
          <div className="scale-container">
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} className={`scale-item ${formData.q11 === num ? 'selected' : ''}`}>
                <input type="radio" name="q11" value={num} onChange={() => handleRatingChange('q11', num)} checked={formData.q11 === num} />
                {num}
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q12", section: "Solution value & buying readiness", sectionIndex: 2,
      render: () => (
        <div className="form-group">
          <label className="form-label">Acceptable annual budget per employee for wellbeing software:</label>
          <p className="form-help">Select your target spend range.</p>
          <div className="options-grid">
            {['Less than $50', '$50-$100', '$100-$200', '$200-$500', 'More than $500'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q12 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q12" value={opt} onChange={handleChange} checked={formData.q12 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q13", section: "Solution value & buying readiness", sectionIndex: 2,
      render: () => (
        <div className="form-group">
          <label className="form-label">Expected decision timeline for purchasing/implementing a new wellbeing solution:</label>
          <p className="form-help">Select your projected timeframe.</p>
          <div className="options-grid">
            {['0-3 months', '3-6 months', '6-12 months', 'No current plans'].map(opt => (
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
      id: "q14", section: "Solution value & buying readiness", sectionIndex: 2,
      render: () => (
        <div className="form-group">
          <label className="form-label">Top ROI metric that matters most:</label>
          <p className="form-help">What indicates success for your organization?</p>
          <div className="options-grid">
            {['Reduced turnover', 'Reduced absenteeism', 'Higher productivity', 'Better engagement scores', 'Employer branding'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q14 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q14" value={opt} onChange={handleChange} checked={formData.q14 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q15", section: "Solution value & buying readiness", sectionIndex: 2,
      render: () => (
        <div className="form-group">
          <label className="form-label">Would you approve paid pilot if ROI measurable in 6 months?</label>
          <p className="form-help">Select your likelihood of piloting a viable platform.</p>
          <div className="options-grid">
            {['Yes', 'Maybe', 'No'].map(opt => (
              <label key={opt} className={`option-radio ${formData.q15 === opt ? 'selected' : ''}`}>
                <input type="radio" name="q15" value={opt} onChange={handleChange} checked={formData.q15 === opt} />
                <span className="radio-check" />
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "q16", section: "AI/Tech readiness", sectionIndex: 3,
      render: () => (
        <div className="form-group">
          <label className="form-label">What would be the most important feature for you in a wellness platform dashboard?</label>
          <p className="form-help">Select your top priority.</p>
          <div className="options-grid">
            {['Real-time stress insights and alerts', 'Productivity/ROI analytics', 'Team performance overview', 'Integration with wearables/tools', 'Other'].map(opt => (
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
      id: "q17", section: "AI/Tech readiness", sectionIndex: 3,
      render: () => (
        <div className="form-group">
          <label className="form-label">How confident are you in your team's ability to adopt and effectively use an AI-powered wellbeing dashboard? (1-5)</label>
          <p className="form-help">Scale: Not confident at all to Extremely confident.</p>
          <div className="scale-container">
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} className={`scale-item ${formData.q17 === num ? 'selected' : ''}`}>
                <input type="radio" name="q17" value={num} onChange={() => handleRatingChange('q17', num)} checked={formData.q17 === num} />
                {num}
              </label>
            ))}
          </div>
        </div>
      )
    }
  ];

  const current = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const sections = ['Personal info & work details', 'Problem & current practice', 'Solution value & buying readiness', 'AI/Tech readiness'];

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
    <div className="assessment-page assessment-path-hr theme-hr">
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
          <span className="assessment-header-title">Organizational Assessment</span>
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
          path="hr"
          onSectionClick={handleSectionClick}
        />

        <main className="assessment-main">
          <div className="survey-badge">PHASE 2 & 3 VALIDATION</div>

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
          SCREEN {current.sectionIndex + 2} OF {sections.length + 2} — HR ASSESSMENT
        </div>
        <div className="bottom-bar-dots">
          {steps.map((_, idx) => {
            const val = formData[`q${idx + 1}`];
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

export default DecisionMakerForm;
