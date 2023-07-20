import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import Title from '../../../../shared/ui/Title/Title';

import type { FC } from 'react';

const Exit: FC = () => {
  const colors = useTheme().colors;
  const authContext = useContext(AuthContext);

  return (
    <View style={{ padding: 10, marginVertical: 10 }}>
      <Title>App</Title>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => authContext.logout()}
          style={{ borderRadius: 5, padding: 15, backgroundColor: '#ED0F0F20' }}>
          <Text style={{ color: colors.red, fontSize: 20, fontWeight: '500' }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Exit;
