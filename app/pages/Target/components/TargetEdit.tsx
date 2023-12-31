import { useTheme } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useActions } from '../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';
import { validateTitle } from '../../../shared/lib/utils/titleFormValidate';
import { validateValue } from '../../../shared/lib/utils/validateValue';
import StyledTextInput from '../../../shared/ui/StyledTextInput/StyledTextInput';

import type { ITarget } from '../lib/types/interfaces';
import type { FC } from 'react';

const TargetEdit: FC = ({ route }) => {
  const colors = useTheme().colors;
  const { t } = useTranslation();
  const { changeTarget, changeTargetTitle, changeTargetValue } = useActions();

  const { target } = useTypedSelector((state) => state);
  const { targetID } = route.params;

  const [targetTitleSubmitAvailable, setTargetTitleSubmitAvailable] = useState(false);
  const [targetValueSubmitAvailable, setTargetValueSubmitAvailable] = useState(false);
  const [targetSubmitAvailable, setTargetSubmitAvailable] = useState(false);

  const findModalPropByID = useCallback(
    (index: string): ITarget => {
      const item: ITarget | undefined = target.find((item: ITarget) => item.index === index);

      return item ? { ...item } : { index: '0', title: '', value: 0, target: 0 };
    },
    [targetID]
  );

  const targetElement = findModalPropByID(targetID);

  const [inputTargetTitle, setInputTargetTitle] = useState(targetElement.title);
  const [inputTargetValue, setInputTargetValue] = useState(targetElement.value);
  const [inputTarget, setInputTarget] = useState(targetElement.value);

  const onChangeTargetTitleHandler = (input: string) => {
    setInputTargetTitle(input);
    setTargetTitleSubmitAvailable(true);
  };

  const onChangeTargetValueHandler = (input: string) => {
    if (input.length > 0) {
      setInputTargetValue(Number(input));
      setTargetValueSubmitAvailable(true);
    }
  };

  const onChangeTargetHandler = (input: string) => {
    if (input.length > 0) {
      setInputTarget(Number(input));
      setTargetSubmitAvailable(true);
    }
  };

  const changeTargetTitleHandler = (newTitle: string): void => {
    if (validateTitle(newTitle)) {
      changeTargetTitle({ index: targetID, title: newTitle });

      setTargetTitleSubmitAvailable(false);
    }
  };

  const changeTargetValueHandler = (newTargetValue: number): void => {
    if (validateValue(newTargetValue)) {
      changeTargetValue({ index: targetID, value: newTargetValue });

      setTargetValueSubmitAvailable(false);
    }
  };

  const changeTargetHandler = (newTarget: number): void => {
    if (validateValue(newTarget)) {
      changeTarget({ index: targetID, value: newTarget });
      setTargetSubmitAvailable(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label={t('firstScreen.targetEditNameTitle')}
          color={colors.info}
          defaultValue={inputTargetTitle}
          placeholder={t('global.placeholderTitle')}
          onChangeText={(input) => onChangeTargetTitleHandler(input)}
          maxLength={16}
          keyboardType='default'
          submitDisable={targetTitleSubmitAvailable}
          submitEditing={() => changeTargetTitleHandler(inputTargetTitle)}
        />
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label={t('firstScreen.targetEditValueTitle')}
          color={colors.info}
          defaultValue={`${inputTargetValue}`}
          placeholder={t('global.placeholderValue')}
          onChangeText={(input) => onChangeTargetValueHandler(input)}
          maxLength={9}
          keyboardType='numeric'
          submitDisable={targetValueSubmitAvailable}
          submitEditing={() => changeTargetValueHandler(inputTargetValue)}
        />
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <StyledTextInput
          label={t('firstScreen.targetEditTargetTitle')}
          color={colors.info}
          defaultValue={`${inputTarget}`}
          placeholder={t('global.placeholderValue')}
          onChangeText={(input) => onChangeTargetHandler(input)}
          maxLength={9}
          keyboardType='numeric'
          submitDisable={targetSubmitAvailable}
          submitEditing={() => changeTargetHandler(inputTarget)}
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
