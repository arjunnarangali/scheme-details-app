import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';

interface ToggleOption<T extends string> {
  label: string;
  value: T;
}

interface ToggleSwitchProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const ToggleSwitchComponent = <T extends string>({ options, value, onChange }: ToggleSwitchProps<T>) => (
  <View style={styles.container}>
    {options.map((option) => {
      const active = option.value === value;
      return (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          style={[styles.option, active ? styles.activeOption : styles.inactiveOption]}
        >
          <Text style={[styles.label, active ? styles.activeLabel : styles.inactiveLabel]}>
            {option.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

export const ToggleSwitch = memo(ToggleSwitchComponent) as typeof ToggleSwitchComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.toggleInactive,
    borderRadius: 999,
    padding: 4,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: 999,
  },
  activeOption: {
    backgroundColor: Colors.toggleActive,
  },
  inactiveOption: {
    backgroundColor: 'transparent',
  },
  label: {
    ...Typography.bodyBold,
  },
  activeLabel: {
    color: Colors.toggleActiveText,
  },
  inactiveLabel: {
    color: Colors.toggleInactiveText,
  },
});
