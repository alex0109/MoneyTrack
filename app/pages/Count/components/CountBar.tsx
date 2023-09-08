import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../../shared/assets/styles/colors';

import type { ICount } from '../lib/types/interfaces';
import type { FC } from 'react';

const windowWidth = Dimensions.get('window').width;

const CountBar: FC<ICount> = (count) => {
  const colors = useTheme().colors;

  return (
    <View style={{ marginBottom: 30, backgroundColor: colors.contrastColor, borderRadius: 10 }}>
      <View style={[styles.contentContainer, { borderBottomColor: colors.textColor }]}>
        <View style={styles.contentItem}>
          <Text style={[styles.title, { color: colors.textColor }]}>{count.title}</Text>
          <Text style={[styles.subTitle]}>{count.value}</Text>
        </View>
      </View>
    </View>
  );
};

export default CountBar;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: windowWidth / 1.2,
    borderRadius: 10,
    borderRightWidth: 3,
    borderColor: Colors.light.colors.success,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: 'NotoSans-Regular',
  },
  subTitle: {
    paddingLeft: 10,
    color: Colors.light.colors.success,
    fontSize: 18,
    fontFamily: 'NotoSans-Regular',
  },
});
