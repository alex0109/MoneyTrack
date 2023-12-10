import { useTheme } from '@react-navigation/native';
import RadioButtonRN from 'radio-buttons-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { saveString } from '../../../shared/lib/utils/asyncMethods';
import Title from '../../../shared/ui/Title/Title';

const Language = () => {
  const colors = useTheme().colors;
  const { i18n, t } = useTranslation();

  const changeCurrentLanguage = async (language: string) => {
    try {
      await saveString('currentLanguage', language);
      await i18n.changeLanguage(language);
    } catch (error) {
      return;
    }
  };

  const data = [
    {
      label: t('settings.languageUkr'),
      value: 'uk',
    },
    {
      label: t('settings.languageEng'),
      value: 'en',
    },
  ];

  return (
    <View style={[styles.container]}>
      <Title>{t('settings.languageTitle')}</Title>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <RadioButtonRN
          data={data}
          initial={i18n.language == 'en' ? 2 : 1}
          boxStyle={{
            backgroundColor: colors.themeColor,
            width: '90%',
          }}
          textStyle={{ color: colors.textColor, fontFamily: 'NotoSans-Regular' }}
          activeColor={colors.info}
          selectedBtn={(e: string) => changeCurrentLanguage(e.value)}
          animationTypes={['pulse']}
        />
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
