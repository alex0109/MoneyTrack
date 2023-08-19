import { useTheme } from '@react-navigation/native';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import Animated, { FadeIn } from 'react-native-reanimated';

import MonthHistoryListDayItem from './MonthHistoryListDayItem';

import type { IDateGroupes } from '../lib/types/interfaces';
import type { FC } from 'react';

interface MonthHistoryListProps {
  oneMonthHistory: IDateGroupes[];
}

const MonthHistoryList: FC<MonthHistoryListProps> = ({ oneMonthHistory }) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();

  return (
    <>
      {oneMonthHistory.length > 0 ? (
        oneMonthHistory.map((day) => (
          <MonthHistoryListDayItem key={day.date} date={day.date} values={day.values} />
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

  historyTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
  },
});
