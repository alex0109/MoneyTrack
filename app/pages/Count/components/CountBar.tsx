import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../shared/assets/styles/colors';
import { useActions } from '../../../shared/lib/hooks/useActions';

import type { ICount } from '../lib/types/interfaces';
import type { FC } from 'react';

const windowWidth = Dimensions.get('window').width;

const CountBar: FC<ICount> = (count) => {
  const { deleteCount } = useActions();

  const colors = useTheme().colors;

  const onRightSwipe = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: colors.red,
      }}>
      <TouchableOpacity onPress={() => deleteCount({ index: count.index })}>
        <Ionicons name='md-close-outline' size={35} color={colors.textColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ marginBottom: 30, backgroundColor: colors.contrastColor, borderRadius: 10 }}>
      <Swipeable renderRightActions={onRightSwipe}>
        <View style={[styles.contentContainer, { borderBottomColor: colors.textColor }]}>
          <View style={styles.contentItem}>
            <Text style={[styles.title, { color: colors.textColor }]}>{count.title}</Text>
            <Text style={[styles.subTitle]}>{count.value}</Text>
          </View>
        </View>
      </Swipeable>
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
    fontFamily: 'NotoSans-Regular',
  },
  subTitle: {
    paddingLeft: 10,
    color: Colors.light.colors.success,
    fontSize: 18,
    fontFamily: 'NotoSans-Regular',
  },
});
