/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import Title from '../../../../shared/ui/Title/Title';
import CountBar from '../CountBar/CountBar';

import type { ICount } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface CountListProps {
  handleModalOpen: (index: string) => void;
}

const CountList: FC<CountListProps> = ({ handleModalOpen }) => {
  const { handleAddCount } = useActions();
  const { count } = useTypedSelector((state) => state);
  const colors = useTheme().colors;
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('firstScreen.countTitle')}</Title>

      {count.length == 0 ? (
        <View style={styles.noCountsMessage}>
          <Text style={[styles.noCountsMessageText, { color: colors.textColor }]}>
            {t('firstScreen.noCountsMessage')}
          </Text>
          <Pressable onPress={() => handleAddCount()}>
            <Ionicons name='add-outline' size={35} color={colors.textColor} />
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.countsContent}>
            {count.map((item: ICount) => (
              <TouchableOpacity
                key={item.index}
                onPress={() => {
                  handleModalOpen(item.index);
                }}>
                <CountBar key={item.index} {...item} />
              </TouchableOpacity>
            ))}
            {count.length < 5 ? (
              <Pressable onPress={() => handleAddCount()}>
                <Ionicons name='add-outline' size={35} color={colors.textColor} />
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default CountList;

const styles = StyleSheet.create({
  noCountsMessage: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  countsContent: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  noCountsMessageText: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: '400',
  },
});
