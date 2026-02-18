import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { SchemeDetails } from '@/types/scheme';

interface HoldingAnalysisProps {
  data: SchemeDetails['holdings'];
}

const HoldingAnalysisComponent = ({ data }: HoldingAnalysisProps) => {
  const { t } = useTranslation();

  if (!data || data.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>{t('securityName')}</Text>
          </View>
          <View style={styles.headerDivider} />
          <View style={styles.headerRight}>
            <Text style={[styles.headerText, styles.valueCol]}>{t('valueMn')}</Text>
            <Text style={[styles.headerText, styles.percentCol]}>{t('holdingPercent')}</Text>
          </View>
        </View>

        {data.map((item, index) => (
          <View key={index} style={[styles.row, index < data.length - 1 && styles.borderBottom]}>
            <View style={styles.leftColumn}>
              <Text style={styles.companyName}>{item.name}</Text>
            </View>
            <View style={styles.rowDivider} />
            <View style={styles.rightColumn}>
              <Text style={[styles.valueText, styles.valueCol]}>
                {item.valueMn != null ? `₹${item.valueMn}` : '--'}
              </Text>
              <Text style={[styles.percentage, styles.percentCol]}>{`${item.percentage}`}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>{t('viewAllHoldings')}</Text>
        <ChevronDown color={Colors.primary} size={16} />
      </View>
    </View>
  );
};

export const HoldingAnalysis = memo(HoldingAnalysisComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.lg,
    borderWidth: 1,
    borderColor: Colors.graphPillBorder,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.graphTooltipBackground,
  },
  headerLeft: {
    flex: 1.6,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  headerRight: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flex: 1,
  },
  headerDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.divider,
  },
  headerText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  leftColumn: {
    flex: 1.6,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  rowDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.divider,
  },
  rightColumn: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flex: 1,
  },
  companyName: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  valueText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  percentage: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  valueCol: {
    flex: 1,
    textAlign: 'left',
  },
  percentCol: {
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
  },
  footerText: {
    ...Typography.body,
    color: Colors.primary,
  },
});
