/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  AccountsStackNavigator,
  AnalyticsStackNavigator,
  ChartStackNavigator,
} from './StackNavigator';

import type { RootStackParamList } from './StackNavigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
  const colors = useTheme().colors;

  return (
    <Tab.Navigator
      initialRouteName='ChartTab'
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: colors.contrastColor,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.warning,
        tabBarInactiveTintColor: colors.textColor,
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarShowLabel: false,
        headerShown: false,
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
    </Tab.Navigator>
  );
};

export default TabNavigator;
