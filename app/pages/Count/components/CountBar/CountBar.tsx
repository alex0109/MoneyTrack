import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';

import { styles } from './CountBar.styles';

import type { ICount } from '../../lib/types/interfaces';
import type { FC } from 'react';

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
