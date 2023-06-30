import { useTheme } from '@react-navigation/native';
import moment from 'moment';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import Title from '../../../../shared/ui/Title/Title';
import { sortByMonths } from '../../../Chart/lib/helpers/sortByMonths';
import { getHistory } from '../../lib/helpers/getHistory';
import { groupByDate } from '../../lib/helpers/groupByDate';
import AnalyticHistoryItem from '../AnalyticHistoryItem/AnalyticHistoryItem';

import AnalyticMonthItem from '../AnalyticMonthItem/AnalyticMonthItem';

import type { IMonthsCategory } from '../../../Chart/lib/types/interfaces';
import type { FC } from 'react';

const AnalyticHistoryList: FC = () => {
  const { category, count } = useTypedSelector((state) => state);
  const history = groupByDate(getHistory(category));
  const colors = useTheme().colors;
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();

  const [sortedOutcomes, setSortedOutcomes] = useState<IMonthsCategory[]>([]);

  useEffect(() => {
    const sortCategories = sortByMonths(category, count).reverse();
    setSortedOutcomes(sortCategories);
  }, [category]);

  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>{t('thirdScreen.historyTitle')}</Title>
        <TouchableOpacity style={{ paddingRight: 25 }} onPress={() => setToggle(!toggle)}>
          <Text style={{ color: colors.info, fontWeight: '500', fontSize: 16 }}>
            {!toggle ? t('thirdScreen.monthHistoryButton') : t('thirdScreen.fullHistoryButton')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.historiesContainer}>
        {toggle ? (
          sortedOutcomes.map((month, index) => <AnalyticMonthItem key={index} month={month} />)
        ) : history.length == 0 ? (
          <View
            style={[
              styles.historyItem,
              { backgroundColor: colors.contrastColor, borderRadius: 5 },
            ]}>
            <View style={{ backgroundColor: colors.textColor, padding: 10, borderRadius: 5 }}>
              <Text style={[styles.historyTitle, { color: colors.themeColor }]}>
                {t('thirdScreen.noHistoryMessage')}
              </Text>
            </View>
          </View>
        ) : (
          history.map((item, index) => (
            <View
              key={index}
              style={[
                styles.historyItem,
                { backgroundColor: colors.contrastColor, borderRadius: 5 },
              ]}>
              <View style={{ backgroundColor: colors.textColor, padding: 10, borderRadius: 5 }}>
                <Text style={[styles.historyTitle, { color: colors.themeColor }]}>
                  {moment(item.date).format('dddd - MMM DD YYYY')}
                </Text>
              </View>
              <AnalyticHistoryItem values={item.values} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default AnalyticHistoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  historiesContainer: {
    marginHorizontal: 35,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  historyItem: {
    marginBottom: 20,
    borderRadius: 5,
  },
});
