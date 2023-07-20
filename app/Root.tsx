import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import { fetchCounts } from './pages/Count/lib/store/countSlice';
import Colors from './shared/assets/styles/colors';
import { useAppDispatch } from './shared/lib/hooks/useAppDispatch';
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
  const dispatch = useAppDispatch();

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

  GoogleSignin.configure({
    webClientId: '352118646986-2o3q0be4l7htn1tdr8occg474fhvbnp9.apps.googleusercontent.com',
  });

  useEffect(() => {
    async function fetchToken() {
      const storedToken: string = await get('token');
      const storedUid: string = await get('uid');

      dispatch(fetchCounts(storedUid));

      if (storedToken) {
        authContext.authenticate(storedToken, storedUid);
      }

      setIsTryingLogin(false);
    }

    void fetchToken();
  }, [authContext.isAuthenticated, dispatch]);

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
