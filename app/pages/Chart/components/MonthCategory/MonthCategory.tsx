import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import Pie from 'react-native-pie';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';

import { getCoordinatesForIndex } from '../../lib/helpers/getCoordinates';

import { styles } from './MonthCategory.styles';

import type { IAction } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface MonthCategoryProps {
  date: string;
  actions: IAction[];
  data: { percentage: number; color: string }[];
  // eslint-disable-next-line no-unused-vars
  handleOpenCategory: (index: string) => void;
}

const MonthCategory: FC<MonthCategoryProps> = ({ date, actions, data, handleOpenCategory }) => {
  const colors = useTheme().colors;
  const { handleAddCategory } = useActions();

  const currentMonth = moment().format('YYYY-MM');

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.textColor }]}>
          {moment(date).format('MMMM YYYY')}
        </Text>
      </View>
      <View style={styles.chart}>
        <View style={{ flex: 1 }}>
          <Pie radius={100} innerRadius={70} sections={data} strokeCap={'butt'} />
        </View>
        <View style={[styles.categoriesCircle]}>
          {actions.map((item, index) => {
            const { x, y } = getCoordinatesForIndex(-index + 1, actions.length);

            return item ? (
              <View
                key={item.index}
                style={[styles.categoryItem, { left: x, top: y, backgroundColor: item.color }]}>
                <TouchableOpacity
                  onPress={() => handleOpenCategory(item.index)}
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name={item.icon} size={30} color={'white'} />
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    top: 45,
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: colors.textColor,
                    }}>
                    {item.amount}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            );
          })}
          {actions.length >= 10 || currentMonth !== date ? (
            <></>
          ) : (
            <View style={[styles.addItemCircle, { borderColor: colors.textColor }]}>
              <Pressable onPress={() => handleAddCategory()}>
                <Ionicons name={'add-outline'} size={35} color={colors.textColor} />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MonthCategory;
