export const analyzeEmployeeCohort = (cohort) => {
  if (!cohort || cohort.length === 0) return [];

  const total = cohort.length;

  // Q3: Gender Distribution
  const genderBreakdown = cohort.reduce((acc, emp) => {
    // 0: Female, 1: Male, 2: Other
    const val = emp[3] === 0 ? 'Female' : emp[3] === 1 ? 'Male' : emp[3] === 2 ? 'Other' : 'Unknown';
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  const genderInsight = Object.entries(genderBreakdown)
    .map(([k, v]) => `${k}: ${Math.round((v / total) * 100)}%`)
    .join(', ');

  // Q4: Role Distribution
  const roleBreakdown = cohort.reduce((acc, emp) => {
    const roles = ['Individual Contributor', 'Team Lead', 'Manager', 'Executive'];
    const r = roles[emp[4]] || 'Unknown';
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});
  const topRole = Object.entries(roleBreakdown).sort((a, b) => b[1] - a[1])[0][0];

  // Q7: Stress Frequency (≥50% rating 4-5 = real pain)
  // Options index: 0=Rarely, 1=Monthly, 2=Weekly, 3=Several times/week, 4=Daily
  // Rating 4-5 corresponds to index 3 & 4
  const q7HighStressCount = cohort.filter(emp => emp[7] >= 3).length;
  const q7HighStressPct = (q7HighStressCount / total) * 100;
  const q7RealPain = q7HighStressPct >= 50;

  // Q8: Stress Severity (Mean ≥3.5 = urgent problem)
  // Survey ratings: 1 to 5 mapping to indices: 0 is rating 1 ("Manageable"), 4 is rating 5 ("Overwhelming")
  // Score mapping: index + 1 = Severity Rating (1 to 5)
  const q8TotalSeverity = cohort.reduce((sum, emp) => sum + (emp[8] + 1), 0);
  const q8Mean = q8TotalSeverity / total;
  const q8Urgent = q8Mean >= 3.5;

  // Q9: Comfort Discussing (Mean ≤3 = cultural barrier)
  const q9TotalComfort = cohort.reduce((sum, emp) => sum + (emp[9] + 1), 0);
  const q9Mean = q9TotalComfort / total;
  const q9Barrier = q9Mean <= 3;

  // Q10: Current Support (% selecting "No one" or informal)
  // Options: 0=Friends, 1=Manager, 2=Apps, 3=Therapist, 4=No one
  // Informal = Friends (0), No one (4)
  const q10InformalCount = cohort.filter(emp => Array.isArray(emp[10]) && (emp[10].includes(0) || emp[10].includes(4))).length;
  const q10InformalPct = (q10InformalCount / total) * 100;

  // Q11: Needed Support (Past Year) (% Yes)
  // Options: 0=Yes, 1=No
  const q11YesCount = cohort.filter(emp => emp[11] === 0).length;
  const q11YesPct = (q11YesCount / total) * 100;

  // Q12: Likelihood to Use Tool (≥70% rating 4-5 = strong fit)
  const q12HighLikelihoodCount = cohort.filter(emp => emp[12] >= 3).length; // Index 3,4 = Rating 4,5
  const q12HighLikelihoodPct = (q12HighLikelihoodCount / total) * 100;
  const q12StrongFit = q12HighLikelihoodPct >= 70;

  // Q13: Expected Usage (≥50% weekly+ = engagement validated)
  // Options: 0=Never, 1=Occasionally, 2=Monthly, 3=Weekly, 4=Multiple times/week
  // Weekly+ is index 3 or 4
  const q13WeeklyPlusCount = cohort.filter(emp => emp[13] >= 3).length;
  const q13WeeklyPlusPct = (q13WeeklyPlusCount / total) * 100;
  const q13EngagementValidated = q13WeeklyPlusPct >= 50;

  return [
    {
      qId: 1, title: 'Name Formatting', rule: 'Identifier only',
      metric: `${total} Profiles Extracted`,
      met: true, action: 'CRM tagging & anonymization successful'
    },
    {
      qId: 2, title: 'Email Extraction', rule: 'Contact validation',
      metric: `100% Valid Emails`,
      met: true, action: 'Build beta user list for upcoming rollouts'
    },
    {
      qId: 3, title: 'Gender Distribution', rule: '% distribution',
      metric: genderInsight,
      met: true, action: 'Optional segmentation insights available'
    },
    {
      qId: 4, title: 'Job Role Type', rule: '% by role',
      metric: `Top Role: ${topRole}`,
      met: true, action: `Target high-adoption roles (${topRole}) first`
    },
    {
      qId: 7, title: 'Stress Frequency', rule: '≥50% rating 4–5 = real pain',
      metric: `${q7HighStressPct.toFixed(1)}% reporting frequent stress`,
      met: q7RealPain, action: q7RealPain ? 'Confirm strong demand. Immediate intervention recommended.' : 'Monitor baseline frequency.'
    },
    {
      qId: 8, title: 'Stress Severity', rule: 'Mean ≥3.5 = urgent problem',
      metric: `Mean Severity: ${q8Mean.toFixed(1)} / 5.0`,
      met: q8Urgent, action: q8Urgent ? 'Emphasize mental health urgency & EAP escalation' : 'Continue tracking severity ranges'
    },
    {
      qId: 9, title: 'Comfort Discussing', rule: 'Mean ≤3 = cultural barrier',
      metric: `Mean Comfort: ${q9Mean.toFixed(1)} / 5.0`,
      met: q9Barrier, action: q9Barrier ? 'Cultural Barrier Identified: Position as safe/private solution' : 'Open communication culture detected'
    },
    {
      qId: 10, title: 'Current Support', rule: '% selecting "No one" or informal',
      metric: `${q10InformalPct.toFixed(1)}% relying on informal/no support`,
      met: q10InformalPct > 40, action: 'Position as accessible alternative to bridge professional gaps'
    },
    {
      qId: 11, title: 'Needed Support (Past Year)', rule: '% Yes = market size validation',
      metric: `${q11YesPct.toFixed(1)}% needed clinical support`,
      met: q11YesPct > 20, action: 'Quantify addressable user base for premium tier'
    },
    {
      qId: 12, title: 'Likelihood to Use Tool', rule: '≥70% rating 4–5 = strong fit',
      metric: `${q12HighLikelihoodPct.toFixed(1)}% highly likely to adopt`,
      met: q12StrongFit, action: q12StrongFit ? 'Proceed with wearable-based model roll-out' : 'Investigate adoption friction points'
    },
    {
      qId: 13, title: 'Expected Usage', rule: '≥50% weekly+ = engagement validated',
      metric: `${q13WeeklyPlusPct.toFixed(1)}% expect weekly+ usage`,
      met: q13EngagementValidated, action: q13EngagementValidated ? 'Strengthen ROI case for employers' : 'Review feature stickiness'
    }
  ];
};

export const generateMockCohort = (size = 50) => {
  const cohort = [];
  for (let i = 0; i < size; i++) {
    cohort.push({
      // Values map to the indices used in EmployeeForm.jsx submission
      1: `Emp ${i}`, // Name
      2: `emp${i}@company.com`, // Email
      3: Math.floor(Math.random() * 2), // 0: Female, 1: Male
      4: Math.floor(Math.random() * 4), // Role
      5: Math.floor(Math.random() * 4), // Tenure
      6: Math.floor(Math.random() * 4), // Hours
      7: Math.random() > 0.4 ? (Math.random() > 0.5 ? 3 : 4) : Math.floor(Math.random() * 3), // Bias towards 3-4 (4-5 rating)
      8: Math.random() > 0.3 ? (Math.random() > 0.5 ? 3 : 4) : Math.floor(Math.random() * 3), // Bias towards severity 4-5
      9: Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 3, // Bias towards low comfort
      10: [0, 4], // Support
      11: Math.random() > 0.7 ? 0 : 1, // 30% Yes (0)
      12: Math.random() > 0.2 ? 4 : 2, // Bias towards High Likelihood (5)
      13: Math.random() > 0.3 ? 3 : 1, // Bias towards Weekly
      14: [0, 1], // Barriers
      15: [0, 1], // Sharing
      16: 0, // Notifications
      17: [0, 3] // Features
    });
  }
  return cohort;
};

export const analyzeHRCohort = (cohort) => {
  if (!cohort || cohort.length === 0) return [];
  const total = cohort.length;

  // Q4: Job Title (0: CEO, 1: MD, 2: HR Manager, 3: Wellbeing/People Lead, 4: L&D, 5: Other)
  const dmCount = cohort.filter(hr => hr[4] <= 2).length;
  const dmPct = (dmCount / total) * 100;

  // Q8: Problem Severity (0: 1, 4: 5)
  const q8Total = cohort.reduce((sum, hr) => sum + (hr[8] + 1), 0);
  const q8Mean = q8Total / total;
  const q8StrongDemand = q8Mean >= 4;

  // Q9: Top Challenges
  const challengesOptions = ['High burnout rate', 'Absenteeism', 'Low employee engagement', 'High turnover', 'Mental health complaints', 'No major issues'];
  const challengeCounts = [0, 0, 0, 0, 0, 0];
  cohort.forEach(hr => {
    if (Array.isArray(hr[9])) hr[9].forEach(i => challengeCounts[i]++);
  });
  const topChallengeIndex = challengeCounts.indexOf(Math.max(...challengeCounts.slice(0, 5))); // ignore 'None'

  // Q10: Current Solution
  const noneCount = cohort.filter(hr => hr[10] === 0).length;
  const nonePct = (noneCount / total) * 100;

  // Q11: Satisfaction (0: 1, 4: 5)
  const q11Total = cohort.reduce((sum, hr) => sum + (hr[11] + 1), 0);
  const q11Mean = q11Total / total;
  const q11Dissatisfied = q11Mean <= 3;

  // Q12: Budget (WTP) (2: $100-$200, 3: $200-$500, 4: >$500)
  const budget100Plus = cohort.filter(hr => hr[12] >= 2).length;
  const wtpPct = (budget100Plus / total) * 100;

  // Q13: Decision Timeline (0: 0-3, 1: 3-6)
  const timeline0to6 = cohort.filter(hr => hr[13] <= 1).length;
  const timelinePct = (timeline0to6 / total) * 100;
  const hotSegment = timelinePct > 30;

  // Q15: Pilot Approval (0: Yes)
  const yesCount = cohort.filter(hr => hr[15] === 0).length;
  const pilotPct = (yesCount / total) * 100;
  const strongBuyingIntent = pilotPct >= 50;

  // Q17: AI Adoption Confidence (0: 1, 4: 5)
  const q17Total = cohort.reduce((sum, hr) => sum + (hr[17] + 1), 0);
  const q17Mean = q17Total / total;
  const techReady = q17Mean >= 4;

  return [
    {
      qId: 4, title: 'Job Title', rule: '% by role; decision-makers', phase: 'Go-to-Market',
      metric: `${Math.round(dmPct)}% are Core Decision Makers`,
      met: true, action: 'Prioritize decision-makers in outreach'
    },
    {
      qId: 8, title: 'Problem Severity', rule: 'Mean ≥4 = strong demand', phase: 'Phase 2 Validation',
      metric: `Mean Severity: ${q8Mean.toFixed(1)} / 5.0`,
      met: q8StrongDemand, action: q8StrongDemand ? 'Lead with urgency & pain narrative' : 'Develop awareness content'
    },
    {
      qId: 9, title: 'Top Challenges', rule: 'Top issues >40%', phase: 'Phase 2 Validation',
      metric: `Top Challenge: ${challengesOptions[topChallengeIndex]}`,
      met: true, action: 'Align product messaging to top 2-3 pains'
    },
    {
      qId: 10, title: 'Current Solution', rule: '% "None"', phase: 'Go-to-Market',
      metric: `${Math.round(nonePct)}% using no formal solution`,
      met: true, action: 'Position vs dominant alternative / educate if none'
    },
    {
      qId: 11, title: 'Satisfaction', rule: 'Mean ≤3 = dissatisfaction', phase: 'Phase 2 Validation',
      metric: `Mean Satisfaction: ${q11Mean.toFixed(1)} / 5.0`,
      met: q11Dissatisfied, action: q11Dissatisfied ? 'Competitive comparison + superiority proof' : 'Focus on complementary features'
    },
    {
      qId: 12, title: 'Budget (WTP)', rule: 'Median ≥$100 = viable economics', phase: 'Phase 3 Validation',
      metric: `${Math.round(wtpPct)}% willing to pay ≥$100/yr`,
      met: wtpPct >= 50, action: wtpPct >= 50 ? 'Confirm pricing & revenue model' : 'Re-evaluate pricing tiers'
    },
    {
      qId: 13, title: 'Decision Timeline', rule: '% 0-6 months >30% = hot segment', phase: 'Phase 3 Validation',
      metric: `${Math.round(timelinePct)}% deciding in 0-6 months`,
      met: hotSegment, action: hotSegment ? 'Immediate sales targeting' : 'Nurture campaigns'
    },
    {
      qId: 15, title: 'Pilot Approval', rule: '≥50% Yes = strong buying intent', phase: 'Phase 3 Validation',
      metric: `${Math.round(pilotPct)}% approved paid pilot`,
      met: strongBuyingIntent, action: strongBuyingIntent ? 'Launch structured paid pilot' : 'Reduce pilot barriers/cost'
    },
    {
      qId: 17, title: 'AI Adoption Confidence', rule: 'Mean ≥4 = tech-ready culture', phase: 'Go-to-Market',
      metric: `Mean Confidence: ${q17Mean.toFixed(1)} / 5.0`,
      met: techReady, action: techReady ? 'Emphasize AI positioning' : 'Simplify onboarding & reduce AI jargon'
    }
  ];
};

export const generateMockHRCohort = (size = 30) => {
  const cohort = [];
  for (let i = 0; i < size; i++) {
    cohort.push({
      1: `Decision Maker ${i}`, // Name
      2: `dm${i}@acme.com`, // Email
      3: Math.floor(Math.random() * 2), // Gender
      4: Math.floor(Math.random() * 3), // Role (Bias towards 0-2: CEO/MD/HR)
      5: Math.floor(Math.random() * 5), // Size
      6: Math.floor(Math.random() * 5), // Industry
      7: Math.floor(Math.random() * 4), // Tenure
      8: Math.random() > 0.2 ? (Math.random() > 0.5 ? 4 : 3) : Math.floor(Math.random() * 3), // Bias towards 4-5 severity (index 3-4)
      9: [0, 1], // Challenges
      10: Math.random() > 0.6 ? 0 : 1, // Solution (Bias to None or EAP)
      11: Math.random() > 0.5 ? Math.floor(Math.random() * 2) : 2, // Satisfaction (Bias to low: 1-3 -> index 0-2)
      12: Math.random() > 0.3 ? 2 : 1, // Budget (Bias to $100-$200 -> index 2)
      13: Math.random() > 0.4 ? 0 : 2, // Timeline (Bias to 0-3 months)
      14: 0, // ROI
      15: Math.random() > 0.3 ? 0 : 2, // Pilot Approval (Bias to Yes -> index 0)
      16: 0, // Feature
      17: Math.random() > 0.4 ? 3 : 2 // AI Confidence -> Bias to 4 (index 3)
    });
  }
  return cohort;
};

