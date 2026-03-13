export const evaluateEmployee = (answers) => {
  if (!answers) return [];

  const insightLog = [];

  // Q1 & Q2: Identifier only (Lead identification)
  const isIdentified = !!(answers[1] || answers[2]);
  insightLog.push({
    id: 'q1-2',
    q: 'Q1-2: Identity',
    insight: 'Lead identification',
    action: isIdentified
      ? 'Build early adopter list → Invite highly engaged respondents to pilot'
      : 'Anonymous user. Add to generalized data trends.',
    status: isIdentified ? 'success' : 'neutral'
  });

  // Q3: Gender (Demographic Segmentation)
  const genders = ['Female', 'Male', 'Prefer not to say'];
  const genderText = answers[3] !== undefined && answers[3] !== -1 ? genders[answers[3]] : 'Not specified';
  insightLog.push({
    id: 'q3',
    q: 'Q3: Gender',
    insight: 'Demographic segmentation',
    action: `Optional behavioral pattern analysis: ${genderText}`,
    status: 'neutral'
  });

  // Q4: Job Role Type
  const roleIdx = answers[4];
  const isManager = roleIdx === 1 || roleIdx === 2 || roleIdx === 3;
  insightLog.push({
    id: 'q4',
    q: 'Q4: Job Role Type',
    insight: 'Role-based adoption patterns',
    action: isManager
      ? 'Tailor messaging per persona (Manager = ROI angle / team wellbeing).'
      : 'Tailor messaging per persona (IC = personal wellbeing benefit).',
    status: 'neutral'
  });

  // Q5: Years in Current Role
  insightLog.push({
    id: 'q5',
    q: 'Q5: Tenure',
    insight: 'Tenure correlation with stress',
    action: 'Assess whether newer employees show higher stress → adjust onboarding.',
    status: 'neutral'
  });

  // Q6: Work Hours per Week
  const hoursIdx = answers[6];
  const isHighHours = hoursIdx >= 2; // '45-55' and '55+'
  insightLog.push({
    id: 'q6',
    q: 'Q6: Work Hours',
    insight: 'Workload proxy for stress risk',
    action: isHighHours
      ? 'Target high-hours segment in early marketing & employer sales.'
      : 'Standard workload. Monitor baseline stress.',
    status: isHighHours ? 'warning' : 'neutral'
  });

  // Q7: Stress Frequency
  const freqVal = answers[7] !== undefined ? answers[7] + 1 : 0;
  const isFreqHigh = freqVal >= 4;
  insightLog.push({
    id: 'q7',
    q: `Q7: Stress Frequency (${freqVal}/5)`,
    insight: 'Pain frequency validation',
    action: isFreqHigh
      ? 'High frequency → Strong proof of demand. Use statistic in pitch.'
      : 'Moderate frequency. Validate alongside severity.',
    status: isFreqHigh ? 'error' : 'neutral'
  });

  // Correlation: Hours + Stress
  if (isHighHours && isFreqHigh) {
    insightLog.push({
      id: 'q6-q7-correlate',
      q: 'Q6 & Q7: Hours + Stress',
      insight: 'Critical Burnout Risk Matrix Verified',
      action: 'Overworked AND Highly Stressed segment. High conversion probability.',
      status: 'error'
    });
  }

  // Q8: Stress Severity
  const sevVal = answers[8] !== undefined ? answers[8] + 1 : 0;
  const isSevHigh = sevVal >= 4; // user said Mean >= 3.5, for individual >= 4
  insightLog.push({
    id: 'q8',
    q: `Q8: Stress Severity (${sevVal}/5)`,
    insight: 'Pain severity validation',
    action: isSevHigh
      ? 'High severity → Emphasize prevention & burnout mitigation.'
      : 'Manageable severity. Position as optimization.',
    status: isSevHigh ? 'error' : 'neutral'
  });

  // Q9: Comfort Discussing Wellbeing
  const comfortVal = answers[9] !== undefined ? answers[9] + 1 : 0;
  const isLowComfort = comfortVal <= 3;
  insightLog.push({
    id: 'q9',
    q: `Q9: Discuss Comfort (${comfortVal}/5)`,
    insight: 'Cultural barrier assessment',
    action: isLowComfort
      ? 'Low comfort → Emphasize privacy, anonymity & AI-based support.'
      : 'High comfort. Culture is open.',
    status: isLowComfort ? 'warning' : 'success'
  });

  // Q10: Current Support Sources
  const supportAns = answers[10] || [];
  const usesNoOne = supportAns.includes(4); // index 4 is 'No one'
  insightLog.push({
    id: 'q10',
    q: 'Q10: Current Support',
    insight: 'Behavioral alternatives map',
    action: usesNoOne
      ? 'Position platform against "No one" → accessible alternative.'
      : 'Position platform against existing alternatives; highlight gaps.',
    status: usesNoOne ? 'warning' : 'neutral'
  });

  // Q11: Needed MH Support in Past Year
  const neededSupport = answers[11] === 0; // 'Yes' is 0
  insightLog.push({
    id: 'q11',
    q: 'Q11: Needed Support',
    insight: 'Quantifies real market size',
    action: neededSupport
      ? 'Strong market demand signal. Use as baseline statistic.'
      : 'No prior clinical need detected.',
    status: neededSupport ? 'error' : 'neutral'
  });

  // Q12: Likelihood to Use Wearable
  const likeVal = answers[12] !== undefined ? answers[12] + 1 : 0;
  const isStrongFit = likeVal >= 4;
  insightLog.push({
    id: 'q12',
    q: `Q12: Likelihood to Use (${likeVal}/5)`,
    insight: 'Solution adoption intent',
    action: isStrongFit
      ? 'High intent → Proceed confidently to pilot list.'
      : 'Moderate/Low intent → Adjust feature clarity and messaging.',
    status: isStrongFit ? 'success' : 'warning'
  });

  // Q13: Expected Usage Frequency
  const freqUsageIdx = answers[13];
  const isHighUsage = freqUsageIdx >= 3; // 'Weekly' or 'Multiple times per week'
  insightLog.push({
    id: 'q13',
    q: 'Q13: Expected Usage',
    insight: 'Engagement prediction (ROI case)',
    action: isHighUsage
      ? 'High projected engagement → Strengthens ROI modeling.'
      : 'Low projected engagement → Plan retention strategies.',
    status: isHighUsage ? 'success' : 'neutral'
  });

  // Q14 & Q15 & Q16 & Q17
  insightLog.push({
    id: 'q14-17',
    q: 'Q14-17: UX / Barriers',
    insight: 'Product Design Inputs',
    action: 'Prioritize highest selected notification and UX choices in roadmap.',
    status: 'neutral'
  });

  return insightLog;
};

