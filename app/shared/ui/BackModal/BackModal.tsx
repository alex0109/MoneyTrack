/* eslint-disable no-unused-vars */

import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';

import CustomModal from '../Modal/Modal';
import ModalTitle from '../ModalTitle/ModalTitle';

import type { ModalRefProps } from '../Modal/Modal';
import type { FC, RefObject } from 'react';

interface BackModalProps {
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const BackModal: FC<BackModalProps> = ({ refModal, modalVisible, setModalVisible }) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();

  return (
    <CustomModal ref={refModal} visible={modalVisible || false}>
      <ModalTitle>{t('secondScreen.quitTheApp')}</ModalTitle>
      <View style={[styles.modalPopUpButtonContainer]}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            BackHandler.exitApp();
          }}>
          <Text style={[styles.modalPopUpButton, { color: colors.red }]}>
            {t('global.exitApp')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={[styles.modalPopUpButton, { color: colors.textColor }]}>
            {t('global.back')}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default BackModal;

const styles = StyleSheet.create({
  modalCountText: {
    textAlign: 'center',
    minWidth: '40%',
    marginBottom: 25,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  modalPopUpButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  modalPopUpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalPopUpButton: {
    fontSize: 16,
  },
});
