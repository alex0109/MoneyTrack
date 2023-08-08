import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTypedSelector } from '../../lib/hooks/useTypedSelector';

const Balance = () => {
  const colors = useTheme().colors;
  const count = useTypedSelector((state) => state.count.data);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const countsSum = count.map((count) => count.value).reduce((a, b) => a + b, 0);

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('AccountsTab', {})}>
        <Text
          style={{
            color: colors.textColor,
            fontSize: 20,
            fontFamily: 'NotoSans-Regular',
          }}>
          {t('global.headerBalance')} {countsSum}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Balance;
