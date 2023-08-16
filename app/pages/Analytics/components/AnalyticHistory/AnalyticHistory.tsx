import { useTheme } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import Title from '../../../../shared/ui/Title/Title';

import { sortByMonths } from '../../../Chart/lib/helpers/sortByMonths';
import { getHistory } from '../../lib/helpers/getHistory';
import { groupByDate } from '../../lib/helpers/groupByDate';
import AllTimeHistoryList from '../AllTimeHistoryList/AllTimeHistoryList';
import MonthHistoryList from '../MonthHistoryList/MonthHistoryList';

import type { IMonthsCategory } from '../../../Chart/lib/types/interfaces';
import type { FC } from 'react';

const AnalyticHistory: FC = () => {
  const category = useTypedSelector((state) => state.category.data);
  const count = useTypedSelector((state) => state.count.data);
  const oneMonthHistory = groupByDate(getHistory(category));
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);

  const [allTimeHistory, setAllTimeHistory] = useState<IMonthsCategory[]>([]);

  useEffect(() => {
    const sortCategories = sortByMonths(category, count).reverse();
    setAllTimeHistory(sortCategories);
  }, [category, count]);

  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ paddingLeft: 25 }}>
          <Title>{t('thirdScreen.historyTitle')}</Title>
        </View>
        <TouchableOpacity
          style={{
            marginRight: 25,
            paddingHorizontal: 5,
            paddingBottom: 5,
            backgroundColor: colors.textColor,
            borderRadius: 10,
          }}
          onPress={() => setToggle(!toggle)}>
          <Text style={{ color: colors.info, fontFamily: 'NotoSans-SemiBold', fontSize: 16 }}>
            {!toggle ? t('thirdScreen.monthHistoryButton') : t('thirdScreen.fullHistoryButton')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.historiesContainer}>
        {toggle ? (
          <AllTimeHistoryList allTimeHistory={allTimeHistory} />
        ) : (
          <MonthHistoryList oneMonthHistory={oneMonthHistory} />
        )}
      </ScrollView>
    </View>
  );
};

export default AnalyticHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  historiesContainer: {
    marginHorizontal: 25,
  },
});
