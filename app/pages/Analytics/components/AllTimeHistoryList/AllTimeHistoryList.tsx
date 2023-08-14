import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { getCurrentMonthName } from '../../../Chart/lib/helpers/getCurrentMonthName';

import type { IMonthsCategory } from '../../../Chart/lib/types/interfaces';
import type { FC } from 'react';

type AllTimeHistoryListProps = {
  allTimeHistory: IMonthsCategory[];
};

const AllTimeHistoryList: FC<AllTimeHistoryListProps> = ({ allTimeHistory }) => {
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
            <View
              key={index}
              style={{
                backgroundColor: colors.contrastColor,
                marginBottom: 20,
                borderRadius: 5,
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
              {month.actions.map((action, index) =>
                action.amount > 0 ? (
                  <View key={action.index} style={{ padding: 5, marginVertical: 5 }}>
                    <Text
                      style={{
                        color: colors.textColor,
                        fontSize: 16,
                        fontFamily: 'NotoSans-Regular',
                      }}>
                      - {action.title} {action.amount}
                    </Text>
                  </View>
                ) : (
                  <View key={index}></View>
                )
              )}
            </View>
          );
        })
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
    </>
  );
};

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