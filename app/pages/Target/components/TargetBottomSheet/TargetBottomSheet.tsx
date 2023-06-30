import { useTheme } from '@react-navigation/native';
import { Easing, runTiming, useFont, useValue } from '@shopify/react-native-skia';
import React, { useCallback, useRef } from 'react';
import { TextInput, View, PixelRatio, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { validateTitle } from '../../../../shared/lib/utils/titleFormValidate';
import { validateValue } from '../../../../shared/lib/utils/validateValue';
import TargetDonut from '../TargetDonut/TargetDonut';
import TargetModal from '../TargetModal/TargetModal';
import TargetValueModal from '../TargetValueModal/TargetValueModal';

import { styles } from './TargetBottomSheet.styles';

import type { ModalRefProps } from '../../../../shared/ui/Modal/Modal';

import type { ITarget } from '../../lib/types/interfaces';
import type { FC } from 'react';

const radius = PixelRatio.roundToNearestPixel(90);
const STROKE_WIDTH = 9;

interface TargetBottomSheetProps {
  targetID: string;
  handleTargetClose: () => void;
}
const TargetBottomSheet: FC<TargetBottomSheetProps> = ({ handleTargetClose, targetID }) => {
  const colors = useTheme().colors;

  const {
    handleDeleteTarget,
    handleChangeTarget,
    handleChangeTargetValue,
    handleChangeTargetTitle,
  } = useActions();
  const { target } = useTypedSelector((state) => state);

  const findModalPropByID = (index: string): ITarget => {
    const item: ITarget | undefined = target.find((item: ITarget) => item.index === index);

    return item ? { ...item } : { index: '0', title: '', value: 0, target: 0, history: [] };
  };

  const targetElement = findModalPropByID(targetID);

  const targetPercentage = targetElement.value / targetElement.target;
  const animationState = useValue(0);

  (function () {
    animationState.current = 0;
    runTiming(animationState, targetPercentage, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    });
  })();

  const refTargeValuetModal = useRef<ModalRefProps>(null);
  const refTargetModal = useRef<ModalRefProps>(null);

  const setTargetValueModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refTargeValuetModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refTargeValuetModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const setTargetModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refTargetModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refTargetModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const targetValueModalVisible = refTargeValuetModal.current?.modalVisible;
  const targetModalVisible = refTargetModal.current?.modalVisible;

  const changeTitleHandler = (index: string, newTitle: string): void => {
    if (validateTitle(newTitle)) {
      handleChangeTargetTitle({ index: index, title: newTitle });
    }
  };

  const targetChangeHandler = (index: string, newTarget: string): void => {
    if (validateValue(newTarget)) {
      handleChangeTarget({ index: index, target: +newTarget });
    }
  };

  const targetValueChangeHandler = (index: string, newTargetValue: string): void => {
    if (validateValue(newTargetValue)) {
      handleChangeTargetValue({ index: index, value: +newTargetValue });
    }
  };

  const removeTargetHandler = (index: string): void => {
    handleTargetClose();
    handleDeleteTarget({ index: index });
  };

  const font = useFont(
    require('../../../../shared/assets/fonts/Assistant/Assistant-Light.ttf'),
    50
  );

  if (!font) {
    return <View />;
  }

  return (
    <View style={[styles.container, { backgroundColor: 'green' }]}>
      <View style={[styles.header, { backgroundColor: 'green' }]}>
        <TextInput
          style={[styles.title, { color: colors.themeColor }]}
          defaultValue={targetElement.title}
          onChangeText={(enteredText) => {
            changeTitleHandler(targetElement.index, enteredText);
          }}
          placeholder='Your title...'
          placeholderTextColor={colors.themeColor}
        />
        <View style={styles.subTitleContainer}>
          <TextInput
            style={[styles.subTitle, { color: colors.themeColor }]}
            defaultValue={targetElement.value.toString()}
            onChangeText={(enteredText) => {
              targetValueChangeHandler(targetElement.index, enteredText);
            }}
            keyboardType='numeric'
            placeholder='Your count...'
            placeholderTextColor={colors.themeColor}
          />
          <Text style={[styles.subTitle, { color: colors.themeColor }]}>/</Text>
          <TextInput
            style={[styles.subTitle, { color: colors.themeColor }]}
            defaultValue={targetElement.target.toString()}
            onChangeText={(enteredText) => {
              targetChangeHandler(targetElement.index, enteredText);
            }}
            keyboardType='numeric'
            placeholder='Your count...'
            placeholderTextColor={colors.themeColor}
          />
        </View>
      </View>
      <View style={[styles.content, { backgroundColor: colors.themeColor }]}>
        <View style={[styles.belt]}>
          <TouchableOpacity onPress={() => removeTargetHandler(targetID)}>
            <Ionicons name='trash' size={35} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTargetModalVisible(true)}>
            <Ionicons name='rocket' size={35} color={colors.info} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTargetValueModalVisible(true)}>
            <Ionicons name='add-outline' size={35} color={colors.textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.donutContainer}>
          <View style={styles.donutChartContainer}>
            <TargetDonut
              backgroundColor='white'
              radius={radius}
              strokeWidth={STROKE_WIDTH}
              percentageComplete={animationState}
              targetPercentage={targetPercentage}
              font={font}
            />
          </View>
        </View>
        <TargetValueModal
          targetElement={targetElement}
          refModal={refTargeValuetModal}
          modalVisible={targetValueModalVisible}
          setModalVisible={setTargetValueModalVisible}
        />
        <TargetModal
          targetElement={targetElement}
          refModal={refTargetModal}
          modalVisible={targetModalVisible}
          setModalVisible={setTargetModalVisible}
        />
      </View>
    </View>
  );
};

export default TargetBottomSheet;
