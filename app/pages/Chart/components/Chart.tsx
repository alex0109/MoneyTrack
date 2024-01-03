import { useTheme } from '@react-navigation/native';

import Analytics from 'appcenter-analytics';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { BackHandler, SafeAreaView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from '../../../modules/BottomSheet/BottomSheet';
import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';
import BackModal from '../../../shared/ui/BackModal/BackModal';
import { mapCategories } from '../lib/helpers/getByCurrentMonth';
import { getPercantageForCategory } from '../lib/helpers/getPercent';

import Category from './Category';

import MonthCategory from './MonthCategory';

import type { BottomSheetRefProps } from '../../../modules/BottomSheet/BottomSheet';
import type { ModalRefProps } from '../../../shared/ui/Modal/Modal';
import type { IMappedCategories } from '../lib/types/interfaces';
import type { FC } from 'react';

const Chart: FC = () => {
  const colors = useTheme().colors;
  const { height } = useWindowDimensions();
  const { category, history } = useTypedSelector((state) => state);
  const { count } = useTypedSelector((state) => state);
  const [categoryID, setCategoryID] = useState<string>('');

  const [sortedByCurrentMonth, setSortedByCurrentMonth] = useState<IMappedCategories>({
    month: '',
    total: 0,
    categories: [],
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

  const cachedMappedCategories = useMemo(
    () => mapCategories(category, history.categories),
    [category, count]
  );

  useEffect(() => {
    void Analytics.trackEvent('Chart opened');

    setSortedByCurrentMonth(cachedMappedCategories);

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
          categories={sortedByCurrentMonth.categories}
          data={getPercantageForCategory(sortedByCurrentMonth.categories)}
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
        <View />
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
