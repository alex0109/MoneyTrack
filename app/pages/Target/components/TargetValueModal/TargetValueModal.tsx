/* eslint-disable no-unused-vars */
import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import CustomModal from '../../../../shared/ui/Modal/Modal';

import ModalTitle from '../../../../shared/ui/ModalTitle/ModalTitle';

import { topUpTargetValue } from '../../lib/store/targetSlice';

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
  const authContext = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [addedValue, setAddedValue] = useState<number>(0);
  const colors = useTheme().colors;
  const { t } = useTranslation();

  const inputHandler = (value: string) => {
    if (validateValue(value)) {
      setAddedValue(Number(value));
    }
  };

  const addValueHandler = (index: string): void => {
    dispatch(topUpTargetValue({ uid: authContext.uid, targetID: index, targetValue: addedValue }));
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
