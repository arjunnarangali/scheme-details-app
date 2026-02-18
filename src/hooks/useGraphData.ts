import { useMemo } from 'react';
import { GraphCoordinate, GraphPeriod, NavDataPoint } from '@/types/graph';

const periodToCount: Record<GraphPeriod, number> = {
  '1M': 1,
  '3M': 3,
  '6M': 6,
  '1Y': 12,
  '3Y': 36,
  '5Y': 60,
};

export const useGraphData = (
  data: NavDataPoint[],
  period: GraphPeriod,
  width: number,
  height: number
) => {
  return useMemo(() => {
    if (!data.length || width <= 0 || height <= 0) {
      return { points: [] as GraphCoordinate[], min: 0, max: 0, sliced: [] as NavDataPoint[] };
    }

    const count = periodToCount[period];
    const target = Math.min(Math.max(count, 2), data.length);
    const sliced = data.slice(-target);
    const values = sliced.map((item) => item.nav);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const step = width / Math.max(sliced.length - 1, 1);

    const points = sliced.map((item, index) => ({
      x: index * step,
      y: height - ((item.nav - min) / range) * height,
    }));

    return { points, min, max, sliced };
  }, [data, period, width, height]);
};
