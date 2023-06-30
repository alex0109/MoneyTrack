import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { FC, ReactNode } from 'react';

interface ModalTitleProps {
  children: ReactNode;
}

const ModalTitle: FC<ModalTitleProps> = ({ children }) => {
  const colors = useTheme().colors;
  return (
    <View>
      <Text style={[styles.title, { color: colors.textColor }]}>{children}</Text>
    </View>
  );
};

export default ModalTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
