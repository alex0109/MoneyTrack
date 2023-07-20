import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { persistor } from '../../../../shared/lib/store/store';
import Exit from '../Exit/Exit';
import Language from '../Language/Language';
import Theme from '../Theme/Theme';

import type { FC } from 'react';

const Settings: FC = () => {
  const colors = useTheme().colors;
  const { t } = useTranslation();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <Button title='Wipe data' onPress={() => persistor.purge()} />
      <Theme />
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
