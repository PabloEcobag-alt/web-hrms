// Mock recruitment-analytics data used as a fallback when the API is unavailable.

import type {
  DashboardSummary,
  ScoreDistribution,
  TopCandidate,
  PositionFit,
  ApplicationTrend,
} from "@/lib/types/analytics";

export const MOCK_ANALYTICS_SUMMARY: DashboardSummary = {
  totalApplicants: 128,
  totalScored: 112,
  qualifiedCount: 64,
  reviewCount: 33,
  notQualifiedCount: 15,
  qualifiedRate: 0.57,
  reviewRate: 0.29,
  notQualifiedRate: 0.14,
  averageMatchScore: 78.4,
  lastScoredAt: new Date().toISOString(),
};

export const MOCK_SCORE_DISTRIBUTION: ScoreDistribution = {
  buckets: [
    { label: "0-20", count: 4, min: 0, max: 20 },
    { label: "21-40", count: 9, min: 21, max: 40 },
    { label: "41-60", count: 21, min: 41, max: 60 },
    { label: "61-80", count: 44, min: 61, max: 80 },
    { label: "81-100", count: 34, min: 81, max: 100 },
  ],
};

export const MOCK_TOP_CANDIDATES: TopCandidate[] = [
  { applicantId: 101, firstName: "Juan", lastName: "Dela Cruz", email: "juan.delacruz@example.com", phoneNumber: "09171234567", position: "Merchandiser Oncall", matchScore: 95, screeningResult: "Qualified", modelVersion: "v1.2", createdAt: "2026-08-25T09:00:00.000Z" },
  { applicantId: 103, firstName: "Antonio", lastName: "Garcia", email: "antonio.garcia@example.com", phoneNumber: "09205551234", position: "Commissary Helper", matchScore: 92, screeningResult: "Qualified", modelVersion: "v1.2", createdAt: "2026-08-24T09:00:00.000Z" },
  { applicantId: 102, firstName: "Maria", lastName: "Reyes", email: "maria.reyes@example.com", phoneNumber: "09189876543", position: "Store Attendant", matchScore: 88, screeningResult: "Qualified", modelVersion: "v1.2", createdAt: "2026-08-23T09:00:00.000Z" },
  { applicantId: 105, firstName: "Carlo", lastName: "Aquino", email: "carlo.aquino@example.com", phoneNumber: "09193332211", position: "On Call", matchScore: 84, screeningResult: "Review", modelVersion: "v1.2", createdAt: "2026-08-22T09:00:00.000Z" },
  { applicantId: 104, firstName: "Sofia", lastName: "Mendoza", email: "sofia.mendoza@example.com", phoneNumber: "09224448888", position: "Intern/Summer Job", matchScore: 81, screeningResult: "Review", modelVersion: "v1.2", createdAt: "2026-08-21T09:00:00.000Z" },
];

export const MOCK_POSITION_FIT: PositionFit[] = [
  { position: "Store Attendant", totalApplicants: 42, averageMatchScore: 79.2, qualifiedCount: 24, reviewCount: 12, notQualifiedCount: 6, fitIndication: "Strong" },
  { position: "Commissary Helper", totalApplicants: 30, averageMatchScore: 76.5, qualifiedCount: 16, reviewCount: 9, notQualifiedCount: 5, fitIndication: "Moderate" },
  { position: "Merchandiser Oncall", totalApplicants: 28, averageMatchScore: 81.0, qualifiedCount: 18, reviewCount: 7, notQualifiedCount: 3, fitIndication: "Strong" },
  { position: "On Call", totalApplicants: 18, averageMatchScore: 72.3, qualifiedCount: 6, reviewCount: 8, notQualifiedCount: 4, fitIndication: "Moderate" },
  { position: "Intern/Summer Job", totalApplicants: 10, averageMatchScore: 68.9, qualifiedCount: 3, reviewCount: 5, notQualifiedCount: 2, fitIndication: "Weak" },
];

export const MOCK_APPLICATION_TRENDS: ApplicationTrend[] = [
  { date: "2026-08-19", role: "Store Attendant", count: 6 },
  { date: "2026-08-20", role: "Store Attendant", count: 8 },
  { date: "2026-08-21", role: "Commissary Helper", count: 5 },
  { date: "2026-08-22", role: "Merchandiser Oncall", count: 7 },
  { date: "2026-08-23", role: "Store Attendant", count: 9 },
  { date: "2026-08-24", role: "On Call", count: 4 },
  { date: "2026-08-25", role: "Merchandiser Oncall", count: 10 },
];
