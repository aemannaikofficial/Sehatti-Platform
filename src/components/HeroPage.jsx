import React from 'react';
import './HeroPage.css';

const HeroPage = ({ onSelectPath, onSelectDMSurvey, onSelectEmpSurvey }) => {
  return (
    <div className="wrapper">
      {/* Top Banner */}
      <div className="topBanner">
        HIGH FIDELITY WIREFRAME MOCKUP — SEHATTI WORKPLACE WELLBEING DIAGNOSTIC PORTAL — SURVEY.SEHATTI.COM
      </div>

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <div className="logoIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="7.5" />
              <path d="M12 7v10" strokeLinecap="round" />
              <path d="M8 10.5 Q 12 15 16 10.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="logoText">SEHATTI</span>
        </div>
        <div className="navRight">
          <div className="screenLabel">SCREEN 1 OF 5 — MAIN ENTRY</div>
          <nav className="navLinks">
            <a href="#path-cards" className="navLink">About</a>
            <a href="#stats" className="navLink">GCC Report 2026</a>
            <a href="#corporates" className="navLink">For Corporates</a>
            <button className="navLoginBtn" type="button">Login</button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="hero">
        <div className="heroEyebrow">GCC WORKPLACE WELLBEING INITIATIVE 2026</div>

        <h1 className="heroTitle">
          Measure Your <br />
          <span className="heroTitleItalic">Workplace Wellbeing</span> <br />
          Today
        </h1>

        <p className="heroSubtitle">
          A free, confidential diagnostic designed for employees and HR
          leaders across the GCC. Receive your personalized report in under 5 minutes.
        </p>

        {/* Path Cards */}
        <div className="pathCards" id="path-cards">
          {/* Employee Path */}
          <article className="pathCard" onClick={() => onSelectPath('employee')}>
            <div className="pathIconWrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8973a" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="pathLabel">PATH 01</div>
            <h2 className="pathTitle">Employee<br />Assessment</h2>
            <p className="pathDesc">
              Discover your personal wellbeing score and understand the factors shaping
              your performance and mental health at work.
            </p>
            <ul className="pathFeatures">
              <li>Burnout Risk Indicator (0–100)</li>
              <li>Stress Trigger Analysis</li>
              <li>Engagement Score</li>
              <li>AI Wellbeing Mini-Guide</li>
              <li>1:1 Coaching Draw Entry</li>
            </ul>
            <button className="pathCta" type="button" onClick={(e) => { e.stopPropagation(); onSelectEmpSurvey(); }}>
              Begin Assessment
              <span className="ctaArrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="#c8973a" strokeWidth="1" fill="none" />
                  <path d="M10 16L14 12L10 8" stroke="#c8973a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </article>

          {/* HR / Manager Path */}
          <article className="pathCard" onClick={onSelectDMSurvey}>
            <div className="pathIconWrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8973a" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18M8 2v4M16 2v4" />
              </svg>
            </div>
            <div className="pathLabel">PATH 02</div>
            <h2 className="pathTitle">Organizational Wellbeing<br />Assessment</h2>
            <p className="pathDesc">
              Evaluate your organization's wellbeing readiness and identify strategic gaps
              against GCC benchmarks.
            </p>
            <ul className="pathFeatures">
              <li>Organizational Wellbeing Gap Report</li>
              <li>GCC Benchmark Comparison</li>
              <li>Policy & Budget Gap Analysis</li>
              <li>Free Pilot Eligibility</li>
              <li>Strategy Consultation Call</li>
            </ul>
            <button className="pathCta" type="button" onClick={(e) => { e.stopPropagation(); onSelectDMSurvey(); }}>
              Evaluate My Organization
              <span className="ctaArrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="#c8973a" strokeWidth="1" fill="none" />
                  <path d="M10 16L14 12L10 8" stroke="#c8973a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </article>
        </div>

        {/* Stats Bar */}
        <div className="statsBar" id="stats">
          <div className="statItem">
            <span className="statNumber">10–12</span>
            <span className="statLabel">Questions</span>
          </div>
          <div className="statItem">
            <span className="statNumber">&lt;5 min</span>
            <span className="statLabel">Completion Time</span>
          </div>
          <div className="statItem">
            <span className="statNumber">100%</span>
            <span className="statLabel">Confidential</span>
          </div>
          <div className="statItem">
            <span className="statNumber">Free</span>
            <span className="statLabel">No Account Required</span>
          </div>
        </div>

        {/* Trust Line */}
        <p className="trustLine">
          survey.sehatti.com &nbsp;·&nbsp; Secure &nbsp;·&nbsp; GCC-focused &nbsp;·&nbsp; Data never sold
        </p>

        {/* Bottom Banner */}
        <div className="bottomBanner">
          SEHATTI.COM — WELLBEING REDEFINED FOR THE GCC WORKFORCE
        </div>
      </main>
    </div>
  );
};

export default HeroPage;
