import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  getRelativeCoords,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import { deleteCategory } from '../../lib/store/categorySlice';

import type { FC } from 'react';
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

type ContextType = {
  translateX: number;
  translateY: number;
};

interface CategoryCircleProps {
  categoryIndex: string;
  color: string;
  icon: string;
  amount: number;
  x: number;
  y: number;
  // eslint-disable-next-line no-unused-vars
  handleOpenCategory: (arg0: string) => void;
  // eslint-disable-next-line no-unused-vars
  setIsCategoryDelete: (arg0: boolean) => void;
}

const CategoryCircle: FC<CategoryCircleProps> = ({
  categoryIndex,
  color,
  icon,
  amount,
  x,
  y,
  handleOpenCategory,
  setIsCategoryDelete,
}) => {
  const colors = useTheme().colors;
  const pressed = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const categoryRef = useAnimatedRef<Animated.View>();

  const authContext = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const onEndMovingDelete = () => {
    dispatch(deleteCategory({ uid: authContext.uid, categoryID: categoryIndex }));
  };

  const onEndMoving = () => {
    setIsCategoryDelete(false);
  };

  const onActiveMoving = () => {
    setIsCategoryDelete(true);
  };

  const eventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.translateX;
      translateY.value = event.translationY + ctx.translateY;
      runOnJS(onActiveMoving)();
    },
    onEnd: (event) => {
      pressed.value = false;
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(onEndMoving)();

      const xRelCoord = getRelativeCoords(categoryRef, event.absoluteX, event.absoluteY).x;
      const yRelCoord = getRelativeCoords(categoryRef, event.absoluteX, event.absoluteY).y;

      if (xRelCoord > 150 && xRelCoord < 270 && yRelCoord > 390 && yRelCoord < 500) {
        runOnJS(onEndMovingDelete)();
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View
        ref={categoryRef}
        style={[styles.categoryItem, { left: x, top: y, backgroundColor: color }, rStyle]}>
        <TouchableOpacity
          onPress={() => handleOpenCategory(categoryIndex)}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name={icon} size={30} color={'white'} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            top: 45,
            width: '100%',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'NotoSans-Bold',
              color: colors.textColor,
            }}>
            {amount}
          </Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

CategoryCircle.displayName = 'CategoryCircle';

export default CategoryCircle;

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 45,
    width: 45,
    borderRadius: 40,
  },
});
