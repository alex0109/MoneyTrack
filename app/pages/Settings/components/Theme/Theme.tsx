import { useTheme } from '@react-navigation/native';
import RadioButtonRN from 'radio-buttons-react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { ThemeContext } from '../../../../shared/lib/providers/ThemeProvider';
import Title from '../../../../shared/ui/Title/Title';

import type { IRadioData } from '../../lib/types/interfaces';

const Theme = () => {
  const colors = useTheme().colors;
  const { themeIndex, changeTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const data: IRadioData[] = [
    {
      label: t('settings.themeDark'),
      value: 'dark',
      index: 1,
    },
    {
      label: t('settings.themeLight'),
      value: 'light',
      index: 2,
    },
    {
      label: t('settings.themeDefault'),
      value: 'default',
      index: 3,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <Title>{t('settings.themeTitle')}</Title>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <RadioButtonRN
          data={data}
          initial={themeIndex}
          boxStyle={{
            backgroundColor: colors.themeColor,
            width: '90%',
          }}
          textStyle={{ color: colors.textColor, fontFamily: 'NotoSans-Regular' }}
          activeColor={colors.info}
          selectedBtn={(e: IRadioData) => changeTheme(e.value, e.index)}
        />
      </View>
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
});
