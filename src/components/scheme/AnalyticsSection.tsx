import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Activity, BarChart2, TrendingUp } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { SchemeDetails } from '@/types/scheme';

interface AnalyticsSectionProps {
  data: SchemeDetails['analytics'];
}

const getIcon = (id: string) => {
  switch (id) {
    case 'beta': return <Activity color={Colors.primary} size={20} />;
    case 'stdDev': return <BarChart2 color={Colors.primary} size={20} />;
    case 'sharpe': return <TrendingUp color={Colors.primary} size={20} />;
    default: return <Activity color={Colors.primary} size={20} />;
  }
};

const AnalyticsSectionComponent = ({ data }: AnalyticsSectionProps) => {
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {data.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.iconCircle}>
              {getIcon(item.id)}
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.metricTitle}>{item.label}: {item.value}</Text>
              <Text style={styles.metricDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export const AnalyticsSection = memo(AnalyticsSectionComponent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  list: {
    gap: Spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
  },
  metricTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
  },
  metricDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
