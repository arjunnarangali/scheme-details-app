import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { safeValue } from '@/utils/formatters';

interface InfoRowProps {
  label: string;
  value: string | number | null | undefined;
}

const InfoRowComponent = ({ label, value }: InfoRowProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{safeValue(value)}</Text>
  </View>
);

export const InfoRow = memo(InfoRowComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  label: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  value: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
  },
});
