import { useTheme } from '@react-navigation/native';

import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from '../../../../modules/BottomSheet/BottomSheet';
import { monthsShortUA, monthsUA } from '../../../../shared/config/moment/months';
import { weekdaysShortUA, weekdaysUA } from '../../../../shared/config/moment/weekdays';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { sortByCurrentMonth } from '../../lib/helpers/getByCurrentMonth';
import { getPercantageForCategory } from '../../lib/helpers/getPercent';
import Category from '../Category/Category';

import MonthCategory from '../MonthCategory/MonthCategory';

import type { BottomSheetRefProps } from '../../../../modules/BottomSheet/BottomSheet';
import type { IMonthsCategory } from '../../lib/types/interfaces';
import type { FC } from 'react';

const Chart: FC = () => {
  const colors = useTheme().colors;
  const { height } = useWindowDimensions();
  const { category, count } = useTypedSelector((state) => state);
  const [categoryID, setCategoryID] = useState<string>('');
  const { i18n } = useTranslation();

  const [sortedByCurrentMonth, setSortedByCurrentMonth] = useState<IMonthsCategory>({
    month: '',
    income: 0,
    actions: [],
  });

  const categoryBottomSheetRef = useRef<BottomSheetRefProps>(null);

  const handleOpenCategory = useCallback((index: string) => {
    setCategoryID(index);
    categoryBottomSheetRef.current!.expand();
  }, []);

  const handleCategoryClose = useCallback(() => {
    categoryBottomSheetRef.current!.close();
  }, []);

  useEffect(() => {
    if (i18n.language == 'uk') {
      moment.updateLocale('uk', {
        months: monthsUA,
        monthsShort: monthsShortUA,
        weekdays: weekdaysUA,
        weekdaysShort: weekdaysShortUA,
      });
      moment().locale('uk');
    } else {
      moment().locale('en');
    }
    const currMonth = sortByCurrentMonth(category, count);
    setSortedByCurrentMonth(...currMonth);
  }, [category]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.main, { backgroundColor: colors.themeColor }]}>
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
          <Category categoryID={categoryID} handleCategoryClose={handleCategoryClose} />
        </BottomSheet>
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