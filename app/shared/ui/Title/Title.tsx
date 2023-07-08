import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

import type { FC, ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

const Title: FC<TitleProps> = ({ children }) => {
  const colors = useTheme().colors;

  return (
    <View style={[styles.container]}>
      <StatusBar />
      <Text
        style={[
          styles.title,
          {
            color: colors.textColor,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: '600',
  },
});
