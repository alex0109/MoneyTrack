import { useTheme } from '@react-navigation/native';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';
import Title from '../../../shared/ui/Title/Title';

import { combineByDate } from '../lib/helpers/combineByDate';
import { sortByMonths } from '../lib/helpers/sortByMonths';

import AllTimeHistoryList from './AllTimeHistoryList';
import MonthHistoryList from './MonthHistoryList';

import type { IDateGroupes, IMonthsCategory } from '../lib/types/interfaces';
import type { FC } from 'react';

const AnalyticHistory: FC = () => {
  const { category, history } = useTypedSelector((state) => state);
  const { count } = useTypedSelector((state) => state);
  const [oneMonthHistory, setOneMonthHistory] = useState<IDateGroupes[]>([]);
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);

  const [allTimeHistory, setAllTimeHistory] = useState<IMonthsCategory[]>([]);

  const oneMonth = useMemo(() => combineByDate(history), [history]);
  const sortCategories = useMemo(() => sortByMonths(history).reverse(), [category, count]);

  useEffect(() => {
    setAllTimeHistory(sortCategories);
    setOneMonthHistory(oneMonth);
  }, [history, count]);

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
