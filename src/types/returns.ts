export type ReturnMode = 'SIP' | 'Lumpsum';

export interface ReturnEntry {
  period: string;
  invested: number;
  current: number;
  returns: number;
}

export interface CalculatorResult {
  totalInvested: number;
  estimatedValue: number;
  totalReturns: number;
}
