import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useTypedSelector } from '../../lib/hooks/useTypedSelector';

const Balance = () => {
  const colors = useTheme().colors;
  const count = useTypedSelector((state) => state.count.data);
  const { t } = useTranslation();
  const countsSum = count.map((count) => count.value).reduce((a, b) => a + b, 0);
  return (
    <View>
      <Text style={{ color: colors.textColor, fontSize: 20, fontWeight: 'bold' }}>
        {t('global.headerBalance')} {countsSum}
      </Text>
    </View>
  );
};

export default Balance;
