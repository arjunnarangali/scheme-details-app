import { memo, useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Canvas, LinearGradient, Path, Skia, vec } from '@shopify/react-native-skia';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { EmptyState } from '@/components/common/EmptyState';
import { GraphCoordinate, GraphPeriod, NavDataPoint } from '@/types/graph';
import { useGraphData } from '@/hooks/useGraphData';
import { formatNav, formatShortDate } from '@/utils/formatters';

interface NavLineGraphProps {
  data: NavDataPoint[];
}

const periodOptions: { label: string; value: GraphPeriod }[] = [
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1Y', value: '1Y' },
  { label: '3Y', value: '3Y' },
];

const NavLineGraphComponent = ({ data }: NavLineGraphProps) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<GraphPeriod>('1M');
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const { points, sliced } = useGraphData(data, period, layout.width, layout.height);

  const { linePath, fillPath, indicatorLine, indicatorOuter, indicatorInner, latestPoint } = useMemo(() => {
    if (!points.length) {
      return {
        linePath: null,
        fillPath: null,
        indicatorLine: null,
        indicatorOuter: null,
        indicatorInner: null,
        latestPoint: null,
      };
    }
    const line = Skia.Path.Make();
    line.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach((point: GraphCoordinate) => line.lineTo(point.x, point.y));

    const fill = line.copy();
    fill.lineTo(points[points.length - 1].x, layout.height);
    fill.lineTo(points[0].x, layout.height);
    fill.close();
    const last = points[points.length - 1];
    const lineIndicator = Skia.Path.Make();
    lineIndicator.moveTo(last.x, last.y);
    lineIndicator.lineTo(last.x, layout.height);
    const outer = Skia.Path.Make();
    outer.addCircle(last.x, last.y, 6);
    const inner = Skia.Path.Make();
    inner.addCircle(last.x, last.y, 3);
    return {
      linePath: line,
      fillPath: fill,
      indicatorLine: lineIndicator,
      indicatorOuter: outer,
      indicatorInner: inner,
      latestPoint: last,
    };
  }, [layout.height, points]);

  const latestData = sliced[sliced.length - 1];
  const earliestData = sliced[0];
  const periodReturn =
    latestData && earliestData && earliestData.nav > 0
      ? ((latestData.nav - earliestData.nav) / earliestData.nav) * 100
      : 0;
  const periodReturnLabel = `${period} ${t('returnSuffix')}`;
  const returnPositive = periodReturn >= 0;

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== layout.width || height !== layout.height) {
      setLayout({ width, height });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>{t('returnLabel')}</Text>
          <View style={styles.returnRow}>
            <Text style={[styles.returnValue, returnPositive ? styles.positive : styles.negative]}>
              {periodReturn.toFixed(2)}%
            </Text>
            <Text style={styles.returnCaption}>{periodReturnLabel}</Text>
          </View>
        </View>
        {latestData ? (
          <View style={styles.navBadge}>
            <View style={styles.navBadgeRow}>
              <View style={styles.navDot} />
              <Text style={styles.navBadgeText}>
                {t('navTooltipLabel')}: ₹{formatNav(latestData.nav)}
              </Text>
            </View>
            <Text style={styles.navBadgeDate}>{formatShortDate(latestData.date)}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.graphCard}>
        <View style={styles.graphContainer} onLayout={onLayout}>
          {linePath && fillPath ? (
            <Canvas style={styles.canvas}>
              <Path path={fillPath} style="fill">
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, layout.height)}
                  colors={[Colors.graphGradientSoftStart, Colors.graphGradientSoftEnd]}
                />
              </Path>
              <Path path={linePath} style="stroke" strokeWidth={2} color={Colors.graphLineSoft} />
              {indicatorLine && indicatorOuter && indicatorInner && latestPoint ? (
                <>
                  <Path path={indicatorLine} style="stroke" strokeWidth={1} color={Colors.graphLineSoft} />
                  <Path path={indicatorOuter} style="fill" color={Colors.graphLineSoft} />
                  <Path path={indicatorInner} style="fill" color={Colors.white} />
                </>
              ) : null}
            </Canvas>
          ) : (
            <EmptyState title={t('graphEmpty')} />
          )}
        </View>
        <View style={styles.periodRow}>
          {periodOptions.map((option) => {
            const active = option.value === period;
            return (
              <Pressable
                key={option.value}
                onPress={() => setPeriod(option.value)}
                style={[styles.periodPill, active ? styles.periodPillActive : styles.periodPillInactive]}
              >
                <Text style={[styles.periodLabel, active ? styles.periodLabelActive : styles.periodLabelInactive]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export const NavLineGraph = memo(NavLineGraphComponent);

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  returnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  returnValue: {
    ...Typography.h3,
  },
  returnCaption: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  navBadge: {
    backgroundColor: Colors.graphTooltipBackground,
    borderRadius: Spacing.radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  navBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  navDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.graphLineSoft,
  },
  navBadgeText: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
  },
  navBadgeDate: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  graphCard: {
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
  },
  graphContainer: {
    height: 200,
  },
  canvas: {
    flex: 1,
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  periodPill: {
    borderRadius: 12,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  periodPillActive: {
    backgroundColor: Colors.graphLineSoft,
    borderColor: Colors.graphLineSoft,
  },
  periodPillInactive: {
    backgroundColor: Colors.surface,
    borderColor: Colors.graphPillBorder,
  },
  periodLabel: {
    ...Typography.bodyBold,
  },
  periodLabelActive: {
    color: Colors.white,
  },
  periodLabelInactive: {
    color: Colors.textPrimary,
  },
  positive: {
    color: Colors.schemeHeaderPositive,
  },
  negative: {
    color: Colors.negative,
  },
});
