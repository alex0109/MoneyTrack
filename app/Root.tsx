import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import Colors from './shared/assets/styles/colors';
import { useActions } from './shared/lib/hooks/useActions';
import { useTypedSelector } from './shared/lib/hooks/useTypedSelector';
import { AuthStackNavigator } from './shared/lib/navigation/StackNavigator';
import TabNavigator from './shared/lib/navigation/TabNavigator';
import { AuthContext } from './shared/lib/providers/AuthProvider';
import { ThemeContext } from './shared/lib/providers/ThemeProvider';
import { get } from './shared/lib/utils/asyncMethods';

import type { FC } from 'react';

const Root: FC = () => {
  const { theme } = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const deviceTheme = useColorScheme();
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const { count } = useTypedSelector((state) => state);

  const { handleMonthIncome } = useActions();

  function currentTheme(theme: string) {
    if (theme === 'light') {
      return Colors.light;
    }
    if (theme === 'dark') {
      return Colors.dark;
    } else {
      return deviceTheme === 'dark' ? Colors.dark : Colors.light;
    }
  }

  const checkForMonthIncomeHandler = () => {
    const currentDate = moment().format('YYYY-MM-DD');
    if (count.length > 0) {
      for (let i = 0; i < count.length; i++) {
        if (count[i].monthIncome.incomeDate == currentDate) {
          handleMonthIncome({ index: count[i].index });
        }
      }
    }
  };

  GoogleSignin.configure({
    webClientId: '352118646986-2o3q0be4l7htn1tdr8occg474fhvbnp9.apps.googleusercontent.com',
  });

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await get('token');

      if (storedToken) {
        authContext.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    void fetchToken();
    checkForMonthIncomeHandler();
  }, [authContext.isAuthenticated]);

  if (!isTryingLogin) {
    SplashScreen.hide();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer theme={currentTheme(theme)}>
        {authContext.isAuthenticated && <TabNavigator />}
        {!authContext.isAuthenticated && <AuthStackNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Root;
