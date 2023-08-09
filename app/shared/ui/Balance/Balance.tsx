import NetInfo from '@react-native-community/netinfo';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTypedSelector } from '../../lib/hooks/useTypedSelector';

const Balance = () => {
  const { isConnected } = NetInfo.useNetInfo();
  const colors = useTheme().colors;
  const count = useTypedSelector((state) => state.count.data);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const countsSum = count.map((count) => count.value).reduce((a, b) => a + b, 0);

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('AccountsTab', {})}>
        {isConnected ? (
          <Text style={[styles.balance, { color: colors.textColor }]}>
            {t('global.headerBalance')} {countsSum}
          </Text>
        ) : (
          <Text style={[styles.balance, { color: colors.textColor }]}>
            {t('global.noInternet')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  balance: {
    fontSize: 20,
    fontFamily: 'NotoSans-Regular',
  },
});
