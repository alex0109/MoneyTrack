import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Animated, { FadeIn } from 'react-native-reanimated';

import { getCurrentMonthName } from '../../Chart/lib/helpers/getCurrentMonthName';

import AllTimeHistoryListItem from './AllTimeHistoryListItem';

import type { IAction } from '../../Chart/lib/types/interfaces';

interface AllTimeHistoryListMonthItemProps {
  month: string;
  income: number;
  actions: IAction[];
}

const AllTimeHistoryListMonthItem = memo<AllTimeHistoryListMonthItemProps>(
  ({ month, income, actions }) => {
    const colors = useTheme().colors;
    const { i18n } = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const monthTitleEN = moment(month).format('MMMM YYYY');
    const monthTitleUA = `${getCurrentMonthName(moment(month).month())} ${moment(month).format(
      'YYYY'
    )}`;
    return (
      <Animated.View
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
          <TouchableOpacity onPress={() => setIsCollapsed((state) => !state)}>
            <Text style={[styles.itemTitle, { color: colors.themeColor }]}>
              {i18n.language == 'uk' ? monthTitleUA : monthTitleEN}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.itemTitle, { color: colors.success }]}>{income} | </Text>
            <Text style={[styles.itemTitle, { color: colors.red }]}>
              {actions.map((item) => item.amount).reduce((a, b) => a + b, 0)}
            </Text>
          </View>
        </View>
        <Collapsible collapsed={isCollapsed}>
          {actions.map((action) =>
            action.amount > 0 ? (
              <AllTimeHistoryListItem
                key={action.index}
                title={action.title}
                amount={action.amount}
                history={action.history}
              />
            ) : null
          )}
        </Collapsible>
      </Animated.View>
    );
  }
);

AllTimeHistoryListMonthItem.displayName = 'AllTimeHistoryListMonthItem';

export default AllTimeHistoryListMonthItem;

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
  },
});
