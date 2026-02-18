import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

const EmptyStateComponent = ({ title, subtitle }: EmptyStateProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

export const EmptyState = memo(EmptyStateComponent);

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
  },
});
