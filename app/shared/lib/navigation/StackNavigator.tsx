import 'react-native-gesture-handler';
/* eslint-disable react/react-in-jsx-scope */
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Accounts from '../../../pages/Accounts/Accounts/Accounts';
import AnalyticsScreen from '../../../pages/Analytics/components/Analytics/Analytics';
import SignIn from '../../../pages/Auth/components/Authentication/SignIn';
import SignUp from '../../../pages/Auth/components/Authentication/SignUp';
import CategoryEdit from '../../../pages/Chart/components/CategoryEdit/CategoryEdit';
import Chart from '../../../pages/Chart/components/Chart/Chart';
import CountEdit from '../../../pages/Count/components/CountEdit/CountEdit';
import Settings from '../../../pages/Settings/components/Settings/Settings';
import TargetEdit from '../../../pages/Target/components/TargetEdit/TargetEdit';
import Balance from '../../ui/Balance/Balance';
import SettingsIcon from '../../ui/SettingsIcon/SettingsIcon';

export type RootStackParamList = {
  SignInStack: { name: string };
  SignUpStack: { name: string };
  ChartStack: { name: string };
  AccountsStack: { name: string };
  AnalyticsStack: { name: string };
  SettingsStack: { name: string };
  CategoryEditStack: { name: string };
  CountEditStack: { name: string };
  TargetEditStack: { name: string };
  ChartTab: { name: string };
  AccountsTab: { name: string };
  AnalyticsTab: { name: string };
};

const AccountsStack = createStackNavigator<RootStackParamList>();
const ChartStack = createStackNavigator<RootStackParamList>();
const AnalyticsStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<RootStackParamList>();

const screenOptionStyle = {
  headerShown: true,
  headerTitle: () => <Balance />,
  headerTitleAlign: 'center',
  headerRight: () => <SettingsIcon />,
  animationEnabled: false,
};

const AuthStackNavigator = () => {
  const colors = useTheme().colors;

  return (
    <AuthStack.Navigator
      initialRouteName='SignInStack'
      screenOptions={{ headerShown: false, animationEnabled: false }}>
      <AuthStack.Screen
        name='SignInStack'
        component={SignIn}
        options={{ headerStyle: { backgroundColor: colors.contrastColor } }}
      />
      <AuthStack.Screen
        name='SignUpStack'
        component={SignUp}
        options={{ headerStyle: { backgroundColor: colors.contrastColor } }}
      />
    </AuthStack.Navigator>
  );
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
      <AccountsStack.Screen
        name='SettingsStack'
        component={Settings}
        options={{
          headerStyle: { backgroundColor: colors.contrastColor },
          headerTitle: () => null,
          headerRight: () => null,
          headerTintColor: colors.textColor,
        }}
      />
      <AccountsStack.Screen
        name='CountEditStack'
        component={CountEdit}
        options={{
          headerStyle: { backgroundColor: colors.contrastColor },
          headerTitle: () => null,
          headerRight: () => null,
          headerTintColor: colors.textColor,
        }}
      />
      <AccountsStack.Screen
        name='TargetEditStack'
        component={TargetEdit}
        options={{
          headerStyle: { backgroundColor: colors.contrastColor },
          headerTitle: () => null,
          headerRight: () => null,
          headerTintColor: colors.textColor,
        }}
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
          headerTitle: () => null,
          headerRight: () => null,
          headerTintColor: colors.textColor,
        }}
      />
      <ChartStack.Screen
        name='CategoryEditStack'
        component={CategoryEdit}
        options={{
          headerStyle: { backgroundColor: colors.contrastColor },
          headerTitle: () => null,
          headerRight: () => null,
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
      <AnalyticsStack.Screen
        name='SettingsStack'
        component={Settings}
        options={{
          headerStyle: { backgroundColor: colors.contrastColor },
          headerTitle: () => null,
          headerRight: () => null,
          headerTintColor: colors.textColor,
        }}
      />
    </AnalyticsStack.Navigator>
  );
};

export { AuthStackNavigator, AccountsStackNavigator, ChartStackNavigator, AnalyticsStackNavigator };
