import { useNavigation, useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';

import CategorySpendForm from './CategorySpendForm';

import type { IHistory } from '../../Analytics/lib/types/interfaces';
import type { ICategory, ICategoryWithHistory } from '../lib/types/interfaces';
import type { FC } from 'react';

const { height } = Dimensions.get('window');

interface CategoryProps {
  categoryID: string;
}

const Category: FC<CategoryProps> = ({ categoryID }) => {
  const colors = useTheme().colors;
  const { category, history } = useTypedSelector((state) => state);
  const navigation = useNavigation();

  const findModalPropByID = useCallback(
    (index: string): ICategoryWithHistory => {
      const item: ICategory | undefined = category.find((item: ICategory) => item.index === index);
      const thisCategoryHistory: IHistory[] = history.categories.filter(
        (item) =>
          item.originalID === categoryID &&
          moment(item.date).format('YYYY-MM') === moment().format('YYYY-MM')
      );

      if (item == undefined) {
        return {
          index: '0',
          title: 'Tests',
          count: 0,
          icon: 'flask',
          color: '#fff',
          percent: 0,
          history: [],
        };
      }

      return { ...item, history: thisCategoryHistory };
    },
    [history, categoryID]
  );

  const matchedCategory = findModalPropByID(categoryID);

  const currentAmount = useMemo(
    () => matchedCategory.history.reduce((a, b) => a + b.value, 0),
    [history, categoryID]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: matchedCategory?.color }]}>
      <View style={[styles.header, { backgroundColor: matchedCategory?.color }]}>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoryEditStack', { categoryID: categoryID })}>
            <Ionicons name='brush' size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoryEditStack', { categoryID: categoryID })}>
            <Text style={[styles.title, { color: colors.themeColor }]}>
              {matchedCategory.title}
            </Text>
            <Text style={[styles.title, { color: colors.themeColor }]}>{currentAmount}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CategorySpendForm categoryID={categoryID} title={matchedCategory.title} />
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: height * 0.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans-Bold',
    textAlign: 'center',
  },
});
