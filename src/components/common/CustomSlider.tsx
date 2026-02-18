import React, { useCallback } from 'react';
import { StyleSheet, View, LayoutChangeEvent } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { Colors } from '@/constants/colors';

interface CustomSliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step: number;
  onValueChange: (value: number) => void;
  onInteractionChange?: (isInteracting: boolean) => void;
  style?: any;
}

const THUMB_SIZE = 20;

export const CustomSlider = ({
  value,
  minimumValue,
  maximumValue,
  step,
  onValueChange,
  onInteractionChange,
  style,
}: CustomSliderProps) => {
  const width = useSharedValue(0);
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const isInteracting = useSharedValue(false);

  // Initialize position based on value
  React.useEffect(() => {
    if (width.value > 0 && !isInteracting.value) {
      const percentage = (value - minimumValue) / (maximumValue - minimumValue);
      translateX.value = percentage * (width.value - THUMB_SIZE);
    }
  }, [value, minimumValue, maximumValue, width, isInteracting]);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    width.value = e.nativeEvent.layout.width;
    // Initial position set
    const percentage = (value - minimumValue) / (maximumValue - minimumValue);
    translateX.value = percentage * (e.nativeEvent.layout.width - THUMB_SIZE);
  }, [minimumValue, maximumValue, value]);

  const updateValue = (x: number) => {
    'worklet';
    if (width.value === 0) return;
    
    const maxTranslate = width.value - THUMB_SIZE;
    const clampedX = Math.min(Math.max(x, 0), maxTranslate);
    
    const percentage = clampedX / maxTranslate;
    const rawValue = minimumValue + percentage * (maximumValue - minimumValue);
    
    // Snap to step
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.min(Math.max(steppedValue, minimumValue), maximumValue);
    
    runOnJS(onValueChange)(clampedValue);
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isInteracting.value = true;
      startX.value = translateX.value;
      if (onInteractionChange) {
        runOnJS(onInteractionChange)(true);
      }
    })
    .onUpdate((e) => {
      const maxTranslate = width.value - THUMB_SIZE;
      let newX = startX.value + e.translationX;
      newX = Math.min(Math.max(newX, 0), maxTranslate);
      translateX.value = newX;
      updateValue(newX);
    })
    .onFinalize(() => {
      isInteracting.value = false;
      if (onInteractionChange) {
        runOnJS(onInteractionChange)(false);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const trackStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + THUMB_SIZE / 2,
    };
  });

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      <View style={styles.trackBackground} />
      <Animated.View style={[styles.trackActive, trackStyle]} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  trackBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.inputBg,
    borderRadius: 2,
  },
  trackActive: {
    position: 'absolute',
    left: 0,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
