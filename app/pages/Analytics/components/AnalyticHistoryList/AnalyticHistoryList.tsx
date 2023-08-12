import { useTheme } from '@react-navigation/native';
import moment from 'moment';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import Title from '../../../../shared/ui/Title/Title';
import { getCurrentWeekendhName } from '../../../Chart/lib/helpers/getCurrentWeekendName';
import { sortByMonths } from '../../../Chart/lib/helpers/sortByMonths';
import { getHistory } from '../../lib/helpers/getHistory';
import { groupByDate } from '../../lib/helpers/groupByDate';
import AnalyticHistoryItem from '../AnalyticHistoryItem/AnalyticHistoryItem';

import AnalyticMonthItem from '../AnalyticMonthItem/AnalyticMonthItem';

import type { IMonthsCategory } from '../../../Chart/lib/types/interfaces';
import type { FC } from 'react';

const AnalyticHistoryList: FC = () => {
  const category = useTypedSelector((state) => state.category.data);
  const count = useTypedSelector((state) => state.count.data);
  const history = groupByDate(getHistory(category));
  const colors = useTheme().colors;
  const [toggle, setToggle] = useState(false);
  const { i18n, t } = useTranslation();

  const [sortedOutcomes, setSortedOutcomes] = useState<IMonthsCategory[]>([]);

  useEffect(() => {
    const sortCategories = sortByMonths(category, count).reverse();
    setSortedOutcomes(sortCategories);
  }, [category, count]);

  return (
    <View style={[styles.container, { paddingLeft: 25 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>{t('thirdScreen.historyTitle')}</Title>
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
      {history.length > 0 ? (
        <ScrollView style={styles.historiesContainer}>
          {toggle
            ? sortedOutcomes.map((month, index) => <AnalyticMonthItem key={index} month={month} />)
            : history.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.historyItem,
                    { backgroundColor: colors.contrastColor, borderRadius: 5 },
                  ]}>
                  <View style={{ backgroundColor: colors.textColor, padding: 10, borderRadius: 5 }}>
                    <Text style={[styles.historyTitle, { color: colors.themeColor }]}>
                      {i18n.language == 'uk'
                        ? `${getCurrentWeekendhName(moment(item.date).isoWeekday())} - ${moment(
                            item.date
                          ).format('DD.MM.YYYY')}`
                        : moment(item.date).format('dddd - DD MM YYYY')}
                    </Text>
                  </View>
                  <AnalyticHistoryItem values={item.values} />
                </View>
              ))}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.historiesContainer,
            { backgroundColor: colors.contrastColor, borderRadius: 5 },
          ]}>
          <View style={{ backgroundColor: colors.textColor, padding: 10, borderRadius: 5 }}>
            <Text style={[styles.historyTitle, { color: colors.themeColor }]}>
              {t('thirdScreen.noHistoryMessage')}
            </Text>
          </View>
        </View>
      )}
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
    fontFamily: 'NotoSans-SemiBold',
  },
  historyItem: {
    marginBottom: 20,
    borderRadius: 5,
  },
});
