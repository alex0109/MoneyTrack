/* eslint-disable no-unused-vars */
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import CustomModal from '../../../../shared/ui/Modal/Modal';

import ModalTitle from '../../../../shared/ui/ModalTitle/ModalTitle';

import { styles } from './TargetValueModal.styles';

import type { ModalRefProps } from '../../../../shared/ui/Modal/Modal';
import type { ITarget } from '../../lib/types/interfaces';
import type { FC, RefObject } from 'react';

interface TargetValueModalProps {
  targetElement: ITarget;
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const TargetValueModal: FC<TargetValueModalProps> = ({
  targetElement,
  refModal,
  modalVisible,
  setModalVisible,
}) => {
  const { handleTopUpTargetValue } = useActions();
  const [addedValue, setAddedValue] = useState<number>(0);
  const colors = useTheme().colors;
  const { t } = useTranslation();

  const inputHandler = (value: string) => {
    if (validateValue(value)) {
      setAddedValue(Number(value));
    }
  };

  const addValueHandler = (index: string): void => {
    handleTopUpTargetValue({ index: index, value: addedValue });
    setAddedValue(0);
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
            addValueHandler(targetElement.index);
          }}>
          <Text style={[styles.modalPopUpButton, { color: colors.textColor }]}>
            {t('firstScreen.modalAddButton')}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default TargetValueModal;