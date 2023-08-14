import { useTheme } from '@react-navigation/native';

import React, { useContext, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import { deleteCategoryHistory } from '../../../Chart/lib/store/categorySlice';

import type { IDateGroupItem } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface MonthHistoryItemProps {
  dayValues: IDateGroupItem;
}

const MonthHistoryItem: FC<MonthHistoryItemProps> = ({ dayValues }) => {
  const colors = useTheme().colors;
  //   const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  // const dispatch = useAppDispatch();
  // const { uid } = useContext(AuthContext);

  return (
    <View
      key={dayValues.index}
      style={[
        styles.item,
        { backgroundColor: colors.contrastColor, borderColor: colors.textColor },
      ]}>
      <TouchableOpacity onPress={() => setIsCollapsed((state) => !state)}>
        <Text style={[styles.categoryTitle, { color: colors.textColor }]}>
          {dayValues.title} ({dayValues.value})
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <Text style={[styles.categoryText, { color: colors.textColor }]}>
          {dayValues.note ? dayValues.note : 'no notes'}
        </Text>
        {/* <TouchableOpacity onPress={() => dispatch(deleteCategoryHistory({ uid, categoryID: '' }))}>
          <Text style={[styles.categoryText, { color: colors.red }]}>Delete history</Text>
        </TouchableOpacity> */}
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
