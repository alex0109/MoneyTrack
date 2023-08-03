import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import { validateTitle } from '../../../../shared/lib/utils/titleFormValidate';
import StyledTextInput from '../../../../shared/ui/StyledTextInput/StyledTextInput';
import Title from '../../../../shared/ui/Title/Title';
import {
  changeCategoryColor,
  changeCategoryIcon,
  changeCategoryTitle,
} from '../../lib/store/categorySlice';
import { colorsArray, iconsArray } from '../../lib/store/propertires';

import type { ICategory } from '../../lib/types/interfaces';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const CategoryEdit: FC = ({ route }) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const category = useTypedSelector((state) => state.category.data);
  const { categoryID }: string = route.params;
  const [categoryTitleSubmitAvailable, setCategoryTitleSubmitAvailable] = useState(false);

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

  const [inputCategoryTitle, setInputCategoryTitle] = useState(matchedCategory.title);

  const onChangeCategoryTitleHandler = (input: string) => {
    setInputCategoryTitle(input);
    setCategoryTitleSubmitAvailable(true);
  };

  const changeCategoryTitleHandler = (title: string) => {
    if (validateTitle(title)) {
      dispatch(
        changeCategoryTitle({ uid: authContext.uid, categoryID: categoryID, categoryTitle: title })
      );
      setCategoryTitleSubmitAvailable(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label={t('secondScreen.categoryEditNameTitle')}
          color={matchedCategory.color}
          defaultValue={inputCategoryTitle}
          placeholder={t('global.placeholderTitle')}
          onChangeText={(input) => onChangeCategoryTitleHandler(input)}
          maxLength={16}
          keyboardType='default'
          submitDisable={categoryTitleSubmitAvailable}
          submitEditing={() => changeCategoryTitleHandler(inputCategoryTitle)}
        />
      </View>
      <Title>{t('secondScreen.categoryEditColorTitle')}</Title>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {colorsArray.map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              dispatch(
                changeCategoryColor({
                  uid: authContext.uid,
                  categoryID: categoryID,
                  categoryColor: color,
                })
              )
            }
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
      </View>
      <Title>{t('secondScreen.categoryEditIconTitle')}</Title>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {iconsArray.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              dispatch(
                changeCategoryIcon({
                  uid: authContext.uid,
                  categoryID: categoryID,
                  categoryIcon: icon,
                })
              )
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 50,
              borderRadius: 30,
              margin: 10,
              backgroundColor: icon == matchedCategory.icon ? colors.warning : colors.themeColor,
            }}>
            <Ionicons size={35} name={icon} color={colors.textColor} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
