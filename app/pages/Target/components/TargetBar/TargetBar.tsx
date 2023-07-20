import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';

import { styles } from './TargetBar.styles';

import type { ITarget } from '../../lib/types/interfaces';

import type { FC } from 'react';

const TargetBar: FC<ITarget> = (target) => {
  const { handleDeleteTarget } = useActions();

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
      <TouchableOpacity onPress={() => handleDeleteTarget({ index: target.index })}>
        <Ionicons name='md-close-outline' size={35} color={colors.textColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ marginBottom: 30 }}>
      <Swipeable renderRightActions={onRightSwipe}>
        <SafeAreaView style={[styles.contentContainer, { borderBottomColor: colors.textColor }]}>
          <View style={styles.contentItem}>
            <Text style={[styles.title, { color: colors.textColor }]}>{target.title}</Text>
            <Text style={[styles.subTitle]}>
              {target.value} / {target.target}
            </Text>
          </View>
        </SafeAreaView>
      </Swipeable>
    </View>
  );
};

export default TargetBar;
