import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../../shared/assets/styles/colors';

import type { ITarget } from '../lib/types/interfaces';

import type { FC } from 'react';

const windowWidth = Dimensions.get('window').width;

const TargetBar: FC<ITarget> = (target) => {
  const colors = useTheme().colors;

  return (
    <View style={{ marginBottom: 30, backgroundColor: colors.contrastColor, borderRadius: 10 }}>
      <SafeAreaView style={[styles.contentContainer, { borderBottomColor: colors.textColor }]}>
        <View style={styles.contentItem}>
          <Text style={[styles.title, { color: colors.textColor, fontFamily: 'NotoSans-Regular' }]}>
            {target.title}
          </Text>
          <Text style={[styles.subTitle, { fontFamily: 'NotoSans-Regular' }]}>
            {target.value} / {target.target}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TargetBar;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: windowWidth / 1.2,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    paddingLeft: 10,
  },
  subTitle: {
    paddingLeft: 10,
    color: Colors.light.colors.success,
    fontSize: 18,
  },
});
