import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';

import CategorySpendForm from '../CategorySpendForm/CategorySpendForm';

import { styles } from './Category.styles';

import type { ICategory } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface CategoryProps {
  categoryID: string;
}

const Category: FC<CategoryProps> = ({ categoryID }) => {
  const colors = useTheme().colors;
  const category = useTypedSelector((state) => state.category.data);
  const navigation = useNavigation();

  const findModalPropByID = (index: string): ICategory => {
    const item: ICategory | undefined = category.find((item: ICategory) => item.index === index);

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

    return { ...item };
  };

  const matchedCategory = findModalPropByID(categoryID);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: matchedCategory?.color }]}>
      <View style={[styles.header, { backgroundColor: matchedCategory?.color }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryEditStack', { categoryID: categoryID })}>
          <Text style={[styles.title, { color: colors.themeColor }]}>{matchedCategory.title}</Text>
          <Text style={[styles.title, { color: colors.themeColor }]}>{matchedCategory.count}</Text>
        </TouchableOpacity>
      </View>
      <CategorySpendForm categoryID={categoryID} />
    </SafeAreaView>
  );
};

export default Category;
