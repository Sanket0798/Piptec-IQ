// Command Center mock data — mirrors the PipeTec IQ executive home screen.

export const plantHealth = {
  score: 79,
  label: 'composite index',
  onTimeForecast: 50,
  fleetUtilization: 74,
  sustainability: 74,
}

export const aiBrief = {
  date: '30 Jun 2026',
  headline:
    'PT-24018 carries the highest revenue exposure this week at $1.24M.',
  body:
    'Plant health is strong at 79, but the Inspection (NDT) cell is the binding constraint at 97% utilization. PT-24018 carries the largest exposure at $1.24M.',
  chips: ['Full CEO summary', 'Orders at risk', 'Anomalies'],
}

export const kpis = [
  { id: 'wip', label: 'Orders WIP', value: '8', icon: 'box', tone: 'ink' },
  { id: 'ontime', label: 'On-Time %', value: '50%', icon: 'clock', tone: 'warn' },
  { id: 'fleet', label: 'Fleet Util.', value: '74%', icon: 'gauge', tone: 'ink' },
  { id: 'fpy', label: 'Quality FPY', value: '91.8%', icon: 'shield', tone: 'ok' },
  { id: 'sustain', label: 'Sustainability', value: '74', icon: 'leaf', tone: 'ok' },
  { id: 'anomalies', label: 'Anomalies', value: '5', icon: 'alert', tone: 'danger' },
]

export const revenueAtRisk = {
  exposure: 2_350_000,
  protected: 0,
  mitigated: 0,
}

// Predictive output forecast — 7-day history + 5-day AI projection w/ confidence band.
export const outputForecast = [
  { label: 'Mon', actual: 42, history: true },
  { label: 'Tue', actual: 44, history: true },
  { label: 'Wed', actual: 41, history: true },
  { label: 'Thu', actual: 45, history: true },
  { label: 'Fri', actual: 40, history: true },
  { label: 'Sat', actual: 38, history: true },
  { label: 'Sun', actual: 39, history: true, joint: true },
  { label: '+1d', forecast: 37, low: 32, high: 42 },
  { label: '+2d', forecast: 35, low: 29, high: 41 },
  { label: '+3d', forecast: 34, low: 27, high: 41 },
  { label: '+4d', forecast: 33, low: 25, high: 41 },
  { label: '+5d', forecast: 33, low: 24, high: 42 },
]

export const forecastSummary = {
  predictedOutput: 33,
  unit: 'bends / day',
  trend: -20,
  confidence: 68,
  outlook: 'Watch',
  note:
    'Output is projected to soften to ~33 bends/day over the next 5 days (-20% vs last week), at 68% model confidence. Capacity is sufficient to clear the current order book provided the inspection bottleneck is relieved.',
}

export const productionTrend = [
  { label: 'Mon', output: 41, plan: 44 },
  { label: 'Tue', output: 43, plan: 44 },
  { label: 'Wed', output: 45, plan: 44 },
  { label: 'Thu', output: 42, plan: 44 },
  { label: 'Fri', output: 40, plan: 44 },
  { label: 'Sat', output: 37, plan: 44 },
  { label: 'Sun', output: 34, plan: 44 },
]

export const defectsTrend = [
  { label: 'W19', defect: 3.1, rework: 1.8 },
  { label: 'W20', defect: 3.4, rework: 2.0 },
  { label: 'W21', defect: 2.9, rework: 1.6 },
  { label: 'W22', defect: 3.6, rework: 2.1 },
  { label: 'W23', defect: 3.2, rework: 1.9 },
  { label: 'W24', defect: 4.0, rework: 2.4 },
]

export const machineUtil = [
  { label: 'Line 1', value: 94, tone: 'brand' },
  { label: 'Line 2', value: 71, tone: 'brand' },
  { label: 'Line 3', value: 62, tone: 'brand' },
  { label: 'Line 4', value: 34, tone: 'muted' },
  { label: 'Inspection', value: 97, tone: 'danger' },
  { label: 'Furnace', value: 83, tone: 'brand' },
]

