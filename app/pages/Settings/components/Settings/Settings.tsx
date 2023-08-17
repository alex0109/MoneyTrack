import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import BGImage from '../BGImage/BGImage';
import Cloud from '../Cloud/Cloud';
import Exit from '../Exit/Exit';
import Language from '../Language/Language';
import Theme from '../Theme/Theme';

import type { FC } from 'react';

const Settings: FC = () => {
  const colors = useTheme().colors;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <Cloud />
      <Theme />
      <BGImage />
      <Language />
      <Exit />
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
