import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import type { FC } from 'react';

interface CalculatorButtonProps {
  onPress: () => void;
  title: string;
  color?: string;
}

const CalculatorButton: FC<CalculatorButtonProps> = ({ onPress, title, color }) => {
  const colors = useTheme().colors;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: color }]}>
      <Text style={{ color: colors.textColor, fontSize: 20, fontFamily: 'NotoSans-Regular' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CalculatorButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').height / 15,
    margin: 2,
  },
});
