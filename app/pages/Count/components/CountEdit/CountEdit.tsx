import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { AuthContext } from '../../../../shared/lib/providers/AuthProvider';
import { validateTitle } from '../../../../shared/lib/utils/titleFormValidate';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import StyledTextInput from '../../../../shared/ui/StyledTextInput/StyledTextInput';

import { changeCountTitle, changeCountValue } from '../../lib/store/countSlice';

import type { ICount } from '../../lib/types/interfaces';
import type { FC } from 'react';

const CountEdit: FC = ({ route }) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const { countID } = route.params;
  const count = useTypedSelector((state) => state.count.data);
  const dispatch = useAppDispatch();
  const authContext = useContext(AuthContext);
  const [titleSubmitDisable, setTitleSubmitDisable] = useState(false);
  const [countValueSubmitDisable, setCountValueSubmitDisable] = useState(false);

  const findModalPropByID = (index: string): ICount => {
    const item: ICount | undefined = count.find((item: ICount) => item.index === index);

    if (item == undefined) {
      return {
        title: '',
        value: 0,
        index: '0',
        history: [],
      };
    }

    return { ...item };
  };

  const countElement = findModalPropByID(countID);

  const [inputCountTitle, setInputCountTitle] = useState(countElement.title);
  const [inputCountValue, setInputCountValue] = useState(countElement.value);

  const onChangeCountNameHandler = (input: string) => {
    setInputCountTitle(input);
    setTitleSubmitDisable(true);
  };

  const onChnageCountValueHandler = (input: string) => {
    if (input.length > 0) {
      setInputCountValue(Number(input));
      setCountValueSubmitDisable(true);
    }
  };

  const changeCountTitleHandler = (newTitle: string): void => {
    if (validateTitle(newTitle)) {
      dispatch(changeCountTitle({ uid: authContext.uid, countID: countID, countTitle: newTitle }));
      setTitleSubmitDisable(false);
    }
  };

  const changeCountValueHandler = (newValue: number) => {
    if (validateValue(newValue)) {
      const historyValue: number = newValue - countElement.value;
      dispatch(
        changeCountValue({
          uid: authContext.uid,
          countID: countID,
          countValue: newValue,
          historyValue: historyValue,
        })
      );
      setCountValueSubmitDisable(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label={t('firstScreen.countEditNameTitle')}
          color={colors.warning}
          defaultValue={inputCountTitle}
          placeholder={t('global.placeholderTitle')}
          onChangeText={(input) => onChangeCountNameHandler(input)}
          maxLength={16}
          keyboardType='default'
          submitDisable={titleSubmitDisable}
          submitEditing={() => changeCountTitleHandler(inputCountTitle)}
        />
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label={t('firstScreen.countEditValueTitle')}
          color={colors.warning}
          defaultValue={`${inputCountValue}`}
          placeholder={t('global.placeholderValue')}
          onChangeText={(input) => onChnageCountValueHandler(input)}
          maxLength={9}
          keyboardType='numeric'
          submitDisable={countValueSubmitDisable}
          submitEditing={() => changeCountValueHandler(inputCountValue)}
        />
        <View style={{ width: '80%', marginTop: 5 }}>
          <Text style={{ color: colors.red, fontFamily: 'NotoSans-Regular' }}>
            {t('firstScreen.countEditValueWarning')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CountEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
