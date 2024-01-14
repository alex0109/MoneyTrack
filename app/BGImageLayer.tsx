import { useTheme } from '@react-navigation/native';

import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, View, useColorScheme } from 'react-native';

import { loadData } from './pages/Settings/lib/api/loadData';
import { useActions } from './shared/lib/hooks/useActions';

import { AuthStackNavigator } from './shared/lib/navigation/StackNavigator';
import TabNavigator from './shared/lib/navigation/TabNavigator';
import { AuthContext } from './shared/lib/providers/AuthProvider';
import { BGImageContext } from './shared/lib/providers/BGImageProvider';
import { ThemeContext } from './shared/lib/providers/ThemeProvider';
import { saveString } from './shared/lib/utils/asyncMethods';
import { getCurrentBGImage } from './shared/lib/utils/getCurrentBGImage';

import type { ICategory } from './pages/Chart/lib/types/interfaces';
import type { ICount } from './pages/Count/lib/types/interfaces';
import type { ITarget } from './pages/Target/lib/types/interfaces';
import type { FC } from 'react';

const BGImageLayer: FC = () => {
  const colors = useTheme().colors;
  const { theme } = useContext(ThemeContext);
  const { imageName } = useContext(BGImageContext);

  const { isAuthenticated, uid } = useContext(AuthContext);

  // const { setCategoriesData, setCountsData, setTargetsData } = useActions();

  const deviceTheme = useColorScheme();

  const [backgroundImage, setBackgraoundImage] = useState(
    require(`./shared/assets/images/none.png`)
  );

  function currentTheme() {
    setBackgraoundImage(getCurrentBGImage(theme, imageName));
  }

  // const loadAppData = async () => {
  //   const response = await loadData(uid);

  //   // console.log(response);

  //   const loadedCategories: ICategory[] = await Object.values(response)[0].categories;
  //   const loadedCounts: ICount[] = await Object.values(response)[0].counts;
  //   const loadedTargets: ITarget[] = await Object.values(response)[0].targets;

  //   if (loadedCategories) {
  //     setCategoriesData(loadedCategories);
  //   }
  //   if (loadedCounts) {
  //     setCountsData(loadedCounts);
  //   }
  //   if (loadedTargets) {
  //     setTargetsData(loadedTargets);
  //   }
  // };

  useEffect(() => {
    // async function checkFirstStart() {
    //   const check = await get('firstStart');

    //   if (!check) {
    //     await saveString('firstStart', 'true');
    //     // await loadAppData();
    //   }
    // }

    // void checkFirstStart();

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
