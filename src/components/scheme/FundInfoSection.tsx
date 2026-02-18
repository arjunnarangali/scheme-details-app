import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { InfoRow } from '@/components/common/InfoRow';
import { SchemeDetails } from '@/types/scheme';

interface FundInfoSectionProps {
  data: SchemeDetails;
}

const FundInfoSectionComponent = ({ data }: FundInfoSectionProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <InfoRow label={t('amcLabel')} value={data.amc} />
      <InfoRow label={t('fundManagerLabel')} value={data.fundManager} />
      <InfoRow label={t('aumLabel')} value={data.aum} />
      <InfoRow label={t('expenseRatioLabel')} value={data.expenseRatio} />
      <InfoRow label={t('exitLoadLabel')} value={data.exitLoad} />
      <InfoRow label={t('benchmarkLabel')} value={data.benchmark} />
      <InfoRow label={t('inceptionDateLabel')} value={data.inceptionDate} />
    </View>
  );
};

export const FundInfoSection = memo(FundInfoSectionComponent);

const styles = StyleSheet.create({
  container: {
    // Styles removed
  },
  // title removed
});
