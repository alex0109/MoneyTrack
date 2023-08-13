import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { IDateGroupItem } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface AnalyticHistoryItemProps {
  values: IDateGroupItem[];
}

const AnalyticHistoryItem: FC<AnalyticHistoryItemProps> = ({ values }) => {
  const colros = useTheme().colors;

  return (
    <>
      {values.map((item, index) => (
        <View key={index} style={[styles.item, { backgroundColor: colros.contrastColor }]}>
          <Text style={[styles.category, { color: colros.textColor }]}>
            - {item.title} {item.value}
          </Text>
        </View>
      ))}
    </>
  );
};

export default AnalyticHistoryItem;

const styles = StyleSheet.create({
  item: {
    marginVertical: 5,
    padding: 5,
  },
  category: {
    fontSize: 16,
    fontFamily: 'NotoSans-Regular',
  },
});
