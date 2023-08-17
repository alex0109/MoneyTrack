import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../shared/assets/styles/colors';
import { useActions } from '../../../shared/lib/hooks/useActions';

import type { ITarget } from '../lib/types/interfaces';

import type { FC } from 'react';

const windowWidth = Dimensions.get('window').width;

const TargetBar: FC<ITarget> = (target) => {
  const { deleteTarget } = useActions();

  const colors = useTheme().colors;

  const onRightSwipe = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: colors.red,
        height: 50,
      }}>
      <TouchableOpacity onPress={() => deleteTarget({ index: target.index })}>
        <Ionicons name='md-close-outline' size={35} color={colors.textColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ marginBottom: 30, backgroundColor: colors.contrastColor, borderRadius: 10 }}>
      <Swipeable renderRightActions={onRightSwipe}>
        <SafeAreaView style={[styles.contentContainer, { borderBottomColor: colors.textColor }]}>
          <View style={styles.contentItem}>
            <Text
              style={[styles.title, { color: colors.textColor, fontFamily: 'NotoSans-Regular' }]}>
              {target.title}
            </Text>
            <Text style={[styles.subTitle, { fontFamily: 'NotoSans-Regular' }]}>
              {target.value} / {target.target}
            </Text>
          </View>
        </SafeAreaView>
      </Swipeable>
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
    borderRadius: 0.1,
    borderRightWidth: 3,
    borderRightColor: Colors.light.colors.red,
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
