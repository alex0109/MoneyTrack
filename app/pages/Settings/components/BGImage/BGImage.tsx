import { useTheme } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { BGImageContext } from '../../../../shared/lib/providers/BGImageProvider';
import { ThemeContext } from '../../../../shared/lib/providers/ThemeProvider';
import Title from '../../../../shared/ui/Title/Title';

import type { FC } from 'react';

const BGImage: FC = () => {
  const colors = useTheme().colors;
  const { theme } = useContext(ThemeContext);
  const { changeImage, imageIndex } = useContext(BGImageContext);
  const { t } = useTranslation();

  const animSource =
    theme == 'light'
      ? require('../../../../shared/assets/images/animlt.png')
      : require('../../../../shared/assets/images/animdr.png');

  const dinoSource =
    theme == 'light'
      ? require('../../../../shared/assets/images/dnlt.png')
      : require('../../../../shared/assets/images/dndr.png');

  const dudesSource =
    theme == 'light'
      ? require('../../../../shared/assets/images/dudeslt.png')
      : require('../../../../shared/assets/images/dudesdr.png');

  const leafSource =
    theme == 'light'
      ? require('../../../../shared/assets/images/leaflt.png')
      : require('../../../../shared/assets/images/leafdr.png');

  useEffect(() => {}, [imageIndex]);

  return (
    <View style={[styles.container]}>
      <Title>{t('settings.bgImage')}</Title>
      <ScrollView horizontal>
        <TouchableOpacity
          onPress={() => changeImage('none', 0)}
          style={[
            styles.imageButton,
            { borderColor: imageIndex == 0 ? colors.warning : colors.textColor },
          ]}>
          <ImageBackground
            source={require('../../../../shared/assets/images/none.png')}
            style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name={'close-circle-outline'} size={35} color={colors.textColor} />
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeImage('anim', 1)}
          style={[
            styles.imageButton,
            { borderColor: imageIndex == 1 ? colors.warning : colors.textColor },
          ]}>
          <Image source={animSource} style={[styles.image]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeImage('dn', 2)}
          style={[
            styles.imageButton,
            { borderColor: imageIndex == 2 ? colors.warning : colors.textColor },
          ]}>
          <Image source={dinoSource} style={[styles.image]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeImage('dudes', 3)}
          style={[
            styles.imageButton,
            { borderColor: imageIndex == 3 ? colors.warning : colors.textColor },
          ]}>
          <Image source={dudesSource} style={[styles.image]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeImage('leaf', 4)}
          style={[
            styles.imageButton,
            { borderColor: imageIndex == 4 ? colors.warning : colors.textColor },
          ]}>
          <Image source={leafSource} style={[styles.image]} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default BGImage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  imageButton: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  image: { width: 100, height: 200 },
});
