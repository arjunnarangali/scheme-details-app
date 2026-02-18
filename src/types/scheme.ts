export type RiskLevel =
  | 'Low'
  | 'Low to Moderate'
  | 'Moderate'
  | 'Moderately High'
  | 'High'
  | 'Very High';

export interface AnalyticMetric {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface AllocationItem {
  category: string;
  percentage: number;
  color?: string;
}

export interface Holding {
  name: string;
  percentage: number;
  valueMn?: number;
  sector?: string;
}

export interface FundManagerProfile {
  id: string;
  name: string;
  experience: string;
  since: string;
  education?: string;
}

export interface SchemeDetails {
  name: string;
  amc: string;
  category: string;
  categoryTags?: string[];
  nav: number;
  navDate: string;
  navChange: number;
  navChangePercent: number;
  oneYearReturn?: number;
  oneYearBenchmarkReturn?: number;
  rating?: number;
  logoText?: string;
  riskLevel: RiskLevel;
  aum: string;
  expenseRatio: string;
  exitLoad: string;
  fundManager: string;
  fundManagers?: FundManagerProfile[];
  benchmark: string;
  inceptionDate: string;
  description?: string;
  analytics?: AnalyticMetric[];
  allocation?: AllocationItem[];
  holdings?: Holding[];
}
