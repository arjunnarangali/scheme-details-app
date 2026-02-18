import { memo } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { Badge } from '@/components/common/Badge';

interface SimilarFund {
  id: string;
  name: string;
  category: string;
  return3Y: string;
  rating: number;
}

interface SimilarFundsProps {
  data: SimilarFund[];
}

const SimilarFundsComponent = ({ data }: SimilarFundsProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.viewAll}>{t('viewAll')}</Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {data.map((fund) => (
          <View key={fund.id} style={styles.card}>
            <View style={styles.logoPlaceholder} />
            <Text style={styles.name} numberOfLines={2}>{fund.name}</Text>
            <Text style={styles.category}>{fund.category}</Text>
            <View style={styles.footer}>
               <Text style={styles.returnLabel}>3Y Return</Text>
               <Text style={styles.returnValue}>{fund.return3Y}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export const SimilarFunds = memo(SimilarFundsComponent);

const styles = StyleSheet.create({
  container: {
    // Styles removed
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align View All to right
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
  },
  // title removed
  viewAll: {
    ...Typography.button,
    color: Colors.primary,
    fontSize: 12,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingBottom: Spacing.sm,
  },
  card: {
    width: 160,
    backgroundColor: Colors.surface, // Should be light red/pink per Figma "Nippon" card background?
    // Actually Figma shows different bg colors for cards potentially.
    // I'll stick to surface but maybe add a border or shadow.
    borderRadius: Spacing.radius.lg,
    padding: Spacing.md,
    marginRight: Spacing.md,
    ...Spacing.shadow.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoPlaceholder: {
    width: 32,
    height: 32,
    backgroundColor: '#FFEBEB', // Light red placeholder
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
    marginBottom: 4,
    height: 40,
  },
  category: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  returnLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  returnValue: {
    ...Typography.captionBold,
    color: Colors.positive,
  },
});