export const evaluateLead = (answers) => {
  if (!answers) return [];

  const insightLog = [];

  // Q1 & Q2: Identifier only (Lead identification)
  const isIdentified = !!(answers[1] || answers[2]);
  insightLog.push({
    id: 'q1-2',
    q: 'Q1-2: Identity',
    insight: 'Lead identification',
    action: isIdentified 
      ? 'Build qualified lead database → Invite to pilot' 
      : 'Anonymous lead. Tag in CRM.',
    status: isIdentified ? 'success' : 'neutral'
  });

  // Q3: Gender (Demographic Segmentation)
  const genders = ['Female', 'Male', 'Other'];
  const genderText = answers[3] !== undefined && answers[3] !== -1 ? genders[answers[3]] : 'Not specified';
  insightLog.push({
    id: 'q3',
    q: 'Q3: Gender',
    insight: 'Demographic segmentation',
    action: `Optional insight: ${genderText}`,
    status: 'neutral'
  });

  // Q4: Job Title (Decision Authority)
  const jobTitleIdx = answers[4];
  const isDecisionMaker = jobTitleIdx === 0 || jobTitleIdx === 1 || jobTitleIdx === 2; // CEO, MD, HR Manager
  insightLog.push({
    id: 'q4',
    q: 'Q4: Job Title',
    insight: 'Decision authority level',
    action: isDecisionMaker 
      ? 'Prioritize in sales pipeline; tailor messaging.' 
      : 'Secondary persona. Target as champion.',
    status: isDecisionMaker ? 'success' : 'warning'
  });

  // Q5: Company Size (Budget capacity)
  const sizeIdx = answers[5];
  const sizes = ['Less than 50', '50-200', '200-500', '500-2,000', 'More than 2,000'];
  const sizeText = sizeIdx !== undefined && sizeIdx !== -1 ? sizes[sizeIdx] : 'Unknown';
  insightLog.push({
    id: 'q5',
    q: 'Q5: Size',
    insight: 'Budget/Scale potential',
    action: `Adjust pricing tiers by size segment (${sizeText}).`,
    status: 'neutral'
  });

  // Q6: Industry
  const industryIdx = answers[6];
  const industries = ['Tech/IT', 'Finance', 'Healthcare', 'Manufacturing', 'Other'];
  const indText = industryIdx !== undefined && industryIdx !== -1 ? industries[industryIdx] : 'Unknown';
  insightLog.push({
    id: 'q6',
    q: 'Q6: Industry',
    insight: 'Industry context',
    action: `Focus GTM on ${indText} segment if pain is high.`,
    status: 'neutral'
  });

  // Q7: Years in Role
  insightLog.push({
    id: 'q7',
    q: 'Q7: Seniority',
    insight: 'Openness to innovation',
    action: 'Tailor message by seniority levels.',
    status: 'neutral'
  });

  // Q8: Severity (0-4 mapping to 1-5)
  const severityVal = answers[8] !== undefined ? answers[8] + 1 : 0; 
  const isHighSeverity = severityVal >= 4;
  insightLog.push({
    id: 'q8',
    q: `Q8: Severity (${severityVal}/5)`,
    insight: 'Core demand validation',
    action: isHighSeverity 
      ? 'Strong Demand: Lead with urgency & pain narrative.' 
      : 'Refine problem positioning. Low urgency.',
    status: isHighSeverity ? 'error' : 'warning' // 'error' is red -> implies HOT/critical
  });

  // Q9: Top Challenges
  insightLog.push({
    id: 'q9',
    q: 'Q9: Challenges',
    insight: 'Dominant pain points',
    action: 'Align product messaging to top 2-3 pains.',
    status: 'neutral'
  });

  // Q10 & Q11: Current Solution & Satisfaction
  const satVal = answers[11] !== undefined ? answers[11] + 1 : 0;
  const isDissatisfied = satVal <= 3;
  insightLog.push({
    id: 'q11',
    q: `Q11: Satisfaction (${satVal}/5)`,
    insight: 'Dissatisfaction gap',
    action: isDissatisfied 
      ? 'Emphasize switching benefits + superiority.' 
      : 'Position as a complementary addition.',
    status: isDissatisfied ? 'success' : 'warning'
  });

  // Q12: Acceptable Budget
  const budgetIdx = answers[12];
  const budgetViable = budgetIdx >= 2; // $100+
  insightLog.push({
    id: 'q12',
    q: 'Q12: Budget',
    insight: 'Economic feasibility',
    action: budgetViable 
      ? 'Confirm pricing. Economics viable (>=$100/yr).' 
      : 'Budget tight. Recommend low-touch SaaS tier.',
    status: budgetViable ? 'success' : 'warning'
  });

  // Q13: Decision Timeline
  const timelineIdx = answers[13];
  const timelineHot = timelineIdx <= 1; // 0-6 months
  insightLog.push({
    id: 'q13',
    q: 'Q13: Timeline',
    insight: 'Sales cycle length',
    action: timelineHot 
      ? 'Immediate sales targeting (Hot Segment).' 
      : 'Nurture long-term prospect pipeline.',
    status: timelineHot ? 'error' : 'neutral'
  });

  // Q14 & Q16: Value & Feature Map
  insightLog.push({
    id: 'q14-16',
    q: 'Q14, Q16: Value ROI',
    insight: 'Primary value driver + Feature sync',
    action: 'Center pitch around their top 1 ROI metric.',
    status: 'neutral'
  });

  // Q15: Pilot Approval
  const pilotIdx = answers[15];
  const pilotApproved = pilotIdx === 0; // Yes
  insightLog.push({
    id: 'q15',
    q: 'Q15: Pilot Intent',
    insight: 'Buying intent validation',
    action: pilotApproved 
      ? 'Launch structured paid pilot program immediately.' 
      : 'Strengthen risk-reduction strategy.',
    status: pilotApproved ? 'success' : 'warning'
  });

  // Q17: AI Adoption Confidence
  const aiConfVal = answers[17] !== undefined ? answers[17] + 1 : 0;
  const isTechReady = aiConfVal >= 4;
  insightLog.push({
    id: 'q17',
    q: `Q17: Tech Ready (${aiConfVal}/5)`,
    insight: 'Organizational AI readiness',
    action: isTechReady 
      ? 'Emphasize AI positioning.' 
      : 'Simplify onboarding + strong training design.',
    status: isTechReady ? 'success' : 'warning'
  });

  return insightLog;
};

export const getLeadScore = (answers) => {
  if (!answers) return { score: 0, tag: 'N/A', style: 'text-gray', isPilot: false };
  
  let points = 0;
  if ([0, 1, 2].includes(answers[4])) points += 20; // Decision Maker
  if (answers[8] !== undefined && (answers[8] + 1) >= 4) points += 30; // High severity
  if (answers[11] !== undefined && (answers[11] + 1) <= 3) points += 10; // Low satisfaction
  if (answers[12] >= 2) points += 20; // Viable budget
  if (answers[13] <= 1) points += 20; // Fast timeline
  
  const isPilot = answers[15] === 0; // Yes to pilot

  if (points >= 80) return { score: points, tag: 'Hot Lead · Immediate', style: 'text-red', isPilot };
  if (points >= 50) return { score: points, tag: 'Warm Lead · Nurture', style: 'text-gold', isPilot };
  return { score: points, tag: 'Cold Lead · Low Priority', style: 'text-gray', isPilot };
};
