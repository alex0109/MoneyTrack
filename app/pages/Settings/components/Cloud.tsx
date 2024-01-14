import { useTheme } from '@react-navigation/native';
import React, { useCallback, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../../shared/lib/providers/AuthProvider';
import Title from '../../../shared/ui/Title/Title';

import CloudModal from './CloudModal';

import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';
import type { FC } from 'react';

const Cloud: FC = () => {
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const { isGuest } = useContext(AuthContext);

  const refCloudModal = useRef<ModalRefProps>(null);

  const setCloudModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refCloudModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refCloudModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const cloudModalModalVisible = refCloudModal.current?.modalVisible;

  return (
    <View>
      <Title>{t('settings.cloudTitle')}</Title>
      {isGuest ? (
        <Text style={{ color: colors.red, marginBottom: 10, fontSize: 16 }}>
          {t('settings.cloudWarning')}
        </Text>
      ) : (
        <></>
      )}
      <View>
        {/* <TouchableOpacity
          disabled={isGuest}
          style={[styles.button, { backgroundColor: !isGuest ? colors.info : colors.gray }]}
          onPress={async () => loadAppData()}>
          <Ionicons name='cloud-download' size={30} />
          <Text style={[styles.buttonText, { color: colors.themeColor }]}>
            {t('settings.downloadData')}
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          disabled={isGuest}
          style={[styles.button, { backgroundColor: !isGuest ? colors.success : colors.gray }]}
          onPress={async () => {
            await deleteData(uid);
            await fetchData(uid, category, count, target);
          }}>
          <Ionicons name='cloud-upload' size={30} />
          <Text style={[styles.buttonText, { color: colors.themeColor }]}>
            {t('settings.saveData')}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          disabled={isGuest}
          style={[styles.button, { backgroundColor: !isGuest ? colors.red : colors.gray }]}
          onPress={async () => setCloudModalVisible(true)}>
          <Ionicons name='trash' size={30} />
          <Text style={[styles.buttonText, { color: colors.themeColor }]}>
            {t('settings.deleteData')}
          </Text>
        </TouchableOpacity>
      </View>

      <CloudModal
        refModal={refCloudModal}
        modalVisible={cloudModalModalVisible}
        setModalVisible={setCloudModalVisible}
      />
    </View>
  );
};

export default Cloud;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
    marginLeft: 5,
  },
});
