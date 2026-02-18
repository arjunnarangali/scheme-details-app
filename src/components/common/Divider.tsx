import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';

interface DividerProps {
  vertical?: boolean;
}

const DividerComponent = ({ vertical }: DividerProps) => (
  <View style={[styles.base, vertical ? styles.vertical : styles.horizontal]} />
);

export const Divider = memo(DividerComponent);

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.divider,
  },
  horizontal: {
    height: 1,
    marginVertical: Spacing.md,
  },
  vertical: {
    width: 1,
    marginHorizontal: Spacing.sm,
  },
});
