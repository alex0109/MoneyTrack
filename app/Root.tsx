import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import BGImageLayer from './BGImageLayer';

import Colors from './shared/assets/styles/colors';

import { AuthContext } from './shared/lib/providers/AuthProvider';
import { ThemeContext } from './shared/lib/providers/ThemeProvider';
import { get } from './shared/lib/utils/asyncMethods';

import type { FC } from 'react';

const Root: FC = () => {
  const { isConnected } = NetInfo.useNetInfo();

  const { theme } = useContext(ThemeContext);
  const authContext = useContext(AuthContext);

  const deviceTheme = useColorScheme();

  const [isTryingLogin, setIsTryingLogin] = useState(true);

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

  useEffect(() => {
    async function fetchToken() {
      const storedToken: string = await get('token');
      const storedUid: string = await get('uid');

      if (storedToken) {
        authContext.authenticate(storedToken, storedUid);
      }

      setIsTryingLogin(false);
    }

    void fetchToken();
  }, [authContext.isAuthenticated, isConnected]);

  if (!isTryingLogin) {
    SplashScreen.hide();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <NavigationContainer theme={currentTheme(theme)}>
        <BGImageLayer />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Root;
