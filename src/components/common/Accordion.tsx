import { ReactNode, useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export const Accordion = ({ title, children, defaultExpanded = false }: AccordionProps) => {
  const [contentHeight, setContentHeight] = useState(0);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const height = useSharedValue(0);
  const rotation = useSharedValue(defaultExpanded ? 180 : 0);

  useEffect(() => {
    height.value = withTiming(expanded ? contentHeight : 0, { duration: 250 });
    rotation.value = withTiming(expanded ? 180 : 0, { duration: 250 });
  }, [contentHeight, expanded, height, rotation]);

  const onContentLayout = useCallback((event: LayoutChangeEvent) => {
    const nextHeight = event.nativeEvent.layout.height || 0;
    if (nextHeight !== contentHeight) {
      setContentHeight(nextHeight);
      if (expanded) {
        height.value = nextHeight;
      }
    }
  }, [contentHeight, expanded, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: expanded ? 1 : 0,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <Pressable onPress={() => setExpanded((prev) => !prev)} style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Animated.View style={iconStyle}>
            <ChevronDown color={Colors.textSecondary} size={24} />
          </Animated.View>
        </Pressable>
      </View>
      <View pointerEvents="none" style={styles.measure} onLayout={onContentLayout}>
        <View style={styles.content}>{children}</View>
      </View>
      <Animated.View style={[styles.contentWrapper, animatedStyle]}>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.lg,
    borderWidth: 1,
    borderColor: Colors.graphPillBorder,
    paddingHorizontal: Spacing.cardPadding,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.section,
    ...Spacing.shadow.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  headerBackground: {
    backgroundColor: Colors.graphTooltipBackground,
    marginHorizontal: -Spacing.cardPadding,
    marginTop: -Spacing.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.cardPadding,
    paddingVertical: Spacing.sm,
    borderTopLeftRadius: Spacing.radius.lg,
    borderTopRightRadius: Spacing.radius.lg,
  },
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  contentWrapper: {
    overflow: 'hidden',
  },
  content: {
    paddingTop: Spacing.md,
  },
  measure: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    right: 0,
  },
});
