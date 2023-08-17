import { useTheme } from '@react-navigation/native';

import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import Animated, { FadeIn } from 'react-native-reanimated';

import { getCurrentWeekendhName } from '../../Chart/lib/helpers/getCurrentWeekendName';

import MonthHistoryItem from './MonthHistoryItem';

import type { IDateGroupes } from '../lib/types/interfaces';
import type { FC } from 'react';

interface MonthHistoryListProps {
  oneMonthHistory: IDateGroupes[];
}

const MonthHistoryList: FC<MonthHistoryListProps> = ({ oneMonthHistory }) => {
  const colors = useTheme().colors;
  const { i18n, t } = useTranslation();

  return (
    <>
      {oneMonthHistory.length > 0 ? (
        oneMonthHistory.map((day, index) => (
          <Animated.View
            key={index}
            entering={FadeIn}
            style={[
              styles.historyItem,
              { backgroundColor: colors.contrastColor, borderRadius: 5 },
            ]}>
            <View style={{ backgroundColor: colors.textColor, padding: 10, borderRadius: 5 }}>
              <Text style={[styles.historyTitle, { color: colors.themeColor }]}>
                {i18n.language == 'uk'
                  ? `${getCurrentWeekendhName(moment(day.date).isoWeekday())} - ${moment(
                      day.date
                    ).format('DD.MM.YYYY')}`
                  : moment(day.date).format('dddd - DD.MM.YYYY')}
              </Text>
            </View>
            {day.values.map((item) => (
              <MonthHistoryItem key={item.index} dayValues={item} />
            ))}
          </Animated.View>
        ))
      ) : (
        <Animated.View
          entering={FadeIn}
          style={[
            styles.historiesContainer,
            { backgroundColor: colors.contrastColor, borderRadius: 5 },
          ]}>
          <View style={{ backgroundColor: colors.textColor, padding: 10, borderRadius: 5 }}>
            <Text style={[styles.historyTitle, { color: colors.themeColor }]}>
              {t('thirdScreen.noHistoryMessage')}
            </Text>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default MonthHistoryList;

const styles = StyleSheet.create({
  historiesContainer: {
    marginHorizontal: 25,
  },
  historyItem: {
    paddingBottom: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
  },
});
