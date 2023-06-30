import 'react-native-gesture-handler';
/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';

import Accounts from '../../../pages/Accounts/Accounts/Accounts';
import AnalyticsScreen from '../../../pages/Analytics/components/Analytics/Analytics';
import Chart from '../../../pages/Chart/components/Chart/Chart';
import Settings from '../../../pages/Settings/components/Settings/Settings';

export type RootStackParamList = {
  ChartStack: { name: string };
  CategoryStack: { name: string };
  AccountsStack: { name: string };
  AnalyticssStack: { name: string };
  SettingsStack: { name: string };
  ChartTab: { name: string };
  AccountsTab: { name: string };
  AnalyticsTab: { name: string };
  SettingsTab: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const screenOptionStyle = {
  headerShown: false,
  animationEnabled: false,
};

const AccountsStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='AccountsStack' component={Accounts} />
  </Stack.Navigator>
);

const ChartStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='ChartStack' component={Chart} />
    {/* <Stack.Screen name='ChartStack' component={Test} /> */}
  </Stack.Navigator>
);

const AnalyticsStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='AnalyticssStack' component={AnalyticsScreen} />
  </Stack.Navigator>
);

const SettingsStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='SettingsStack' component={Settings} />
  </Stack.Navigator>
);

export {
  AccountsStackNavigator,
  ChartStackNavigator,
  AnalyticsStackNavigator,
  SettingsStackNavigator,
};
