/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import CustomModal from '../../../../shared/ui/Modal/Modal';
import ModalTitle from '../../../../shared/ui/ModalTitle/ModalTitle';

import { styles } from './CountModal.styles';

import type { ModalRefProps } from '../../../../shared/ui/Modal/Modal';
import type { FC, RefObject } from 'react';

interface CountModalProps {
  countElementIndex: string;
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const CountModal: FC<CountModalProps> = ({
  countElementIndex,
  refModal,
  modalVisible,
  setModalVisible,
}) => {
  const { handleTopUpCount } = useActions();
  const colors = useTheme().colors;
  const { t } = useTranslation();

  const [addedCount, setAddedCount] = useState<number>('');

  const inputHandler = (value: string): void => {
    if (validateValue(value)) {
      setAddedCount(Number(value));
    }
  };

  const addCountHandler = (index: string): void => {
    handleTopUpCount({ index: index, value: addedCount });
    setAddedCount(0);
    setModalVisible(false);
  };

  return (
    <CustomModal ref={refModal} visible={modalVisible || false}>
      <ModalTitle>{t('firstScreen.modalTitleAdd')}</ModalTitle>
      <View style={[styles.modalPopUpContent]}>
        <TextInput
          style={[
            styles.modalCountText,
            { color: colors.textColor, borderBottomColor: colors.textColor },
          ]}
          autoFocus={true}
          placeholder={t('global.placeholderValue')!}
          placeholderTextColor={colors.gray}
          keyboardType='numeric'
          onChangeText={(input) => inputHandler(input)}
        />
      </View>
      <View style={[styles.modalPopUpButtonContainer]}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={[styles.modalPopUpButton, { color: colors.textColor }]}>
            {t('global.back')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addCountHandler(countElementIndex);
          }}>
          <Text style={[styles.modalPopUpButton, { color: colors.textColor }]}>
            {t('firstScreen.modalAddButton')}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default CountModal;
