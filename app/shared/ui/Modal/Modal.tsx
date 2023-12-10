import { BlurView } from '@react-native-community/blur';
import { useTheme } from '@react-navigation/native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';

import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  children: ReactNode;
  visible: boolean;
}

export interface ModalRefProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
        <BlurView style={styles.absolute} blurType='dark' blurAmount={10} />
        <View style={[styles.modal, { backgroundColor: colors.themeColor }]}>{children}</View>
      </View>
    </Modal>
  );
});

CustomModal.displayName = 'CustomModal';

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH / 1.5,
    borderRadius: 20,
    padding: 15,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
