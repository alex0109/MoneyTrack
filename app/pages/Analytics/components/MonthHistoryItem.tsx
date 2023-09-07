import { useTheme } from '@react-navigation/native';

import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { useActions } from '../../../shared/lib/hooks/useActions';

import type { IDateGroupItem } from '../lib/types/interfaces';
import type { FC } from 'react';

interface MonthHistoryItemProps {
  dayValues: IDateGroupItem;
}

const MonthHistoryItem: FC<MonthHistoryItemProps> = ({ dayValues }) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { decreaseCategoryCount, deleteCategoryHistory, topUpCountValue } = useActions();

  const onDeleteHistory = () => {
    topUpCountValue({
      index: dayValues.fromCount,
      value: dayValues.value,
    });
    decreaseCategoryCount({
      index: dayValues.categoryIndex,
      count: dayValues.value,
    });
    deleteCategoryHistory({
      index: dayValues.categoryIndex,
      historyIndex: dayValues.index,
    });
  };

  return (
    <View
      key={dayValues.index}
      style={[
        styles.item,
        { backgroundColor: colors.contrastColor, borderColor: colors.textColor },
      ]}>
      <TouchableOpacity
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        onPress={() => setIsCollapsed((state) => !state)}>
        <Text style={[styles.categoryTitle, { color: colors.textColor }]}>
          {dayValues.title} ({dayValues.value})
        </Text>
        <Text style={{ color: colors.gray }}>{moment(dayValues.date).format('HH:mm')}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {dayValues.note ? (
          <Text style={[styles.categoryText, { color: colors.textColor }]}>{dayValues.note}</Text>
        ) : (
          <Text style={[styles.categoryText, { color: colors.gray }]}>
            {t('thirdScreen.noNotesDescription')}
          </Text>
        )}
        <TouchableOpacity onPress={() => onDeleteHistory()}>
          <Text style={[styles.categoryText, { color: colors.red }]}>
            {t('thirdScreen.deleteHistoryButton')}
          </Text>
        </TouchableOpacity>
      </Collapsible>
    </View>
  );
};

export default MonthHistoryItem;

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans-SemiBold',
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'NotoSans-Regular',
  },
});
