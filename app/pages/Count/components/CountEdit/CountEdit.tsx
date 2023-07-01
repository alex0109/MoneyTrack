import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { validateTitle } from '../../../../shared/lib/utils/titleFormValidate';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import StyledTextInput from '../../../../shared/ui/StyledTextInput/StyledTextInput';

import type { ICount } from '../../lib/types/interfaces';
import type { FC } from 'react';

const CountEdit: FC = ({ route }) => {
  const colors = useTheme().colors;
  const { countID } = route.params;
  const { count } = useTypedSelector((state) => state);
  const { handleChangeMonthIncomeValue, handleChangeCountTitle, handleChangeCount } = useActions();
  const [inputCount, setInputCount] = useState(0);

  const findModalPropByID = (index: string): ICount => {
    const item: ICount | undefined = count.find((item: ICount) => item.index === index);

    if (item == undefined) {
      return {
        title: '',
        value: 0,
        index: '0',
        monthIncome: {
          incomeDate: '',
          value: 0,
        },
        history: [],
      };
    }

    return { ...item };
  };

  const countElement = findModalPropByID(countID);

  const changeTitleHandler = (newTitle: string): void => {
    if (validateTitle(newTitle)) {
      handleChangeCountTitle({ index: countID, title: newTitle });
    }
  };

  const countInputHandler = (input: string) => {
    setInputCount(Number(input));
  };

  const countChangeHandler = (): void => {
    const historyValue = inputCount - countElement.value;
    handleChangeCount({ index: countID, value: inputCount, historyValue: historyValue });
  };

  const monthIncomeSetHandler = (newValue: string): void => {
    if (validateValue(newValue)) {
      handleChangeMonthIncomeValue({ index: countID, value: +newValue });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label='Count name'
          color={colors.success}
          defaultValue={countElement.title}
          placeholder='Your title...'
          onChangeText={(input) => changeTitleHandler(input)}
          maxLength={16}
          keyboardType='default'
        />
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label='Count value'
          color={colors.success}
          defaultValue={`${countElement.value}`}
          placeholder='Your value...'
          onChangeText={(input) => countInputHandler(input)}
          maxLength={9}
          keyboardType='numeric'
          onSubmitEditing={() => countChangeHandler()}
        />
        <View style={{ width: '80%', marginTop: 5 }}>
          <Text style={{ color: colors.red }}>
            If you want to change the number, then remember that the difference between the entered
            and the current number will be entered into the history
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label='Month income'
          color={colors.success}
          defaultValue={`${countElement.monthIncome.value}`}
          placeholder='Your month income...'
          onChangeText={(input) => monthIncomeSetHandler(input)}
          maxLength={9}
          keyboardType='numeric'
        />
      </View>
    </ScrollView>
  );
};

export default CountEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
