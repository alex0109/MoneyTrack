import { useTheme } from '@react-navigation/native';

import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, View, useColorScheme } from 'react-native';

import { deleteData } from './pages/Settings/lib/api/deleteData';
import { fetchData } from './pages/Settings/lib/api/fetchData';
import { useTypedSelector } from './shared/lib/hooks/useTypedSelector';
import { AuthStackNavigator } from './shared/lib/navigation/StackNavigator';
import TabNavigator from './shared/lib/navigation/TabNavigator';
import { AuthContext } from './shared/lib/providers/AuthProvider';
import { BGImageContext } from './shared/lib/providers/BGImageProvider';
import { ThemeContext } from './shared/lib/providers/ThemeProvider';
import { getCurrentBGImage } from './shared/lib/utils/getCurrentBGImage';

import type { FC } from 'react';

const BGImageLayer: FC = () => {
  const colors = useTheme().colors;
  const { theme } = useContext(ThemeContext);
  const { imageName } = useContext(BGImageContext);

  const { isAuthenticated } = useContext(AuthContext);

  const deviceTheme = useColorScheme();

  const [backgroundImage, setBackgraoundImage] = useState(
    require(`./shared/assets/images/none.png`)
  );

  function currentTheme() {
    setBackgraoundImage(getCurrentBGImage(theme, imageName));
  }

  useEffect(() => {
    currentTheme();
  }, [theme, deviceTheme, imageName]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.themeColor }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: 'center' }}
        imageStyle={{ opacity: 0.2 }}
        source={backgroundImage}
        resizeMode='repeat'>
        {isAuthenticated && <TabNavigator />}
        {!isAuthenticated && <AuthStackNavigator />}
      </ImageBackground>
    </View>
  );
};

export default BGImageLayer;
