import React, { useMemo, useRef } from 'react';
import './ResultsPage.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const getCategory = (percent) => {
  if (percent >= 80) return { label: 'Thriving', color: '#4ade80', icon: '✦' };
  if (percent >= 60) return { label: 'Functioning Well', color: '#86efac', icon: '◎' };
  if (percent >= 40) return { label: 'At Risk', color: '#c8973a', icon: '⚠' };
  return { label: 'Burnout Risk', color: '#c8973a', icon: '△' };
};

const getHRCategory = (percent) => {
  if (percent >= 80) return { label: 'Wellbeing Leader', color: '#4ade80', icon: '✦' };
  if (percent >= 60) return { label: 'Developing Culture', color: '#86efac', icon: '◎' };
  if (percent >= 40) return { label: 'Gap Identified', color: '#fbbf24', icon: '⚠' };
  return { label: 'Urgent Action Needed', color: '#f87171', icon: '△' };
};

const ResultsPage = ({ path, answers, questions, onRestart, onSelectEmpInterview, onSelectDMInterview }) => {
  const reportRef = useRef(null);

  const { percent, category } = useMemo(() => {
    let _score = 0, _maxScore = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (q.type === 'radio' && ans !== undefined && ans >= 0 && q.options && q.options[ans] && q.options[ans].score !== null) {
        _score += q.options[ans].score;
        _maxScore += 5;
      } else if (q.type === 'checkbox' && Array.isArray(ans) && q.options) {
        _score += ans.reduce((sum, idx) => sum + (idx >= 0 && q.options[idx] ? (q.options[idx].score || 0) : 0), 0);
        _maxScore += q.options.filter(o => o.score === 1).length;
      }
    });
    const percent = _maxScore > 0 ? Math.round((_score / _maxScore) * 100) : 0;
    const category = path === 'employee' ? getCategory(percent) : getHRCategory(percent);
    return { percent, category };
  }, [answers, questions, path]);

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a0f1e', // Match theme background
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`sehatti-${path}-report.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className={`results-page ${path === 'hr' ? 'hr-report' : 'employee-report'}`}>
      <div className="results-blob-1" aria-hidden="true" />
      <div className="results-blob-2" aria-hidden="true" />

      {/* Header */}
      <header className="results-header" aria-label="Results header">
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
        <div className="results-header-right">
          <div className="header-status-badge" style={{ color: '#2bb69e', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
            <span className="status-dot">✓</span> {path === 'hr' ? 'Organizational Report Ready' : 'Employee Assessment Complete'}
          </div>
          <button className="btn-restart-header" type="button" onClick={onRestart}>
            Start New Assessment
          </button>
        </div>
      </header>

      {path === 'hr' ? (
        <div className="hr-results-container" ref={reportRef}>
          <header className="hr-results-top">
            <div className="hr-results-breadcrumb">SCREEN 5 OF 5 — HR ORG REPORT · AUTOMATED SUMMARY</div>
            <div className="hr-report-meta">ORGANIZATIONAL WELLBEING REPORT · FEBRUARY 2026</div>
            <h1 className="hr-report-title font-playfair">
              Organizational Readiness Score: <span className="score-num">{percent}</span>
            </h1>
            <p className="hr-report-subtitle">
              Acme Corporation · 500–1,000 employees · Technology Sector · UAE
            </p>
          </header>

          <div className="hr-results-layout">
            <main className="hr-results-main-col">
              <section className="hr-score-card">
                <div className="hr-score-ring">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <circle
                      cx="80" cy="80" r="70"
                      fill="none"
                      stroke="#2bb69e"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (percent / 100) * 440}
                      transform="rotate(-90 80 80)"
                      style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                    />
                    <text x="80" y="75" textAnchor="middle" fill="white" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="38" fontWeight="400">{percent}</text>
                    <text x="80" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="'Inter', sans-serif" fontSize="13">/100</text>
                  </svg>
                </div>
                <div className="hr-score-text">
                  <h2 className="score-category-label">Developing Readiness</h2>
                  <div className="benchmark-tag">MID-TIER GCC BENCHMARK</div>
                  <p>
                    Your organization has foundational wellbeing elements in place but significant strategic gaps remain in mental health programming and data-driven decision-making. You are positioned in the 45th percentile among GCC organizations in your sector.
                  </p>
                </div>
              </section>

              <section className="hr-gap-analysis">
                <h3 className="section-title">WELLBEING GAP ANALYSIS VS GCC BENCHMARK</h3>
                <div className="gap-items">
                  {[
                    { label: 'Mental Health Programs', val: 35, status: 'error' },
                    { label: 'Burnout Prevention Policy', val: 50, status: 'warning' },
                    { label: 'Wellbeing Budget Allocation', val: 40, status: 'error' },
                    { label: 'Data & Measurement', val: 25, status: 'error' },
                    { label: 'Leadership Wellbeing Training', val: 65, status: 'success' },
                  ].map((item, i) => (
                    <div className="gap-item" key={i}>
                      <div className="gap-info">
                        <span className="gap-label">{item.label}</span>
                        <span className={`gap-percent ${item.status}`}>{item.val}%</span>
                      </div>
                      <div className="gap-bar-track">
                        <div
                          className={`gap-bar-fill ${item.status}`}
                          style={{ width: `${item.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="gap-legend">
                    <span className="legend-item"><span className="legend-dot user" /> Your score</span>
                    <span className="legend-item"><span className="legend-dot benchmark" /> GCC Benchmark</span>
                  </div>
                </div>
              </section>

              <div className="hr-results-actions">
                <button className="btn-hr-primary" onClick={handleShare}>Share Results</button>
                <button className="btn-hr-secondary" onClick={downloadPDF}>Download Full Report (PDF)</button>
                <button className="btn-hr-secondary" style={{ borderColor: 'var(--theme-accent)', color: 'var(--theme-accent)' }} onClick={onSelectDMInterview}>Open Evaluator Console</button>
              </div>
            </main>

            <aside className="hr-results-sidebar">
              <section className="hr-widget summary-widget">
                <h3 className="widget-title">ORGANIZATIONAL SUMMARY</h3>
                <div className="summary-stat">
                  <span className="stat-label">READINESS SCORE</span>
                  <span className="stat-value">{percent} / 100</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">GCC SECTOR PERCENTILE</span>
                  <span className="stat-value">45th percentile</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">CRITICAL GAP</span>
                  <span className="stat-value text-red">Data & Measurement (25%)</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">STRONGEST AREA</span>
                  <span className="stat-value text-green">Leadership Training (65%)</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">PILOT ELIGIBILITY</span>
                  <span className="stat-value text-green">Eligible — Recommended</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">CRM STATUS</span>
                  <span className="stat-value text-gold">Warm Lead · Tagged</span>
                </div>
              </section>

              <section className="hr-widget pilot-offer-card">
                <h3 className="pilot-card-title">Free Pilot Offer</h3>
                <p>Your organization qualifies for a 30-day SEHATTI pilot program. A dedicated wellbeing strategist will reach out within 48 hours.</p>
                <button className="btn-pilot-cta">Confirm Pilot Interest &rarr;</button>
              </section>
            </aside>
          </div>
        </div>
      ) : (
        <div className="emp-results-container" ref={reportRef}>
          <header className="emp-results-top">
            <div className="emp-results-breadcrumb">SCREEN 4 OF 5 — EMPLOYEE RESULTS · AUTOMATED REPORT</div>
            <div className="emp-report-meta">YOUR PERSONAL REPORT · FEBRUARY 2026</div>
            <h1 className="hr-report-title font-playfair">
              Your Wellbeing Score Is <span className="score-num-gold">{percent}</span>
            </h1>
            <p className="hr-report-subtitle">
              Based on {Object.keys(answers).length} responses across 5 wellbeing dimensions
            </p>
          </header>

          <div className="emp-results-layout">
            <main className="emp-results-main-col">
              <section className="emp-score-card">
                <div className="hr-score-ring">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <circle
                      cx="80" cy="80" r="70"
                      fill="none"
                      stroke="#c8973a"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (percent / 100) * 440}
                      transform="rotate(-90 80 80)"
                      style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                    />
                    <text x="80" y="75" textAnchor="middle" fill="white" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="38" fontWeight="400">{percent}</text>
                    <text x="80" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="'Inter', sans-serif" fontSize="13">/100</text>
                  </svg>
                </div>
                <div className="hr-score-text">
                  <h2 className="score-category-label-gold">{category.label || 'Moderate Wellbeing'}</h2>
                  <div className="benchmark-tag-gold">CAUTION ZONE</div>
                  <p>
                    Your score indicates moderate workplace wellbeing with some areas of concern. Focus areas: emotional depletion and work-life boundaries. You are performing above 42% of GCC respondents.
                  </p>
                </div>
              </section>

              <section className="emp-dimension-analysis">
                <h3 className="section-title-gold">DIMENSION BREAKDOWN</h3>
                <div className="emp-dimension-grid">
                  {[
                    { label: 'Emotional Resilience', val: 55, color: '#fbbf24' },
                    { label: 'Productivity & Focus', val: 72, color: '#2bb69e' },
                    { label: 'Social Connection', val: 80, color: '#2bb69e' },
                    { label: 'Work-Life Balance', val: 48, color: '#f87171' },
                    { label: 'Sense of Purpose', val: 75, color: '#2bb69e' },
                    { label: 'Burnout Risk', val: 62, color: '#c8973a' },
                  ].map((dim, i) => (
                    <div className="dimension-card" key={i}>
                      <div className="dim-label">{dim.label}</div>
                      <div className="dim-track">
                        <div
                          className="dim-fill"
                          style={{ width: `${dim.val}%`, background: dim.color }}
                        />
                      </div>
                      <div className="dim-value">{dim.val} / 100</div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="emp-results-actions">
                <button className="btn-emp-primary" onClick={handleShare}>Share Results</button>
                <button className="btn-emp-primary" onClick={downloadPDF}>Download My Report (PDF)</button>
                <button className="btn-emp-secondary" style={{ borderColor: 'var(--theme-accent)', color: 'var(--theme-accent)' }} onClick={onSelectEmpInterview}>Open Evaluator Console</button>
              </div>
            </main>

            <aside className="hr-results-sidebar">
              <section className="hr-widget summary-widget">
                <h3 className="widget-title-gold">QUICK INSIGHTS</h3>
                <div className="summary-stat">
                  <span className="stat-label">OVERALL SCORE</span>
                  <span className="stat-value">{percent} / 100</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">BURNOUT RISK LEVEL</span>
                  <span className="stat-value text-gold">Moderate Risk</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">STRONGEST AREA</span>
                  <span className="stat-value text-green">Social Connection (80)</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">FOCUS AREA</span>
                  <span className="stat-value text-red">Work-Life Balance (48)</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">GCC PERCENTILE</span>
                  <span className="stat-value">Above 58% of respondents</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">RECOMMENDED ACTION</span>
                  <span className="stat-value">Boundary-setting coaching session</span>
                </div>
              </section>

              <section className="emp-widget ai-guide-card">
                <h3 className="ai-guide-title font-playfair">Your Free AI Guide</h3>
                <p>Based on your results, we've prepared a personalized 7-day micro-wellbeing plan to help you build resilience and improve work-life balance.</p>
                <button className="btn-ai-cta" onClick={onRestart}>Access Your Guide &rarr;</button>
              </section>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
