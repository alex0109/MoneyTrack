import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../../shared/lib/providers/AuthProvider';
import Title from '../../../shared/ui/Title/Title';

import type { FC } from 'react';

const Exit: FC = () => {
  const colors = useTheme().colors;
  const { logout, isGuest } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <View style={{ padding: 10, marginVertical: 10 }}>
      <Title>{t('settings.appTitle')}</Title>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        {isGuest ? (
          <TouchableOpacity
            onPress={() => logout()}
            style={{ borderRadius: 5, padding: 15, backgroundColor: `${colors.info}20` }}>
            <Text style={{ color: colors.info, fontSize: 20, fontFamily: 'NotoSans-Regular' }}>
              {t('settings.logInButton')}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => logout()}
            style={{ borderRadius: 5, padding: 15, backgroundColor: '#ED0F0F20' }}>
            <Text style={{ color: colors.red, fontSize: 20, fontFamily: 'NotoSans-Regular' }}>
              {t('settings.signOut')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Exit;
