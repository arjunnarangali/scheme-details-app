export type GraphPeriod = '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';

export interface NavDataPoint {
  date: string;
  nav: number;
}

export interface GraphCoordinate {
  x: number;
  y: number;
}
