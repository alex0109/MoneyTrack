import { useTheme } from '@react-navigation/native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Modal } from 'react-native';

import { styles } from './Modal.styles';

import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  children: ReactNode;
  visible: boolean;
}

export interface ModalRefProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const CustomModal = forwardRef<ModalRefProps, ModalProps>(({ children }, refModal) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useTheme().colors;

  useImperativeHandle(refModal, () => ({ setModalVisible, modalVisible }), [
    setModalVisible,
    modalVisible,
  ]);

  return (
    <Modal animationType='fade' visible={modalVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modal, { backgroundColor: colors.themeColor }]}>{children}</View>
      </View>
    </Modal>
  );
});

CustomModal.displayName = 'CustomModal';

export default CustomModal;
