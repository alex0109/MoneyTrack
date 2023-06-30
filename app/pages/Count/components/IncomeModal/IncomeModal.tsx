/* eslint-disable no-unused-vars */
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import CustomModal from '../../../../shared/ui/Modal/Modal';
import ModalTitle from '../../../../shared/ui/ModalTitle/ModalTitle';

import { styles } from '../CountModal/CountModal.styles';

import type { ModalRefProps } from '../../../../shared/ui/Modal/Modal';
import type { FC, RefObject } from 'react';

interface IncomeModalProps {
  countElementIndex: string;
  countMonthIncome: number;
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const IncomeModal: FC<IncomeModalProps> = ({
  countElementIndex,
  countMonthIncome,
  refModal,
  modalVisible,
  setModalVisible,
}) => {
  const { handleChangeMonthIncomeValue } = useActions();
  const colors = useTheme().colors;
  const { t } = useTranslation();

  const [currentIncome, setCurrentIncome] = useState<number>('');

  const inputHandler = (value: string): void => {
    if (!isNaN(Number(value)) && Number(value) >= 0 && value.length < 12) {
      setCurrentIncome(Number(value));
    }
  };

  const changeIncomeValueHandler = (index: string): void => {
    handleChangeMonthIncomeValue({ index: index, value: currentIncome });
    setModalVisible(false);
  };

  return (
    <CustomModal ref={refModal} visible={modalVisible || false}>
      <ModalTitle>
        {t('firstScreen.countModalTitleIncome')}({countMonthIncome})
      </ModalTitle>
      <View style={[styles.modalPopUpContent]}>
        <TextInput
          style={[
            styles.modalCountText,
            { color: colors.textColor, borderBottomColor: colors.textColor },
          ]}
          value={`${currentIncome}`}
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
            changeIncomeValueHandler(countElementIndex);
          }}>
          <Text style={[styles.modalPopUpButton, { color: colors.textColor }]}>
            {t('firstScreen.countModalSetbutton')}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default IncomeModal;
