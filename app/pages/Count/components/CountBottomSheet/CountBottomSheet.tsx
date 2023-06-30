import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { validateTitle } from '../../../../shared/lib/utils/titleFormValidate';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import CountModal from '../CountModal/CountModal';

import IncomeModal from '../IncomeModal/IncomeModal';

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
  const { handleDeleteCount, handleChangeCountTitle, handleChangeCount } = useActions();
  const { count } = useTypedSelector((state) => state);
  const { t } = useTranslation();

  const findModalPropByID = (index: string): ICount => {
    const item: ICount | undefined = count.find((item: ICount) => item.index === index);

    if (item == undefined) {
      return {
        title: '',
        value: 0,
        index: '0',
        monthIncome: {
          incomeDate: '',
          value: 0,
        },
        history: [],
      };
    }

    return { ...item };
  };

  const countElement = findModalPropByID(countID);

  const refCountModal = useRef<ModalRefProps>(null);
  const refMonthIncomeModal = useRef<ModalRefProps>(null);

  const setMonthIncomeModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refMonthIncomeModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refMonthIncomeModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const setCountModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refCountModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refCountModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const countModalVisible = refCountModal.current?.modalVisible;
  const monthIncomeModalVisible = refMonthIncomeModal.current?.modalVisible;

  const changeTitleHandler = (index: string, newTitle: string): void => {
    if (validateTitle(newTitle)) {
      handleChangeCountTitle({ index: index, title: newTitle });
    }
  };

  const countChangeHandler = (index: string, newValue: string): void => {
    if (validateValue(newValue)) {
      handleChangeCount({ index: index, value: +newValue });
    }
  };

  const removeCountHandler = (index: string): void => {
    handleCountClose();
    handleDeleteCount({ index: index });
  };

  return (
    <View style={[styles.container, { backgroundColor: 'green' }]}>
      <View style={[styles.header, { backgroundColor: 'green' }]}>
        <TextInput
          style={[styles.title, { color: colors.themeColor }]}
          defaultValue={countElement.title}
          onChangeText={(enteredText) => {
            changeTitleHandler(countElement.index, enteredText);
          }}
          placeholder={t('global.placeholderTitle')!}
          placeholderTextColor={colors.themeColor}
        />
        <TextInput
          style={[styles.subTitle, { color: colors.themeColor }]}
          defaultValue={countElement.value.toString()}
          onChangeText={(enteredText) => {
            countChangeHandler(countElement.index, enteredText);
          }}
          keyboardType='numeric'
          placeholder={t('global.placeholderValue')!}
          placeholderTextColor={colors.themeColor}
        />
      </View>
      <View style={[styles.content, { backgroundColor: colors.themeColor }]}>
        <View style={[styles.belt]}>
          <TouchableOpacity onPress={() => removeCountHandler(countID)}>
            <Ionicons name='trash' size={35} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMonthIncomeModalVisible(true)}>
            <Ionicons name='calendar' size={35} color={colors.textColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCountModalVisible(true)}>
            <Ionicons name='add-outline' size={35} color={colors.textColor} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={{ color: colors.textColor, fontSize: 20, fontWeight: '600' }}>
            {t('firstScreen.currentsIncome')} {countElement.monthIncome.value}
          </Text>
        </View>
        <CountModal
          countElementIndex={countElement.index}
          refModal={refCountModal}
          modalVisible={countModalVisible}
          setModalVisible={setCountModalVisible}
        />
        <IncomeModal
          countElementIndex={countElement.index}
          countMonthIncome={countElement.monthIncome.value}
          refModal={refMonthIncomeModal}
          modalVisible={monthIncomeModalVisible}
          setModalVisible={setMonthIncomeModalVisible}
        />
      </View>
    </View>
  );
};

export default CountBottomSheet;
