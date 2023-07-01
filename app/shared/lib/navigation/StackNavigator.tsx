import 'react-native-gesture-handler';
/* eslint-disable react/react-in-jsx-scope */
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Accounts from '../../../pages/Accounts/Accounts/Accounts';
import AnalyticsScreen from '../../../pages/Analytics/components/Analytics/Analytics';
import Chart from '../../../pages/Chart/components/Chart/Chart';
import Settings from '../../../pages/Settings/components/Settings/Settings';
import Balance from '../../ui/Balance/Balance';
import SettingsIcon from '../../ui/SettingsIcon/SettingsIcon';

export type RootStackParamList = {
  ChartStack: { name: string };
  CategoryStack: { name: string };
  AccountsStack: { name: string };
  AnalyticsStack: { name: string };
  SettingsStack: { name: string };
  ChartTab: { name: string };
  AccountsTab: { name: string };
  AnalyticsTab: { name: string };
  SettingsTab: { name: string };
};

const AccountsStack = createStackNavigator<RootStackParamList>();
const ChartStack = createStackNavigator<RootStackParamList>();
const AnalyticsStack = createStackNavigator<RootStackParamList>();

const screenOptionStyle = {
  headerShown: true,
  headerTitle: () => <Balance />,
  headerTitleAlign: 'center',
  headerRight: () => <SettingsIcon />,
  animationEnabled: false,
};

const AccountsStackNavigator = () => {
  const colors = useTheme().colors;

  return (
    <AccountsStack.Navigator screenOptions={screenOptionStyle}>
      <AccountsStack.Screen
        name='AccountsStack'
        component={Accounts}
        options={{ headerStyle: { backgroundColor: colors.contrastColor } }}
      />
    </AccountsStack.Navigator>
  );
};

const ChartStackNavigator = () => {
  const colors = useTheme().colors;
  return (
    <ChartStack.Navigator screenOptions={screenOptionStyle}>
      <ChartStack.Screen
        name='ChartStack'
        component={Chart}
        options={{ headerStyle: { backgroundColor: colors.contrastColor } }}
      />
      <ChartStack.Screen
        name='SettingsStack'
        component={Settings}
        options={{
          headerStyle: { backgroundColor: colors.contrastColor },
          headerTintColor: colors.textColor,
        }}
      />
    </ChartStack.Navigator>
  );
};

const AnalyticsStackNavigator = () => {
  const colors = useTheme().colors;
  return (
    <AnalyticsStack.Navigator screenOptions={screenOptionStyle}>
      <AnalyticsStack.Screen
        name='AnalyticsStack'
        component={AnalyticsScreen}
        options={{ headerStyle: { backgroundColor: colors.contrastColor } }}
      />
    </AnalyticsStack.Navigator>
  );
};

export { AccountsStackNavigator, ChartStackNavigator, AnalyticsStackNavigator };
