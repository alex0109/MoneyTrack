import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import Colors from './shared/assets/styles/colors';
import { useActions } from './shared/lib/hooks/useActions';
import { useTypedSelector } from './shared/lib/hooks/useTypedSelector';
import TabNavigator from './shared/lib/navigation/TabNavigator';
import { ThemeContext } from './shared/lib/providers/ThemeProvider';
import { persistor } from './shared/lib/store/store';

const Root = () => {
  const { theme } = useContext(ThemeContext);
  const deviceTheme = useColorScheme();
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

  useEffect(() => {
    checkForMonthIncomeHandler();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer theme={currentTheme(theme)}>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Root;
