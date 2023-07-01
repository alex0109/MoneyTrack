import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AlternativeKeyboard from '../../../../modules/Calculator/AlternativeKeyboard';
import { useActions } from '../../../../shared/lib/hooks/useActions';

import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';

import { validateTitle } from '../../../../shared/lib/utils/titleFormValidate';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import { colorsArray, iconsArray } from '../../lib/store/propertires';

import { styles } from './Category.styles';

import type { ICategory } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface CategoryProps {
  categoryID: string;

  handleCategoryClose: () => void;
}

const Category: FC<CategoryProps> = ({ categoryID, handleCategoryClose }) => {
  const colors = useTheme().colors;
  const {
    handleChangeCountCategory,
    handleChangeCategoryTitle,
    handleDeleteCategory,
    handleChangeCategoryColor,
    handleChangeCategoryIcon,
  } = useActions();
  const { category } = useTypedSelector((state) => state);
  const [toggleCustomisation, setToggleCustomisation] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  const changeTitleHandler = (title: string) => {
    if (validateTitle(title)) {
      handleChangeCategoryTitle({ index: matchedCategory?.index, title: title });
    }
  };

  const changeValueHandler = (value: string) => {
    if (validateValue(value)) {
      handleChangeCountCategory({ index: matchedCategory?.index, count: +value });
    }
  };

  const deleteCategoryHandler = (index: string) => {
    handleCategoryClose();
    handleDeleteCategory({ index: index });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: matchedCategory?.color }]}>
      <View style={[styles.header, { backgroundColor: matchedCategory?.color }]}>
        <TextInput
          style={[styles.title, { color: colors.themeColor }]}
          defaultValue={matchedCategory?.title}
          onChangeText={(enteredText) => changeTitleHandler(enteredText)}
          placeholder={t('global.placeholderTitle')!}
          placeholderTextColor={colors.themeColor}
        />
        <TextInput
          style={[styles.title, { color: colors.themeColor }]}
          defaultValue={matchedCategory?.count.toString()}
          onChangeText={(enteredText) => changeValueHandler(enteredText)}
          keyboardType='numeric'
          placeholder={t('global.placeholderValue')!}
          placeholderTextColor={colors.themeColor}
        />
      </View>
      <View style={[styles.content, { backgroundColor: colors.themeColor }]}>
        {toggleCustomisation ? (
          <View>
            <ScrollView
              horizontal={true}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflow: 'hidden',
              }}>
              {colorsArray.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChangeCategoryColor({ index: categoryID, color: color })}
                  style={{
                    backgroundColor: color,
                    height: 40,
                    width: 40,
                    borderRadius: 30,
                    margin: 8,
                    borderWidth: color == matchedCategory.color ? 4 : 0,
                    borderColor: colors.textColor,
                  }}></TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {iconsArray.map((icon, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChangeCategoryIcon({ index: categoryID, icon: icon })}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    width: 40,
                    borderRadius: 30,
                    margin: 10,
                    backgroundColor:
                      icon == matchedCategory.icon ? colors.warning : colors.themeColor,
                  }}>
                  <Ionicons size={35} name={icon} color={colors.textColor} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <AlternativeKeyboard categoryID={categoryID} />
        )}

        <View style={[styles.belt]}>
          <TouchableOpacity onPress={() => deleteCategoryHandler(categoryID)}>
            <Ionicons name='trash' size={35} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setToggleCustomisation((toggle) => !toggle)}>
            {toggleCustomisation ? (
              <Ionicons name='calculator' size={35} color={colors.textColor} />
            ) : (
              <Ionicons name='brush' size={35} color={colors.textColor} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Category;
