import { useNavigation, useTheme } from '@react-navigation/native';

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { FC } from 'react';
import { RootStackParamList } from '../../lib/navigation/StackNavigator';

const SettingsIcon: FC = () => {
  const colors = useTheme().colors;
  const navigation = useNavigation<RootStackParamList>();

  const handleNavigate = () => {
    navigation.navigate('SettingsTab');
  };

  return (
    <View
      style={{
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={handleNavigate}>
        <Ionicons name='settings-outline' size={30} color={colors.textColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsIcon;