export const deliveryRisk = [
  { label: 'W23', low: 5, med: 2, high: 1 },
  { label: 'W24', low: 4, med: 3, high: 2 },
  { label: 'W25', low: 4, med: 2, high: 2 },
  { label: 'W26', low: 5, med: 3, high: 1 },
]

export const ordersAtRisk = [
  {
    id: 'PT-24018',
    customer: 'Gulf Petro EPC',
    spec: 'Hot & Ovality Sour Gas · Spool Bends',
    revenue: 1_240_000,
    risk: 71,
    status: 'Bending · 58% done',
    mitigation:
      'Run an additional 2h shift on Line 2 and pull forward UT inspection — predicted risk drops to ~33%.',
  },
  {
    id: 'PT-24023',
    customer: 'Orion Marine Energy',
    spec: 'Subsea Offshore · Riser Bends',
    revenue: 520_000,
    risk: 50,
    status: 'Preparation · 13% done',
    mitigation:
      'Expedite raw pipe release for Large Radius Bender 4 to protect the promised date.',
  },
]

export const aiRecommendations = [
  {
    id: 1,
    title: 'Relieve Inspection bottleneck',
    priority: 'critical',
    body:
      'Add a second NDT shift or pull forward UT on PT-24018 and PT-24018 to clear the 6-job queue at the inspection cell.',
    impact: 'Recovers ~1.4 days of flow; reduces dispatch risk on 2 orders',
    app: 'Production IQ',
  },
  {
    id: 2,
    title: 'Protect PT-24018 delivery',
    priority: 'high',
    body:
      'If Line 2 runs 2 additional hours today, PT-24018 delivery risk reduces from 71% to ~33%.',
    impact: 'Protects $1.24M revenue-at-risk',
    app: 'Production IQ',
  },
  {
    id: 3,
    title: 'Investigate energy anomaly on Line 2',
    priority: 'medium',
    body:
      'Line 2 is consuming 36% above baseline per bend. Inspect induction coil tuning and idle dwell.',
    impact: 'Potential 6–9% energy reduction; improves ESG score',
    app: 'Sustain IQ',
  },
  {
    id: 4,
    title: 'Close out NCR-0142 (CAPA)',
    priority: 'high',
    body:
      'Reduce induction temperature by 25–40°C, add internal mandrel support, re-qualify first bend before batch release.',
    impact: 'Unblocks document pack completion and dispatch readiness',
    app: 'Quality IQ',
  },
]

export const criticalAlerts = [
  {
    id: 1,
    title: 'Abnormal cycle on Induction Bending Line 2',
    detail: 'Heating duration 12% above baseline',
    source: 'Production',
    actions: ['Create work order', 'Notify maintenance'],
  },
  {
    id: 2,
    title: 'Quality deviation on PT-24009',
    detail: 'Dimensional / Thinning: temp deviation 22°C, ovality 3.1%',
    source: 'Quality',
    actions: ['Raise NCR', 'Schedule re-inspection', 'Notify QA lead'],
  },
  {
    id: 3,
    title: 'Quality deviation on PT-24023',
    detail: 'Dimensional / Ovality: temp deviation 31°C, ovality 4.4%',
    source: 'Quality',
    actions: ['Raise NCR', 'Schedule re-inspection', 'Notify QA lead'],
  },
  {
    id: 4,
    title: 'Energy spike on Line 2',
    detail: '36% above baseline energy per bend',
    source: 'Sustainability',
    actions: ['Create maintenance ticket', 'Notify energy team'],
  },
]

export const overviewStats = [
  { id: 'health', label: 'Plant Health Score', value: '79', sub: 'composite index', tone: 'ok' },
  { id: 'orders', label: 'Orders at Risk', value: '2', sub: 'this week', tone: 'warn' },
  { id: 'revenue', label: 'Revenue at Risk', value: '$2.35M', sub: 'exposure', tone: 'danger' },
  { id: 'fleet', label: 'Fleet Utilization', value: '74%', sub: '6 assets', tone: 'ink' },
]
