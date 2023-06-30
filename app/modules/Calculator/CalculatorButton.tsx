import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

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
      <Text style={{ color: colors.textColor, fontSize: 24 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CalculatorButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    margin: 8,
  },
});
