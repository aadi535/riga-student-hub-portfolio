export const INITIAL_CLAIMS = [
  {
    id: 'CLM-9821',
    studentName: 'Rahul Sharma',
    university: 'RTU (Riga Technical Univ)',
    email: 'rahul.s@rtu.student.lv',
    dealId: 'revolut',
    dealTitle: 'Revolut Banking',
    cashbackAmount: 20,
    status: 'Paid',
    currentStep: 4, // 1 to 4
    revtagOrIban: '@rahul_rtu',
    proofUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&auto=format&fit=crop',
    submittedAt: '2026-09-02T14:30:00Z',
    paidAt: '2026-09-03T09:15:00Z',
    txHash: 'REV-98214-EUR'
  },
  {
    id: 'CLM-9844',
    studentName: 'Mateo Rossi',
    university: 'RSU (Stradiņš Univ)',
    email: 'm.rossi@rsu.edu.lv',
    dealId: 'bolt-courier',
    dealTitle: 'Bolt Food Courier',
    cashbackAmount: 100,
    status: 'Proof Submitted',
    currentStep: 3,
    revtagOrIban: '@mateo_rossi',
    proofUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop',
    submittedAt: '2026-09-03T18:20:00Z',
    paidAt: null,
    txHash: null
  },
  {
    id: 'CLM-9850',
    studentName: 'Ananya Patel',
    university: 'LU (Univ of Latvia)',
    email: 'ananya.p@lu.lv',
    dealId: 'wise',
    dealTitle: 'Wise Multi-Currency',
    cashbackAmount: 15,
    status: 'In Progress',
    currentStep: 2,
    revtagOrIban: '@ananyap_wise',
    proofUrl: null,
    submittedAt: '2026-09-03T11:00:00Z',
    paidAt: null,
    txHash: null
  }
];
