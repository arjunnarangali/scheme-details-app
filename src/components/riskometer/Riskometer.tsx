import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { RiskLevel } from '@/types/scheme';
import { getRiskLevelIndex } from '@/utils/calculations';

interface RiskometerProps {
  level: RiskLevel;
}

const segments = [
  { key: 'riskLow', color: Colors.riskLow, label: 'Low' },
  { key: 'riskLowModerate', color: Colors.riskLowModerate, label: 'Low to Moderate' },
  { key: 'riskModerate', color: Colors.riskModerate, label: 'Moderate' },
  { key: 'riskModeratelyHigh', color: Colors.riskModeratelyHigh, label: 'Moderately High' },
  { key: 'riskHigh', color: Colors.riskHigh, label: 'High' },
  { key: 'riskVeryHigh', color: Colors.riskVeryHigh, label: 'Very High' },
];

const RiskometerComponent = ({ level }: RiskometerProps) => {
  const { t } = useTranslation();
  const index = Math.max(0, getRiskLevelIndex(level));
  const activeSegment = segments[Math.min(index, segments.length - 1)];
  const riskKey = activeSegment?.key ?? 'riskLow';

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {segments.map((segment) => (
          <View key={segment.key} style={[styles.segment, { backgroundColor: segment.color }]} />
        ))}
      </View>
      <View style={styles.labels}>
        {segments.map((segment, segmentIndex) => (
          <Text
            key={segment.key}
            style={[styles.label, index === segmentIndex && styles.activeLabel]}
          >
            {t(segment.key)}
          </Text>
        ))}
      </View>
      <Text style={styles.notice}>{t('riskometerNotice')}</Text>
      <View style={[styles.riskBadge, { backgroundColor: activeSegment?.color ?? Colors.riskLow }]}>
        <Text style={styles.riskBadgeText}>{`${t(riskKey)} ${t('riskLabel')}`}</Text>
      </View>
    </View>
  );
};

export const Riskometer = memo(RiskometerComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    height: 12,
    overflow: 'hidden',
    width: '100%',
  },
  segment: {
    flex: 1,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    width: '100%',
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    flex: 1,
  },
  activeLabel: {
    color: Colors.textPrimary,
  },
  notice: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  riskBadge: {
    marginTop: Spacing.md,
    backgroundColor: Colors.riskVeryHigh,
    borderRadius: Spacing.radius.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  riskBadgeText: {
    ...Typography.bodyBold,
    color: Colors.white,
  },
});
