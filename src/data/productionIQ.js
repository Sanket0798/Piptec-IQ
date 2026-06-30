// Production IQ mock data — mirrors the smart production planner screen.

export const kpis = [
  { id: 'jobs', label: 'Active Jobs', value: '8', sub: 'in flow', icon: 'list', tone: 'ink' },
  { id: 'util', label: 'Avg Utilization', value: '74%', sub: 'fleet', icon: 'gauge', tone: 'ink' },
  { id: 'bottleneck', label: 'Bottleneck', value: 'Inspection', sub: '97% util', icon: 'alert', tone: 'danger' },
  { id: 'idle', label: 'Idle Leader', value: '5.2h', sub: 'Large Radius', icon: 'clock', tone: 'warn' },
  { id: 'atrisk', label: 'At-Risk Jobs', value: '2', sub: 'delay > 50%', icon: 'trendingDown', tone: 'danger' },
]

// Options for the what-if scenario simulator.
export const scenarioOrders = [
  { id: 'PT-24018', label: 'PT-24018 · Gulf Petro EPC', baselineRisk: 71, revenue: 1_240_000 },
  { id: 'PT-24023', label: 'PT-24023 · Orion Marine Energy', baselineRisk: 50, revenue: 520_000 },
  { id: 'PT-24009', label: 'PT-24009 · Gulf Petro EPC', baselineRisk: 39, revenue: 410_000 },
]

export const scenarioLines = [
  { id: 'line2', label: 'Induction Bending Line 2 · 71% util', effPerHour: 7.5 },
  { id: 'line1', label: 'Induction Bending Line 1 · 94% util', effPerHour: 4.0 },
  { id: 'line3', label: 'Cold Bending Line 3 · 62% util', effPerHour: 6.0 },
]

export const machineLines = [
  {
    id: 1,
    name: 'Induction Bending Line 1',
    type: 'Induction Bender (Hot)',
    oee: 88,
    health: 91,
    util: 94,
    idle: 0.4,
    status: 'running',
    flags: ['Capacity Risk'],
    note: 'Operating near capacity ceiling',
  },
  {
    id: 2,
    name: 'Induction Bending Line 2',
    type: 'Induction Bender (Hot)',
    oee: 79,
    health: 84,
    util: 71,
    idle: 1.8,
    status: 'running',
    flags: ['Abnormal Cycle Time'],
    note: 'Heating duration 12% above baseline',
  },
  {
    id: 3,
    name: 'Cold Bending Line 3',
    type: 'Cold Bender (CNC)',
    oee: 81,
    health: 89,
    util: 62,
    idle: 2.8,
    status: 'running',
    flags: [],
    note: 'Stable',
  },
  {
    id: 4,
    name: 'Large Radius Bender 4',
    type: 'Induction Bender (Hot)',
    oee: 58,
    health: 76,
    util: 34,
    idle: 5.2,
    status: 'idle',
    flags: ['Underutilized'],
    note: 'Underutilized — awaiting raw pipe for PT-24023',
  },
  {
    id: 5,
    name: 'Inspection & NDT Cell',
    type: 'Inspection / NDT',
    oee: 72,
    health: 68,
    util: 97,
    idle: 0.1,
    status: 'bottleneck',
    flags: ['Capacity Bottleneck'],
    note: 'Queue building · 6 jobs waiting for UT/MPI',
  },
  {
    id: 6,
    name: 'Heat Treatment Furnace',
    type: 'Furnace (PWHT)',
    oee: 85,
    health: 87,
    util: 83,
    idle: 1.1,
    status: 'running',
    flags: [],
    note: 'Stable',
  },
]

export const wipByStage = [
  { label: 'Preparation', value: 5, tone: 'brand' },
  { label: 'Bending', value: 6, tone: 'brand' },
  { label: 'Inspection', value: 6, tone: 'danger' },
  { label: 'Dispatch', value: 3, tone: 'brand' },
]

export const bottleneck = {
  title: 'Inspection is the bottleneck',
  body:
    'Primary bottleneck. 6 jobs queued for UT/MPI; adds ~1.4 days to flow. Recommended: add a second NDT shift or pull forward UT on near-complete orders.',
}

export const jobQueue = [
  { id: 'JOB-2402', order: 'PT-24018', customer: 'Gulf Petro EPC', stage: 'Bending', progress: 58, cycle: '14.2m', risk: 71, action: 'Expedite / resequence' },
  { id: 'JOB-2423', order: 'PT-24023', customer: 'Orion Marine Energy', stage: 'Preparation', progress: 13, cycle: '32.5m', cycleWarn: true, risk: 50, action: 'Monitor closely' },
  { id: 'JOB-2407', order: 'PT-24009', customer: 'Gulf Petro EPC', stage: 'Heating', progress: 41, cycle: '28.6m', cycleWarn: true, risk: 39, action: 'On plan' },
  { id: 'JOB-2421', order: 'PT-24021', customer: 'Northstar Petrochemical', stage: 'Preparation', progress: 22, cycle: '11m', risk: 32, action: 'On plan' },
  { id: 'JOB-2413', order: 'PT-24013', customer: 'Meridian Power Systems', stage: 'Cooling', progress: 67, cycle: '12.3m', risk: 22, action: 'On plan' },
  { id: 'JOB-2415', order: 'PT-24015', customer: 'Northstar Petrochemical', stage: 'Inspection', progress: 81, cycle: '6.8m', risk: 13, action: 'On plan' },
  { id: 'JOB-2411', order: 'PT-24011', customer: 'Meridian Power Systems', stage: 'Finishing', progress: 92, cycle: '9.1m', risk: 6, action: 'On plan' },
  { id: 'JOB-2418', order: 'PT-24007', customer: 'Cascade Infrastructure', stage: 'Dispatch', progress: 98, cycle: '18.4m', risk: 3, action: 'On plan' },
]
