/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SettingsIcon from '../../ui/SettingsIcon/SettingsIcon';
import { useTypedSelector } from '../hooks/useTypedSelector';

import {
  AccountsStackNavigator,
  AnalyticsStackNavigator,
  ChartStackNavigator,
  SettingsStackNavigator,
} from './StackNavigator';

import type { RootStackParamList } from './StackNavigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  const colors = useTheme().colors;
  const { count } = useTypedSelector((state) => state);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const countsSum = count.map((count) => count.value).reduce((a, b) => a + b, 0);

  return (
    <Tab.Navigator
      initialRouteName='ChartTab'
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: colors.contrastColor,
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.warning,
        tabBarInactiveTintColor: colors.textColor,
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarShowLabel: false,
        headerShown: true,
        headerBackgroundContainerStyle: {
          backgroundColor: colors.contrastColor,
        },
        headerTitle: () => (
          <View style={[]}>
            <Text style={{ color: colors.textColor, fontSize: 20, fontWeight: 'bold' }}>
              {t('global.headerBalance')} - {countsSum}
            </Text>
          </View>
        ),
        headerTitleAlign: 'center',
        headerRight: () => <SettingsIcon />,
      })}>
      <Tab.Screen
        name='AccountsTab'
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='md-wallet' size={22} color={color} />,
        }}
        component={AccountsStackNavigator}
      />
      <Tab.Screen
        name='ChartTab'
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='md-pie-chart' size={22} color={color} />,
        }}
        component={ChartStackNavigator}
      />
      <Tab.Screen
        name='AnalyticsTab'
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='md-stats-chart' size={22} color={color} />,
        }}
        component={AnalyticsStackNavigator}
      />
      <Tab.Screen
        name='SettingsTab'
        options={{
          tabBarButton: () => null,
          headerTitle: () => null,
          headerRight: () => null,
          headerLeft: () => (
            <View
              style={{
                height: '100%',
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons size={30} name='arrow-back-outline' color={colors.textColor} />
              </TouchableOpacity>
            </View>
          ),
        }}
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
