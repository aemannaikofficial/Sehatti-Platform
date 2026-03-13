import React, { useState } from 'react';
import '../AssessmentPage.css';
import './Forms.css';

const DecisionMakerInterview = ({ onRestart }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    surveySeverity: '',
    q1Content: '', q1Specificity: '', q1Emotion: '', q1Quote: '',
    q2Content: '', q2Specificity: '', q2Emotion: '', q2Quote: '',
    q3Content: '', q3Specificity: '', q3Emotion: '', q3Quote: '',
    q4Content: '', q4Specificity: '', q4Emotion: '', q4Quote: ''
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'name') {
      value = value.replace(/[^a-zA-Z\s-]/g, '');
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateScore = (content, specificity, emotion) => {
    if (!content || !specificity || !emotion) return null;
    const score = (Number(content) * 0.6) + (Number(specificity) * 0.15) + (Number(emotion) * 0.25);
    return score.toFixed(2);
  };

  const scores = {
    q1: calculateScore(formData.q1Content, formData.q1Specificity, formData.q1Emotion),
    q2: calculateScore(formData.q2Content, formData.q2Specificity, formData.q2Emotion),
    q3: calculateScore(formData.q3Content, formData.q3Specificity, formData.q3Emotion),
    q4: calculateScore(formData.q4Content, formData.q4Specificity, formData.q4Emotion),
  };

  const numScored = Object.values(scores).filter(s => s !== null).length;
  const avgScore = numScored > 0 
    ? (Object.values(scores).reduce((sum, s) => sum + (s ? Number(s) : 0), 0) / numScored).toFixed(2) 
    : 0;

  const renderQuestion = (qNum, title, phase, prompt, contentRubric, specRubric, emotionRubric, analysisGoal) => {
    const score = scores[`q${qNum}`];
    const isPassing = score && Number(score) >= 4;

    return (
      <div className="form-group" style={{ backgroundColor: 'var(--theme-bg)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px' }}>
        <h3 style={{ color: 'var(--theme-accent)', fontSize: '18px', marginBottom: '8px', fontFamily: "'Playfair Display', serif" }}>Q{qNum}: {title} ({phase})</h3>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', marginBottom: '16px', fontSize: '15px' }}>"{prompt}"</p>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {/* Content Score */}
          <div style={{ flex: '1 1 200px' }}>
            <label className="form-label" style={{ fontSize: '13px' }}>Content (60%)</label>
            <p className="form-help" style={{ fontSize: '11px', marginBottom: '8px', lineHeight: '1.4' }}>{contentRubric}</p>
            <select name={`q${qNum}Content`} value={formData[`q${qNum}Content`]} onChange={handleChange} className="form-input" style={{ width: '100%', color: formData[`q${qNum}Content`] ? '#ffffff' : 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <option value="" disabled style={{ color: '#000' }}>Select (1-5)</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} style={{ color: '#000' }}>{n}</option>)}
            </select>
          </div>

          {/* Specificity Score */}
          <div style={{ flex: '1 1 200px' }}>
            <label className="form-label" style={{ fontSize: '13px' }}>Specificity (15%)</label>
            <p className="form-help" style={{ fontSize: '11px', marginBottom: '8px', lineHeight: '1.4' }}>{specRubric}</p>
            <select name={`q${qNum}Specificity`} value={formData[`q${qNum}Specificity`]} onChange={handleChange} className="form-input" style={{ width: '100%', color: formData[`q${qNum}Specificity`] ? '#ffffff' : 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <option value="" disabled style={{ color: '#000' }}>Select (1-5)</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} style={{ color: '#000' }}>{n}</option>)}
            </select>
          </div>

          {/* Emotion Score */}
          <div style={{ flex: '1 1 200px' }}>
            <label className="form-label" style={{ fontSize: '13px' }}>Emotion (25%)</label>
            <p className="form-help" style={{ fontSize: '11px', marginBottom: '8px', lineHeight: '1.4' }}>{emotionRubric}</p>
            <select name={`q${qNum}Emotion`} value={formData[`q${qNum}Emotion`]} onChange={handleChange} className="form-input" style={{ width: '100%', color: formData[`q${qNum}Emotion`] ? '#ffffff' : 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <option value="" disabled style={{ color: '#000' }}>Select (1-5)</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} style={{ color: '#000' }}>{n}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label className="form-label" style={{ fontSize: '13px' }}>Key Quote</label>
          <input 
            type="text" 
            name={`q${qNum}Quote`} 
            value={formData[`q${qNum}Quote`]} 
            onChange={handleChange} 
            className="form-input" 
            placeholder="Type exact phrasing here..." 
            style={{ width: '100%' }}
          />
        </div>

        {score !== null && (
          <div style={{ 
            marginTop: '20px', 
            padding: '16px', 
            backgroundColor: 'rgba(0,0,0,0.2)', 
            borderRadius: '8px',
            borderLeft: `4px solid ${isPassing ? '#4ade80' : '#f87171'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Weighted Score</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: "'Playfair Display', serif" }}>{score} <span style={{fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: '400'}}>/ 5.00</span></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Analysis Rule / Action</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: isPassing ? '#4ade80' : '#f87171' }}>
                {isPassing ? '✓ ' + analysisGoal.pass : '⚠ ' + analysisGoal.fail}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="assessment-page assessment-path-hr theme-hr" style={{ height: 'auto', minHeight: '100vh', overflowY: 'auto' }}>
      <header className="assessment-header" style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--theme-bg)' }}>
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
          <span className="assessment-header-title">Interviewer Console</span>
          <button className="btn-restart" type="button" onClick={onRestart}>
            ← Back to Home
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div className="survey-badge" style={{ marginBottom: '16px', backgroundColor: 'rgba(43, 182, 158, 0.2)', color: 'var(--theme-accent)', border: '1px solid var(--theme-accent)' }}>INTERNAL TEAM USE ONLY</div>
            <h1 style={{ fontSize: '32px', fontFamily: "'Playfair Display', serif", marginBottom: '8px' }}>Decision Maker Interview Validation</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Live scoring and action mapping. Target: Average score ≥ 4.</p>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(43, 182, 158, 0.1)', 
            border: '1px solid var(--theme-accent)', 
            borderRadius: '12px', 
            padding: '16px 24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--theme-accent)', marginBottom: '4px' }}>Overall Average</div>
            <div style={{ fontSize: '36px', fontFamily: "'Playfair Display', serif", fontWeight: 'bold' }}>{avgScore}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 150px' }}>
            <label className="form-label">Interview ID</label>
            <input type="text" name="id" value={formData.id} onChange={handleChange} className="form-input" placeholder="e.g. HR001" />
          </div>
          <div style={{ flex: '2 1 200px' }}>
            <label className="form-label">Candidate Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="John Doe" />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label className="form-label">Survey Wellbeing Issue Severity</label>
            <select name="surveySeverity" value={formData.surveySeverity} onChange={handleChange} className="form-input" style={{ color: formData.surveySeverity ? '#ffffff' : 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <option value="" disabled style={{ color: '#000' }}>Select (1-5)</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} style={{ color: '#000' }}>{n}</option>)}
            </select>
          </div>
        </div>

        {renderQuestion(
          1, 
          "Organizational Pain Validation", 
          "Phase 2", 
          "Survey noted [pain]. Can you give a team example from the last quarter?",
          "5='Top dev quit, $30K rework cost' | 1='Normal turnover'",
          "5='$30K rework + sprint delay' | 1='Someone left'",
          "5='Head shake, serious face' | 1='Neutral, matter-of-fact'",
          { pass: "Confirm demand strength / Advance to solution positioning", fail: "Real operational pain not validated" }
        )}

        {renderQuestion(
          2, 
          "Program Gaps", 
          "Phase 2", 
          "Regarding your current EAP/solution—what's the biggest gap?",
          "5='3-week wait = useless for crisis' | 1='EAP works well'",
          "5='Employee quit during 3-week wait' | 1='Some delays'",
          "5='Urgent tone, gestures' | 1='Shrugs'",
          { pass: "Position as better alternative", fail: "Dissatisfaction not confirmed" }
        )}

        {renderQuestion(
          3, 
          "Buying Intent", 
          "Phase 3", 
          "[Budget/timeline] + 20% ROI—would you approve a pilot?",
          "5='Yes, pilot next month' | 1='Need CFO approval'",
          "5='20% productivity = $100K savings' | 1='Maybe'",
          "5='Visualizing ROI, forward lean' | 1='Hesitant, uncertain'",
          { pass: "Move to pilot discussion / Validate GTM readiness", fail: "Commercial validation weak" }
        )}

        {renderQuestion(
          4, 
          "Solution usage & AI adoption", 
          "Phase 3", 
          "If this AI dashboard were available today, how confident are you your team would use it? What features count?",
          "5='We’d integrate daily check-ins' | 1='Not confident'",
          "5='Critical features: anonymized reporting' | 1='Not sure what would help'",
          "5='Leans forward, animated, sees opportunity' | 1='Shrugs, neutral, unsure'",
          { pass: "Emphasize AI positioning", fail: "Not an AI-ready org" }
        )}

      </main>
    </div>
  );
};

export default DecisionMakerInterview;
