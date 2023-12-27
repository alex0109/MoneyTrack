import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { memo, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Collapsible from 'react-native-collapsible';

import type { IHistory } from '../lib/types/interfaces';

interface AllTimeHistoryListItemProps {
  title: string;
  amount: number;
  history: IHistory[];
}

const AllTimeHistoryListItem = memo<AllTimeHistoryListItemProps>(({ title, amount, history }) => {
  const colors = useTheme().colors;

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View style={[styles.historyItem, { borderColor: colors.textColor }]}>
      <TouchableOpacity onPress={() => setIsCollapsed((state) => !state)}>
        <Text
          style={{
            color: colors.textColor,
            fontSize: 18,
            fontFamily: 'NotoSans-SemiBold',
          }}>
          {title} {amount}
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {history.map((item) => (
          <View style={styles.note} key={item.index}>
            <Text style={{ marginBottom: 5, fontSize: 16, color: colors.textColor }}>
              <Text style={{ color: colors.red }}>{item.value}</Text>
              {' - '}
              {moment(item.date).format('DD.MM.YYYY')}
            </Text>
            {item.note ? (
              <Text
                style={{ paddingLeft: 5, color: colors.textColor, fontFamily: 'NotoSans-Italic' }}>
                {item.note}
              </Text>
            ) : null}
          </View>
        ))}
      </Collapsible>
    </View>
  );
});

AllTimeHistoryListItem.displayName = 'AllTimeHistoryListItem';

export default AllTimeHistoryListItem;

const styles = StyleSheet.create({
  historyItem: {
    padding: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1,
  },
  note: {
    marginTop: 5,
    paddingLeft: 10,
  },
});
