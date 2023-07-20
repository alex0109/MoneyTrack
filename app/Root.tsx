import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import { fetchCategories } from './pages/Chart/lib/store/categorySlice';
import { fetchCounts } from './pages/Count/lib/store/countSlice';
import { fetchTargets } from './pages/Target/lib/store/targetSlice';
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

  useEffect(() => {
    async function fetchToken() {
      const storedToken: string = await get('token');
      const storedUid: string = await get('uid');

      dispatch(fetchCategories(storedUid));
      dispatch(fetchCounts(storedUid));
      dispatch(fetchTargets(storedUid));

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
