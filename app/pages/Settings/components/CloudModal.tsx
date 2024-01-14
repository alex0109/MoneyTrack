import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../../shared/lib/providers/AuthProvider';
import CustomModal from '../../../shared/ui/Modal/Modal';
import ModalTitle from '../../../shared/ui/ModalTitle/ModalTitle';

import { deleteData } from '../lib/api/deleteData';

import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';
import type { FC, RefObject } from 'react';

interface CloudModalProps {
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const CloudModal: FC<CloudModalProps> = ({ refModal, modalVisible, setModalVisible }) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();

  const { uid } = useContext(AuthContext);

  const deleteDataHandler = async () => {
    await deleteData(uid);
    setModalVisible(false);
  };

  return (
    <CustomModal ref={refModal} visible={modalVisible || false}>
      <ModalTitle>{t('settings.deleteTitleModal')}</ModalTitle>
      <View style={[styles.modalPopUpContent]}></View>
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
          onPress={async () => {
            await deleteDataHandler();
          }}>
          <Text style={[styles.modalPopUpButton, { color: colors.red }]}>
            {t('settings.delete')}
          </Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default CloudModal;

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
