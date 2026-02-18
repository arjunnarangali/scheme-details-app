import { memo, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { AllocationItem } from '@/types/scheme';

interface AllocationAnalysisProps {
  data?: AllocationItem[];
  sectorData?: AllocationItem[];
}

const CHART_SIZE = 140;
const STROKE_WIDTH = 18;
const CENTER = CHART_SIZE / 2;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;

const AllocationAnalysisComponent = ({ data, sectorData }: AllocationAnalysisProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'asset' | 'sector'>('asset');
  const activeData = activeTab === 'asset' ? data : sectorData ?? data;

  const paths = useMemo(() => {
    if (!activeData) return [];
    
    const result: { path: any; color: string }[] = [];
    let startAngle = -90; // Start from top

    activeData.forEach((item) => {
      const sweepAngle = (item.percentage / 100) * 360;
      const path = Skia.Path.Make();
      path.addArc({ x: STROKE_WIDTH / 2, y: STROKE_WIDTH / 2, width: 2 * RADIUS, height: 2 * RADIUS }, startAngle, sweepAngle);
      
      result.push({
        path,
        color: item.color || Colors.primary,
      });
      
      startAngle += sweepAngle;
    });

    return result;
  }, [activeData]);

  if (!activeData) return null;

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setActiveTab('asset')}
          style={[styles.tab, activeTab === 'asset' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'asset' && styles.tabActiveText]}>
            {t('assetClass')}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('sector')}
          style={[styles.tab, activeTab === 'sector' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'sector' && styles.tabActiveText]}>
            {t('sector')}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.chartWrapper}>
          <Canvas style={styles.canvas}>
            {paths.map((p, i) => (
              <Path
                key={i}
                path={p.path}
                color={p.color}
                style="stroke"
                strokeWidth={STROKE_WIDTH}
                strokeCap="butt"
              />
            ))}
          </Canvas>
        </View>

        <View style={styles.legend}>
          {activeData.map((item) => (
            <View key={item.category} style={styles.legendItem}>
              <View style={[styles.legendIndicator, { backgroundColor: item.color || Colors.primary }]} />
              <Text style={styles.legendValue}>{`${item.percentage}%`}</Text>
              <Text style={styles.legendLabel} numberOfLines={1}>
                {item.category}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export const AllocationAnalysis = memo(AllocationAnalysisComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  tabActiveText: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  chartWrapper: {
    width: CHART_SIZE,
    height: CHART_SIZE,
    marginRight: Spacing.lg,
  },
  canvas: {
    flex: 1,
  },
  legend: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  legendIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
    flex: 1,
    minWidth: 0,
    textAlign: 'left',
  },
  legendValue: {
    ...Typography.body,
    color: Colors.textSecondary,
    width: 56,
  },
});
