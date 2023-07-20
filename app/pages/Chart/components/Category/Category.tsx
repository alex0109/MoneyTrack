import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AlternativeKeyboard from '../../../../modules/Calculator/AlternativeKeyboard';
import { useActions } from '../../../../shared/lib/hooks/useActions';

import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';

import { styles } from './Category.styles';

import type { ICategory } from '../../lib/types/interfaces';
import type { FC } from 'react';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';

interface CategoryProps {
  categoryID: string;

  handleCategoryClose: () => void;
}

const Category: FC<CategoryProps> = ({ categoryID, handleCategoryClose }) => {
  const colors = useTheme().colors;
  const authContext = useContext(AuthContext);
  const { handleDeleteCategory } = useActions();
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

  const deleteCategoryHandler = (index: string) => {
    handleCategoryClose();
    handleDeleteCategory({ index: index });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: matchedCategory?.color }]}>
      <View style={[styles.header, { backgroundColor: matchedCategory?.color }]}>
        <Text style={[styles.title, { color: colors.themeColor }]}>{matchedCategory.title}</Text>
      </View>
      <View style={[styles.content, { backgroundColor: colors.themeColor }]}>
        <AlternativeKeyboard categoryID={categoryID} />
        <View style={[styles.belt]}>
          <TouchableOpacity onPress={() => deleteCategoryHandler(categoryID)}>
            <Ionicons name='trash' size={35} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoryEditStack', { categoryID: categoryID })}>
            <Ionicons name='md-construct' size={35} color={colors.textColor} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Category;
