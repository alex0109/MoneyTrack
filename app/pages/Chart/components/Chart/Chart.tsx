import { useTheme } from '@react-navigation/native';

import Analytics from 'appcenter-analytics';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BackHandler, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from '../../../../modules/BottomSheet/BottomSheet';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import BackModal from '../../../../shared/ui/BackModal/BackModal';
import { sortByCurrentMonth } from '../../lib/helpers/getByCurrentMonth';
import { getPercantageForCategory } from '../../lib/helpers/getPercent';
import Category from '../Category/Category';

import MonthCategory from '../MonthCategory/MonthCategory';

import type { BottomSheetRefProps } from '../../../../modules/BottomSheet/BottomSheet';
import type { ModalRefProps } from '../../../../shared/ui/Modal/Modal';
import type { IMonthsCategory } from '../../lib/types/interfaces';
import type { FC } from 'react';

const Chart: FC = () => {
  const colors = useTheme().colors;
  const { height } = useWindowDimensions();
  const category = useTypedSelector((state) => state.category.data);
  const count = useTypedSelector((state) => state.count.data);
  const [categoryID, setCategoryID] = useState<string>('');

  const [sortedByCurrentMonth, setSortedByCurrentMonth] = useState<IMonthsCategory>({
    month: '',
    income: 0,
    actions: [],
  });

  const categoryBottomSheetRef = useRef<BottomSheetRefProps>(null);

  const refBackModal = useRef<ModalRefProps>(null);

  const setBackModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refBackModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refBackModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const backModalVisible = refBackModal.current?.modalVisible;

  const handleOpenCategory = useCallback((index: string) => {
    setCategoryID(index);
    categoryBottomSheetRef.current!.expand();
  }, []);

  useEffect(() => {
    void Analytics.trackEvent('Chart opened');

    const currMonth = sortByCurrentMonth(category, count);
    setSortedByCurrentMonth(...currMonth);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setBackModalVisible(true);
      return true;
    });

    return () => backHandler.remove();
  }, [category, count]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.main]}>
        <MonthCategory
          date={sortedByCurrentMonth.month}
          actions={sortedByCurrentMonth.actions}
          data={getPercantageForCategory(sortedByCurrentMonth.actions)}
          handleOpenCategory={handleOpenCategory}
        />
        <BottomSheet
          ref={categoryBottomSheetRef}
          activeHeight={height}
          backgroundColor={colors.themeColor}
          backDropColor={'black'}>
          <Category categoryID={categoryID} />
        </BottomSheet>
        <BackModal
          refModal={refBackModal}
          modalVisible={backModalVisible}
          setModalVisible={setBackModalVisible}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Chart;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 2,
  },
  addItemCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 45,
    width: 45,
    borderRadius: 40,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
});
