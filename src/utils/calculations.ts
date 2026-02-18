import { Config } from '@/constants/config';

export type CalculatorMode = 'Monthly SIP' | 'One Time';

export const calculateReturns = (amount: number, years: number, mode: CalculatorMode) => {
  const r = Config.DEFAULT_RETURN_PERCENTAGE / 12 / 100;
  const n = years * 12;
  let invested = 0;
  let value = 0;

  if (mode === 'Monthly SIP') {
    invested = amount * n;
    value = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  } else {
    invested = amount;
    value = amount * Math.pow(1 + r, n);
  }

  return {
    totalInvested: Math.round(invested),
    estimatedValue: Math.round(value),
    totalReturns: Math.round(value - invested),
  };
};

export const getRiskLevelIndex = (level: string) =>
  ['Low', 'Low to Moderate', 'Moderate', 'Moderately High', 'High', 'Very High'].indexOf(level);
