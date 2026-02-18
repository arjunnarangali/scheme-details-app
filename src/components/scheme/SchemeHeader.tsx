import { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Bookmark, Sparkles, Star } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { SchemeDetails } from '@/types/scheme';
import { formatDate } from '@/utils/formatters';

interface SchemeHeaderProps {
  data: SchemeDetails;
}

const SchemeHeaderComponent = ({ data }: SchemeHeaderProps) => {
  const { t } = useTranslation();
  const changePositive = data.navChange >= 0;
  const tags = useMemo(() => {
    if (data.categoryTags?.length) {
      return data.categoryTags;
    }
    return data.category
      .split('•')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [data.category, data.categoryTags]);
  const navValue = Number.isFinite(data.nav) ? data.nav.toFixed(4) : '0.0000';
  const navChangeValue = Number.isFinite(data.navChange) ? data.navChange.toFixed(2) : '0.00';
  const navChangePercent = Number.isFinite(data.navChangePercent) ? data.navChangePercent.toFixed(2) : '0.00';
  const oneYearReturn = Number.isFinite(data.oneYearReturn ?? NaN)
    ? (data.oneYearReturn ?? 0).toFixed(2)
    : '--';
  const oneYearBenchmarkReturn = Number.isFinite(data.oneYearBenchmarkReturn ?? NaN)
    ? (data.oneYearBenchmarkReturn ?? 0).toFixed(2)
    : '--';
  const oneYearReturnDisplay = oneYearReturn === '--' ? '--' : `${oneYearReturn}%`;
  const oneYearBenchmarkReturnDisplay =
    oneYearBenchmarkReturn === '--' ? '--' : `${oneYearBenchmarkReturn}%`;
  const ratingValue = Math.max(0, Math.min(5, data.rating ?? 0));
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.chipRow}>
          {tags.map((tag) => (
            <View key={tag} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.bookmark}>
          <Bookmark color={Colors.schemeHeaderBookmark} size={20} />
        </View>
      </View>

      <View style={styles.titleRow}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText} numberOfLines={1}>
            {data.logoText ?? ''}
          </Text>
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.resilientBadge}>
            <Sparkles color={Colors.white} size={14} />
            <Text style={styles.resilientText}>{t('resilient')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.navAumRow}>
        <View style={styles.navColumn}>
          <Text style={styles.navLabel}>{`${t('nav')} : ${formatDate(data.navDate)}`}</Text>
          <View style={styles.navValueRow}>
            <Text style={styles.navValue}>₹{navValue}</Text>
            <View style={styles.navChangeRow}>
              <Text style={[styles.navChangeArrow, changePositive ? styles.positive : styles.negative]}>
                ▲
              </Text>
              <Text style={[styles.navChangeValue, changePositive ? styles.positive : styles.negative]}>
                ₹{navChangeValue} ({changePositive ? '+' : ''}
                {navChangePercent}%)
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.aumColumn}>
          <Text style={styles.aumLabel}>{t('aumLabel')}</Text>
          <Text style={styles.aumValue}>{data.aum}</Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>{t('oneYearReturn')}</Text>
          <Text style={styles.infoValue}>{oneYearReturnDisplay}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>{t('benchmarkIndex')}</Text>
          <Text style={styles.infoValueStrong} numberOfLines={2}>
            {data.benchmark}
          </Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>{t('oneYearBenchmarkReturn')}</Text>
          <Text style={styles.infoValue}>{oneYearBenchmarkReturnDisplay}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>{t('valueResearchRating')}</Text>
          <View style={styles.starRow}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={`star-${index}`}
                size={16}
                color={Colors.schemeHeaderStar}
                fill={index < ratingValue ? Colors.schemeHeaderStar : 'transparent'}
              />
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.description}>“{data.description ?? ''}”</Text>
    </View>
  );
};

export const SchemeHeader = memo(SchemeHeaderComponent);

const logoSize = Spacing.xxl + Spacing.md;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.schemeHeaderCard,
    padding: Spacing.cardPadding,
    borderRadius: Spacing.radius.xl,
    marginBottom: Spacing.section,
    ...Spacing.shadow.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
    flex: 1,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.schemeHeaderChipBorder,
    backgroundColor: Colors.schemeHeaderChipBackground,
  },
  chipText: {
    ...Typography.captionBold,
    color: Colors.schemeHeaderChipText,
  },
  bookmark: {
    marginLeft: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.lg,
  },
  logoCircle: {
    width: logoSize,
    height: logoSize,
    borderRadius: logoSize / 2,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.schemeHeaderChipBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...Typography.captionBold,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: Typography.captionBold.lineHeight,
  },
  titleBlock: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  name: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  resilientBadge: {
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: Colors.schemeHeaderBadgeBlue,
    borderRadius: 999,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  resilientText: {
    ...Typography.badge,
    color: Colors.white,
    textTransform: 'uppercase',
  },
  navLabel: {
    ...Typography.caption,
    color: Colors.schemeHeaderMuted,
  },
  navAumRow: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: Spacing.md,
  },
  navColumn: {
    flex: 1,
  },
  navValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  navValue: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  navChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  navChangeArrow: {
    ...Typography.captionBold,
  },
  navChangeValue: {
    ...Typography.bodyBold,
  },
  aumColumn: {
    alignItems: 'flex-end',
  },
  aumLabel: {
    ...Typography.caption,
    color: Colors.schemeHeaderMuted,
  },
  aumValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  infoGrid: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.lg,
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
  },
  infoValue: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  infoValueStrong: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  starRow: {
    marginTop: Spacing.xs,
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  description: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    lineHeight: Typography.body.lineHeight,
  },
  positive: {
    color: Colors.schemeHeaderPositive,
  },
  negative: {
    color: Colors.negative,
  },
});
