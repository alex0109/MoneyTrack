import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';

import CategorySpendForm from './CategorySpendForm';

import type { ICategory } from '../lib/types/interfaces';
import type { FC } from 'react';

const { height } = Dimensions.get('window');

interface CategoryProps {
  categoryID: string;
}

const Category: FC<CategoryProps> = ({ categoryID }) => {
  const colors = useTheme().colors;
  const { category } = useTypedSelector((state) => state);
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
            <Text style={[styles.title, { color: colors.themeColor }]}>
              {matchedCategory.count}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CategorySpendForm categoryID={categoryID} />
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
