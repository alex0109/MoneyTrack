import { useTheme } from '@react-navigation/native';
import { Canvas, Path, Skia, Text } from '@shopify/react-native-skia';
import React from 'react';

import { StyleSheet, View } from 'react-native';

import type { SkFont, SkiaMutableValue } from '@shopify/react-native-skia';

import type { FC } from 'react';

interface CircularProgressProps {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: SkiaMutableValue<number>;
  font: SkFont;
  targetPercentage: number;
}

const TargetDonut: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  font,
  targetPercentage,
}) => {
  const colors = useTheme().colors;

  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${
    Number.isNaN(Math.trunc(targetPercentage * 10000) / 100) ||
    !Number.isFinite(Math.trunc(targetPercentage * 10000) / 100)
      ? 0
      : Math.trunc(targetPercentage * 10000) / 100
  }%`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const width = font.getTextWidth(targetText);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color='green'
          style='stroke'
          strokeJoin='round'
          strokeWidth={strokeWidth}
          strokeCap='round'
          start={0}
          end={percentageComplete}
        />
        <Path
          path={path}
          color='green'
          style='stroke'
          strokeJoin='round'
          strokeWidth={strokeWidth}
          strokeCap='round'
          opacity={0.2}
        />
        <Text
          x={innerRadius - width / 2}
          y={radius + strokeWidth}
          text={targetText}
          font={font}
          opacity={0.4}
          color={colors.textColor}
        />
      </Canvas>
    </View>
  );
};

export default TargetDonut;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
