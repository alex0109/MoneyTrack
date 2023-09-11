/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';
import Title from '../../../shared/ui/Title/Title';

import CreateTargetModal from './CreateTargetModal';
import TargetBar from './TargetBar';

import TargetValueModal from './TargetValueModal';

import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';

import type { FC } from 'react';

interface TargetListProps {
  handleModalOpen: (index: string) => void;
}

const TargetList: FC<TargetListProps> = ({ handleModalOpen }) => {
  const { target } = useTypedSelector((state) => state);
  const [targetIndex, setTargetIndex] = useState('');

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

  const refTargeValuetModal = useRef<ModalRefProps>(null);

  const setTargetValueModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refTargeValuetModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refTargeValuetModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const targetValueModalVisible = refTargeValuetModal.current?.modalVisible;

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
            <SwipeListView
              scrollEnabled={false}
              contentContainerStyle={styles.targetsContent}
              data={target}
              renderItem={(item) => (
                <TouchableOpacity
                  key={item.item.index}
                  onPress={() => {
                    handleModalOpen(item.item.index);
                  }}>
                  <TargetBar key={item.item.index} {...item.item} />
                </TouchableOpacity>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View
                  style={{
                    backgroundColor: colors.contrastColor,
                    width: '100%',
                    height: 50,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setTargetIndex(data.item.index);
                      setTargetValueModalVisible(true);
                    }}
                    style={{
                      backgroundColor: colors.success,
                      height: '100%',
                      width: 55,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    }}>
                    <Ionicons name='add-outline' size={35} color={colors.textColor} />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-50}
              disableRightSwipe
            />
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
      <TargetValueModal
        targetIndex={targetIndex}
        refModal={refTargeValuetModal}
        modalVisible={targetValueModalVisible}
        setModalVisible={setTargetValueModalVisible}
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
