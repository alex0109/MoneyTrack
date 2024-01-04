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
import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';

interface TargetValueModalProps {
  targetIndex: string;
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
  title: string;
}

const TargetValueModal: FC<TargetValueModalProps> = ({
  targetIndex,
  refModal,
  modalVisible,
  setModalVisible,
  title,
}) => {
  const [addedValue, setAddedValue] = useState<number>(0);
  const [currentCount, setCurrentCount] = useState(0);
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const { count } = useTypedSelector((state) => state);
  const { topUpTargetValue, appendTargetHistory, decreaseCountValue } = useActions();

  const changeCountHandler = () => {
    if (currentCount == count.length - 1) {
      setCurrentCount(0);
    } else {
      setCurrentCount((index) => index + 1);
    }
  };

  const inputHandler = (value: string) => {
    if (validateValue(value)) {
      setAddedValue(Number(value));
    }
  };

  const addValueHandler = (index: string): void => {
    topUpTargetValue({ index: index, value: addedValue, countIndex: '1' });
    decreaseCountValue({ index: count[currentCount].index, value: addedValue });
    appendTargetHistory({
      originalID: index,
      value: addedValue,
      title,
      fromCount: count[currentCount].index,
    });
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
        <TouchableOpacity onPress={() => changeCountHandler()}>
          <Text style={[styles.modalPopUpTitle, { color: colors.info }]}>
            {count[currentCount].title} {count[currentCount].value}
          </Text>
        </TouchableOpacity>
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
            addValueHandler(targetIndex);
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

const styles = StyleSheet.create({
  modalCountText: {
    textAlign: 'center',
    minWidth: '70%',
    marginBottom: 25,
    fontFamily: 'NotoSans-Regular',
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
