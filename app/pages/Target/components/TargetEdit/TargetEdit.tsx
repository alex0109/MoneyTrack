import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { validateTitle } from '../../../../shared/lib/utils/titleFormValidate';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import StyledTextInput from '../../../../shared/ui/StyledTextInput/StyledTextInput';

import type { ITarget } from '../../lib/types/interfaces';
import type { FC } from 'react';

const TargetEdit: FC = ({ route }) => {
  const colors = useTheme().colors;
  const { handleChangeTarget, handleChangeTargetValue, handleChangeTargetTitle } = useActions();
  const target = useTypedSelector((state) => state.target.data);
  const { targetID } = route.params;

  const findModalPropByID = (index: string): ITarget => {
    const item: ITarget | undefined = target.find((item: ITarget) => item.index === index);

    return item ? { ...item } : { index: '0', title: '', value: 0, target: 0, history: [] };
  };

  const targetElement = findModalPropByID(targetID);

  const changeTitleHandler = (newTitle: string): void => {
    if (validateTitle(newTitle)) {
      handleChangeTargetTitle({ index: targetID, title: newTitle });
    }
  };

  const targetChangeHandler = (newTarget: string): void => {
    if (validateValue(newTarget)) {
      handleChangeTarget({ index: targetID, target: +newTarget });
    }
  };

  const targetValueChangeHandler = (newTargetValue: string): void => {
    if (validateValue(newTargetValue)) {
      handleChangeTargetValue({ index: targetID, value: +newTargetValue });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label='Count name'
          color={colors.success}
          defaultValue={targetElement.title}
          placeholder='Your title...'
          onChangeText={(input) => changeTitleHandler(input)}
          maxLength={16}
          keyboardType='default'
        />
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label='Your current amout'
          color={colors.success}
          defaultValue={`${targetElement.value}`}
          placeholder='Your value...'
          onChangeText={(input) => targetValueChangeHandler(input)}
          maxLength={9}
          keyboardType='numeric'
        />
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label='Target'
          color={colors.success}
          defaultValue={`${targetElement.target}`}
          placeholder='Your month income...'
          onChangeText={(input) => targetChangeHandler(input)}
          maxLength={9}
          keyboardType='numeric'
        />
      </View>
    </ScrollView>
  );
};

export default TargetEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
