/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';
import Title from '../../../shared/ui/Title/Title';

import CreateTargetModal from './CreateTargetModal';
import TargetBar from './TargetBar';

import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';

import type { FC } from 'react';

interface TargetListProps {
  handleModalOpen: (index: string) => void;
}

const TargetList: FC<TargetListProps> = ({ handleModalOpen }) => {
  const { target } = useTypedSelector((state) => state);

  const colors = useTheme().colors;
  const { t } = useTranslation();

  const refCreateTargetModal = useRef<ModalRefProps>(null);

  const setCreateTargetModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refCreateTargetModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refCreateTargetModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const createTargetModalVisible = refCreateTargetModal.current?.modalVisible;

  return (
    <View style={{ paddingLeft: 25 }}>
      <Title>{t('firstScreen.targetTitle')}</Title>
      {target.length == 0 ? (
        <View style={styles.noTargetsdMessage}>
          <Text
            style={[
              styles.noTargetsdMessageText,
              { color: colors.textColor, fontFamily: 'NotoSans-Regular' },
            ]}>
            {t('firstScreen.noTargetsMessage')}
          </Text>
          <Pressable onPress={() => setCreateTargetModalVisible(true)}>
            <Ionicons name='add-outline' size={35} color={colors.textColor} />
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.targetsContent}>
            {target.map((item) => (
              <TouchableOpacity
                key={item.index}
                onPress={() => {
                  handleModalOpen(item.index);
                }}>
                <TargetBar key={item.index} {...item} />
              </TouchableOpacity>
            ))}
            {target.length < 5 ? (
              <Pressable onPress={() => setCreateTargetModalVisible(true)}>
                <Ionicons name='add-outline' size={35} color={colors.textColor} />
              </Pressable>
            ) : null}
          </View>
        </View>
      )}
      <CreateTargetModal
        refModal={refCreateTargetModal}
        modalVisible={createTargetModalVisible}
        setModalVisible={setCreateTargetModalVisible}
      />
    </View>
  );
};

export default TargetList;

const styles = StyleSheet.create({
  noTargetsdMessage: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  targetsContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  noTargetsdMessageText: {
    fontSize: 20,
    marginBottom: 30,
  },
});
