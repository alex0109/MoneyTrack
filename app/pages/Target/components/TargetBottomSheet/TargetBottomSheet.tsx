import { useNavigation, useTheme } from '@react-navigation/native';
import { Easing, runTiming, useFont, useValue } from '@shopify/react-native-skia';
import React, { useCallback, useRef } from 'react';
import { View, PixelRatio, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useActions } from '../../../../shared/lib/hooks/useActions';

import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';

import TargetDonut from '../TargetDonut/TargetDonut';
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
  const { target } = useTypedSelector((state) => state);
  const { deleteTarget } = useActions();
  const navigation = useNavigation();

  const findModalPropByID = (index: string): ITarget => {
    const item: ITarget | undefined = target.find((item: ITarget) => item.index === index);

    return item ? { ...item } : { index: '0', title: '', value: 0, target: 0 };
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

  const setTargetValueModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refTargeValuetModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refTargeValuetModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const targetValueModalVisible = refTargeValuetModal.current?.modalVisible;

  const removeTargetHandler = (index: string): void => {
    handleTargetClose();
    deleteTarget({ index: index });
  };

  const font = useFont(require('../../../../shared/assets/fonts/NotoSans-Regular.ttf'), 50);

  if (!font) {
    return <View />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.info }]}>
      <View style={[styles.header, { backgroundColor: colors.info }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TargetEditStack', { targetID: targetID })}>
          <Text style={[styles.title, { color: colors.themeColor }]}>{targetElement.title}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.content, { backgroundColor: colors.themeColor }]}>
        <View style={[styles.belt]}>
          <TouchableOpacity onPress={() => removeTargetHandler(targetID)}>
            <Ionicons name='trash' size={35} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TargetEditStack', { targetID: targetID })}>
            <Ionicons name='md-construct' size={35} color={colors.textColor} />
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
      </View>
    </View>
  );
};

export default TargetBottomSheet;
