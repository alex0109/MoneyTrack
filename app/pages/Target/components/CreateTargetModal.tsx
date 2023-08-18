import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useActions } from '../../../shared/lib/hooks/useActions';
import { validateTitle } from '../../../shared/lib/utils/titleFormValidate';
import CustomModal from '../../../shared/ui/Modal/Modal';
import ModalTitle from '../../../shared/ui/ModalTitle/ModalTitle';

import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';
import type { FC, RefObject } from 'react';

interface CreateTargetModalProps {
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const CreateTargetModal: FC<CreateTargetModalProps> = ({
  refModal,
  modalVisible,
  setModalVisible,
}) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const { addNewTarget } = useActions();

  const [inputTargetTitle, seTinputTargetTitle] = useState<string>('');

  const inputHandler = (value: string): void => {
    if (validateTitle(value)) {
      seTinputTargetTitle(value);
    }
  };

  const createNewTargetHandler = () => {
    addNewTarget({ title: inputTargetTitle });
    setModalVisible(false);
  };

  return (
    <CustomModal ref={refModal} visible={modalVisible || false}>
      <ModalTitle>{t('firstScreen.createTargetTitle')}</ModalTitle>
      <View style={[styles.modalPopUpContent]}>
        <TextInput
          style={[
            styles.modalCountText,
            { color: colors.textColor, borderBottomColor: colors.textColor },
          ]}
          autoFocus={true}
          placeholder={t('global.placeholderTitle')!}
          placeholderTextColor={colors.gray}
          keyboardType='default'
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
            createNewTargetHandler();
          }}>
          <Text style={[styles.modalPopUpButton, { color: colors.success }]}>
            {t('global.create')}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default CreateTargetModal;

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