export const getEmployeeAdoptionScore = (answers) => {
  if (!answers) return { score: 0, tag: 'N/A', style: 'text-gray', isBeta: false };

  let points = 0;

  const isHighFreq = answers[7] !== undefined && (answers[7] + 1) >= 4;
  const isHighHours = answers[6] !== undefined && answers[6] >= 2; // '45-55' and '55+'

  // Pain 
  if (isHighFreq) points += 20; // High freq
  if (answers[8] !== undefined && (answers[8] + 1) >= 4) points += 20; // High severity
  if (answers[11] === 0) points += 20; // Needed support

  // Solution Fit
  if (answers[12] !== undefined && (answers[12] + 1) >= 4) points += 25; // High likelihood
  if (answers[13] >= 3) points += 15; // High usage freq

  // Correlation Matrix: Overworked AND Stressed
  if (isHighHours && isHighFreq) {
    points += 20; // Massive adoption potential bump
  }

  // Enforce max score cap at 100
  points = Math.min(points, 100);

  if (points >= 80) return { score: points, tag: 'Early Adopter / Beta', style: 'text-green', isBeta: true };
  if (points >= 50) return { score: points, tag: 'Moderate Fit', style: 'text-gold', isBeta: false };
  return { score: points, tag: 'Low Engagement Risk', style: 'text-gray', isBeta: false };
};
