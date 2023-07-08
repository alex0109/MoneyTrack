import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import Title from '../../../../shared/ui/Title/Title';

import Exit from '../Exit/Exit';
import Theme from '../Theme/Theme';

import type { FC } from 'react';

const Settings: FC = () => {
  const colors = useTheme().colors;
  const { t } = useTranslation();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <Title>{t('settings.settingsTitle')}</Title>
      <Theme />
      <Exit />
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
