import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { IMonthsCategory } from '../../../Chart/lib/types/interfaces';
import type { FC } from 'react';

type AnalyticMonthItemProps = {
  month: IMonthsCategory;
};

const AnalyticMonthItem: FC<AnalyticMonthItemProps> = ({ month }) => {
  const colors = useTheme().colors;

  return (
    <View
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
          {moment(month.month).format('MMMM YYYY')}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.itemTitle, { color: colors.success }]}>{month.income} | </Text>
          <Text style={[styles.itemTitle, { color: colors.red }]}>
            {month.actions.map((item) => item.amount).reduce((a, b) => a + b, 0)}
          </Text>
        </View>
      </View>
      {month.actions.map((action, index) =>
        action.amount > 0 ? (
          <View key={action.index} style={{ padding: 5 }}>
            <Text style={{ color: colors.textColor }}>
              - {action.title} {action.amount}
            </Text>
          </View>
        ) : (
          <View key={index}></View>
        )
      )}
    </View>
  );
};

export default AnalyticMonthItem;

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
