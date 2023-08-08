import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View, ActivityIndicator } from 'react-native';

import Pie from 'react-native-pie';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import { getCoordinatesForIndex } from '../../lib/helpers/getCoordinates';

import { getCurrentMonthName } from '../../lib/helpers/getCurrentMonthName';

import { addNewCategory } from '../../lib/store/categorySlice';

import CategoryCircle from '../CategoryCircle/CategoryCircle';

import CategoryCircleSkeleton from '../CategoryCircleSkeleton/CategoryCircleSkeleton';

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
  const authContext = useContext(AuthContext);
  const categoryLoading = useTypedSelector((state) => state.category.loading);

  const currentMonth = moment().format('YYYY-MM');
  const { i18n } = useTranslation();

  const [isCategoryDelete, setIsCategoryDelete] = useState(false);

  const monthTitleEN = moment(date).format('MMMM YYYY');
  const monthTitleUA = `${getCurrentMonthName(moment(date).month())} ${moment(date).format(
    'YYYY'
  )}`;

  const dispatch = useAppDispatch();

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.textColor }]}>
          {i18n.language == 'uk' ? monthTitleUA : monthTitleEN}
        </Text>
      </View>
      <View style={styles.chart}>
        <Pie radius={100} innerRadius={70} sections={data} strokeCap={'butt'} />
        {!categoryLoading ? (
          <View style={[styles.categoriesCircle]}>
            {actions.map((item, index) => {
              const { x, y } = getCoordinatesForIndex(-index + 1, actions.length);

              return item ? (
                <CategoryCircle
                  key={index}
                  categoryIndex={item.index}
                  color={item.color}
                  icon={item.icon}
                  handleOpenCategory={handleOpenCategory}
                  setIsCategoryDelete={setIsCategoryDelete}
                  x={x}
                  y={y}
                  amount={item.amount}
                />
              ) : (
                <></>
              );
            })}
            {isCategoryDelete || currentMonth !== date ? (
              <View
                style={[
                  styles.addItemCircle,
                  {
                    borderWidth: 0,
                  },
                ]}>
                <Pressable>
                  <Ionicons name={'trash'} size={35} color={colors.red} />
                </Pressable>
              </View>
            ) : (
              <View style={[styles.addItemCircle, { borderColor: colors.textColor }]}>
                <Pressable onPress={() => dispatch(addNewCategory(authContext.uid))}>
                  <Ionicons name={'add-outline'} size={35} color={colors.textColor} />
                </Pressable>
              </View>
            )}
          </View>
        ) : (
          <View style={[styles.categoriesCircle]}>
            {[1, 2, 3, 4, 5].map((_, index) => {
              const { x, y } = getCoordinatesForIndex(-index + 1, 5);

              return <CategoryCircleSkeleton key={index} x={x} y={y} />;
            })}
            <View style={[styles.addItemCircle, { borderWidth: 0 }]}>
              <ActivityIndicator size='large' color={colors.textColor} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MonthCategory;
