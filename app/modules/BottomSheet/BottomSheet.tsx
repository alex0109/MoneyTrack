import { useTheme } from '@react-navigation/native';
import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
} from 'react-native-reanimated';

import type { ReactNode } from 'react';

interface BottomSheetProps {
  activeHeight: number;
  children: ReactNode;
  backgroundColor: string;
  backDropColor: string;
}

export type BottomSheetRefProps = {
  expand: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ activeHeight, children, backgroundColor, backDropColor }, ref) => {
    const { height } = useWindowDimensions();
    const newActiveHeight = height - activeHeight;
    const topAnimation = useSharedValue(height);
    const colors = useTheme().colors;

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(newActiveHeight, {
        damping: 100,
        stiffness: 400,
      });
    }, []);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(height, {
        damping: 100,
        stiffness: 400,
      });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close]
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });
    const backDropAnimation = useAnimatedStyle(() => {
      const opacity = interpolate(topAnimation.value, [height, newActiveHeight], [0, 0.5]);
      const display = opacity === 0 ? 'none' : 'flex';
      return {
        opacity,
        display,
      };
    });

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: { startY: number }) => {
        ctx.startY = topAnimation.value;
      },
      onActive: (event, ctx) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(ctx.startY + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      },
      onEnd: () => {
        if (topAnimation.value > newActiveHeight + 50) {
          topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      },
    });

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            close();
          }}>
          <Animated.View
            style={[styles.backDrop, backDropAnimation, { backgroundColor: backDropColor }]}
          />
        </TouchableWithoutFeedback>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              { height: activeHeight, backgroundColor: backgroundColor },
            ]}>
            <View style={styles.lineContainer}>
              <View style={[styles.line, { backgroundColor: colors.textColor }]} />
            </View>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 100,
    height: 4,
    borderRadius: 20,
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'none',
  },
});
