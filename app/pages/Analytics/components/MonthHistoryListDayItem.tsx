import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Animated, { FadeIn } from 'react-native-reanimated';

import { getCurrentWeekendhName } from '../../Chart/lib/helpers/getCurrentWeekendName';

import MonthHistoryItem from './MonthHistoryItem';

import type { IDateGroupItem } from '../lib/types/interfaces';

import type { FC } from 'react';

interface MonthHistoryListDayItemProps {
  date: string;
  values: IDateGroupItem[];
}

const MonthHistoryListDayItem: FC<MonthHistoryListDayItemProps> = ({ date, values }) => {
  const colors = useTheme().colors;
  const { i18n } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Animated.View
      entering={FadeIn}
      style={[styles.historyItem, { backgroundColor: colors.contrastColor, borderRadius: 5 }]}>
      <View style={{ backgroundColor: colors.textColor, padding: 10, borderRadius: 5 }}>
        <TouchableOpacity onPress={() => setIsCollapsed((state) => !state)}>
          <Text style={[styles.historyTitle, { color: colors.themeColor }]}>
            {i18n.language == 'uk'
              ? `${getCurrentWeekendhName(moment(date).isoWeekday())} - ${moment(date).format(
                  'DD.MM.YYYY'
                )}`
              : moment(date).format('dddd - DD.MM.YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={isCollapsed}>
        {values.map((item) => (
          <MonthHistoryItem key={item.index} dayValues={item} />
        ))}
      </Collapsible>
    </Animated.View>
  );
};

export default MonthHistoryListDayItem;

const styles = StyleSheet.create({
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
