import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { getCurrentMonthName } from '../../Chart/lib/helpers/getCurrentMonthName';

import AllTimeHistoryListItem from './AllTimeHistoryListItem';

import type { IMonthsCategory } from '../../Chart/lib/types/interfaces';

type AllTimeHistoryListProps = {
  allTimeHistory: IMonthsCategory[];
};

const AllTimeHistoryList = memo<AllTimeHistoryListProps>(({ allTimeHistory }) => {
  const colors = useTheme().colors;
  const { i18n, t } = useTranslation();

  return (
    <>
      {allTimeHistory.length > 0 ? (
        allTimeHistory.map((month, index) => {
          const monthTitleEN = moment(month.month).format('MMMM YYYY');
          const monthTitleUA = `${getCurrentMonthName(moment(month.month).month())} ${moment(
            month.month
          ).format('YYYY')}`;
          return (
            <Animated.View
              key={index}
              entering={FadeIn}
              style={{
                backgroundColor: colors.contrastColor,
                marginBottom: 20,
                borderRadius: 5,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  backgroundColor: colors.textColor,
                  padding: 10,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.itemTitle, { color: colors.themeColor }]}>
                  {i18n.language == 'uk' ? monthTitleUA : monthTitleEN}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.itemTitle, { color: colors.success }]}>
                    {month.income} |{' '}
                  </Text>
                  <Text style={[styles.itemTitle, { color: colors.red }]}>
                    {month.actions.map((item) => item.amount).reduce((a, b) => a + b, 0)}
                  </Text>
                </View>
              </View>
              {month.actions.map((action) =>
                action.amount > 0 ? (
                  <AllTimeHistoryListItem
                    key={action.index}
                    title={action.title}
                    amount={action.amount}
                    history={action.history}
                  />
                ) : null
              )}
            </Animated.View>
          );
        })
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
  itemTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
  },
});
