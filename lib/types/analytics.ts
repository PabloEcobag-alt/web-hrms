export interface DashboardSummary {
  totalApplicants: number;
  totalScored: number;
  qualifiedCount: number;
  reviewCount: number;
  notQualifiedCount: number;
  qualifiedRate: number;
  reviewRate: number;
  notQualifiedRate: number;
  averageMatchScore: number;
  lastScoredAt: string | null;
}

export interface ScoreBucket {
  label: string;
  count: number;
  min: number;
  max: number;
}

export interface ScoreDistribution {
  buckets: ScoreBucket[];
}

export interface TopCandidate {
  applicantId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;
  matchScore: number;
  screeningResult: string;
  modelVersion: string;
  createdAt: string;
}

export interface PositionFit {
  position: string;
  totalApplicants: number;
  averageMatchScore: number;
  qualifiedCount: number;
  reviewCount: number;
  notQualifiedCount: number;
  fitIndication: string;
}

export interface Prediction {
  id: number;
  candidateId: string;
  matchScore: number;
  screeningResult: string;
  modelVersion: string;
  createdAt: string;
}

export interface ApplicationTrend {
  date: string;
  role: string;
  count: number;
}
