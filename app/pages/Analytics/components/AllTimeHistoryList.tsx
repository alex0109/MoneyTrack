import { useTheme } from '@react-navigation/native';

import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import AllTimeHistoryListMonthItem from './AllTimeHistoryListMonthItem';

import type { IMonthsCategory } from '../lib/types/interfaces';

type AllTimeHistoryListProps = {
  allTimeHistory: IMonthsCategory[];
};

const AllTimeHistoryList = memo<AllTimeHistoryListProps>(({ allTimeHistory }) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();

  return (
    <>
      {allTimeHistory.length > 0 ? (
        allTimeHistory.map((month, index) => (
          <AllTimeHistoryListMonthItem
            key={index}
            month={month.month}
            income={month.income}
            actions={month.actions}
          />
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
});

AllTimeHistoryList.displayName = 'AllTimeHistoryList';

export default AllTimeHistoryList;

const styles = StyleSheet.create({
  historiesContainer: {
    marginHorizontal: 25,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
  },
});
