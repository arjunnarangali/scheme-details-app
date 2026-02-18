import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';

interface BadgeProps {
  label: string;
  tone?: 'primary' | 'secondary';
}

const BadgeComponent = ({ label, tone = 'primary' }: BadgeProps) => (
  <View style={[styles.container, tone === 'primary' ? styles.primary : styles.secondary]}>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export const Badge = memo(BadgeComponent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  primary: {
    backgroundColor: Colors.primaryLight,
  },
  secondary: {
    backgroundColor: Colors.secondaryLight,
  },
  label: {
    ...Typography.captionBold,
    color: Colors.primaryDark,
  },
});
