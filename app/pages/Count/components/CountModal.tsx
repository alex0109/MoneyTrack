/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useActions } from '../../../shared/lib/hooks/useActions';

import { validateValue } from '../../../shared/lib/utils/validateValue';
import CustomModal from '../../../shared/ui/Modal/Modal';
import ModalTitle from '../../../shared/ui/ModalTitle/ModalTitle';

import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';
import type { FC, RefObject } from 'react';

interface CountModalProps {
  countElementIndex: string;
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
  title: string;
}

const CountModal: FC<CountModalProps> = ({
  countElementIndex,
  refModal,
  modalVisible,
  setModalVisible,
  title,
}) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const { topUpCountValue, appendCountHistory } = useActions();

  const [addedCount, setAddedCount] = useState<number>(0);

  const inputHandler = (value: number): void => {
    if (validateValue(value)) {
      setAddedCount(value);
    }
  };

  const addCountHandler = (index: string): void => {
    topUpCountValue({ index: index, value: addedCount });
    appendCountHistory({ value: addedCount, originalID: index, title });
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
          onChangeText={(input) => inputHandler(Number(input))}
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
          <Text style={[styles.modalPopUpButton, { color: colors.success }]}>
            {t('firstScreen.modalAddButton')}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default CountModal;

const styles = StyleSheet.create({
  modalCountText: {
    fontFamily: 'NotoSans-Regular',
    textAlign: 'center',
    minWidth: '70%',
    marginBottom: 25,
    fontSize: 16,
    borderBottomWidth: 1,
  },
  modalPopUpButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalPopUpTitle: {
    fontSize: 16,
    fontFamily: 'NotoSans-Bold',
    textAlign: 'center',
  },
  modalPopUpContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  modalPopUpButton: {
    fontSize: 16,
    fontFamily: 'NotoSans-Regular',
  },
});
