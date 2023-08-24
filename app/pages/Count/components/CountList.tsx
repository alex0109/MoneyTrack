/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';

import Title from '../../../shared/ui/Title/Title';

import CountBar from './CountBar';

import CreateCountModal from './CreateCountModal';

import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';
import type { ICount } from '../lib/types/interfaces';
import type { FC } from 'react';

interface CountListProps {
  handleModalOpen: (index: string) => void;
}

const CountList: FC<CountListProps> = ({ handleModalOpen }) => {
  const { count } = useTypedSelector((state) => state);

  const colors = useTheme().colors;
  const { t } = useTranslation();

  const refCreateCountModal = useRef<ModalRefProps>(null);

  const setCreateCountModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refCreateCountModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refCreateCountModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const createCountModalVisible = refCreateCountModal.current?.modalVisible;

  return (
    <View style={{ paddingLeft: 25, marginBottom: 60 }}>
      <Title>{t('firstScreen.countTitle')}</Title>

      {count.length == 0 ? (
        <View style={styles.noCountsMessage}>
          <Text style={[styles.noCountsMessageText, { color: colors.textColor }]}>
            {t('firstScreen.noCountsMessage')}
          </Text>
          <Pressable onPress={() => setCreateCountModalVisible(true)}>
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
            {count.length < 4 ? (
              <Pressable onPress={() => setCreateCountModalVisible(true)}>
                <Ionicons name='add-outline' size={35} color={colors.textColor} />
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        </View>
      )}
      <CreateCountModal
        refModal={refCreateCountModal}
        modalVisible={createCountModalVisible}
        setModalVisible={setCreateCountModalVisible}
      />
    </View>
  );
};

export default CountList;

const styles = StyleSheet.create({
  noCountsMessage: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  countsContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  noCountsMessageText: {
    fontSize: 20,
    marginBottom: 30,
    fontFamily: 'NotoSans-Regular',
  },
});
