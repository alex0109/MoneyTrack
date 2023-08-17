import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';

import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import CountModal from '../CountModal/CountModal';

import { styles } from './CountBottomSheet.styles';

import type { ModalRefProps } from '../../../../shared/ui/Modal/Modal';
import type { ICount } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface CountBottomSheetProps {
  countID: string;
  handleCountClose: () => void;
}
const CountBottomSheet: FC<CountBottomSheetProps> = ({ handleCountClose, countID }) => {
  const colors = useTheme().colors;
  const { deleteCount } = useActions();

  const { count } = useTypedSelector((state) => state);
  const navigation = useNavigation();

  const findModalPropByID = (index: string): ICount => {
    {
      const item: ICount | undefined = count.find((item: ICount) => item.index === index);

      if (item == undefined) {
        return {
          title: '',
          value: 0,
          index: '0',
          history: [],
        };
      }

      return { ...item };
    }
  };

  const countElement = findModalPropByID(countID);

  const refCountModal = useRef<ModalRefProps>(null);

  const setCountModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refCountModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refCountModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const countModalVisible = refCountModal.current?.modalVisible;

  const removeCountHandler = (index: string): void => {
    handleCountClose();
    deleteCount({ index: index });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.info }]}>
      <View style={[styles.header, { backgroundColor: colors.info }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CountEditStack', { countID: countID })}>
          <Text style={[styles.title, { color: colors.themeColor }]}>{countElement.title}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.content, { backgroundColor: colors.themeColor }]}>
        <View style={[styles.belt]}>
          <TouchableOpacity onPress={() => removeCountHandler(countID)}>
            <Ionicons name='trash' size={35} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CountEditStack', { countID: countID })}>
            <Ionicons name='md-construct' size={35} color={colors.textColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCountModalVisible(true)}>
            <Ionicons name='add-outline' size={35} color={colors.textColor} />
          </TouchableOpacity>
        </View>
        <CountModal
          countElementIndex={countElement.index}
          refModal={refCountModal}
          modalVisible={countModalVisible}
          setModalVisible={setCountModalVisible}
        />
      </View>
    </View>
  );
};

export default CountBottomSheet;
