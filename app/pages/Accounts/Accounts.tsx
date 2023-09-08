import { useNavigation, useTheme } from '@react-navigation/native';
import Analytics from 'appcenter-analytics';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BackHandler, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from '../../modules/BottomSheet/BottomSheet';

import { useTypedSelector } from '../../shared/lib/hooks/useTypedSelector';
import CountBottomSheet from '../Count/components/CountBottomSheet';
import CountList from '../Count/components/CountList';
import TargetBottomSheet from '../Target/components/TargetBottomSheet';
import TargetList from '../Target/components/TargetList';

import type { BottomSheetRefProps } from '../../modules/BottomSheet/BottomSheet';
import type { FC } from 'react';

const Accounts: FC = () => {
  const [accountID, setAccountID] = useState<string>('');

  const countError = useTypedSelector((state) => state.count.error);
  const targetError = useTypedSelector((state) => state.target.error);

  const colors = useTheme().colors;
  const navigation = useNavigation();

  const { height } = useWindowDimensions();
  const countBottomSheetRef = useRef<BottomSheetRefProps>(null);
  const targetBottomSheetRef = useRef<BottomSheetRefProps>(null);

  const handleOpenCount = useCallback((index: string) => {
    setAccountID(index);
    countBottomSheetRef.current!.expand();
  }, []);

  const handleCountClose = useCallback(() => {
    countBottomSheetRef.current!.close();
  }, []);

  const handleOpenTarget = useCallback((index: string) => {
    setAccountID(index);
    targetBottomSheetRef.current!.expand();
  }, []);

  const handleTargetClose = useCallback(() => {
    targetBottomSheetRef.current!.close();
  }, []);

  useEffect(() => {
    void Analytics.trackEvent('Counts/Targets opened');

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('ChartTab', {});
      return true;
    });

    return () => backHandler.remove();
  }, []);

  useEffect(() => {}, [countError, targetError]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={[{ flex: 1 }]} alwaysBounceVertical={false}>
          <CountList handleModalOpen={handleOpenCount} />
          <TargetList handleModalOpen={handleOpenTarget} />
        </ScrollView>
        <BottomSheet
          ref={countBottomSheetRef}
          activeHeight={height * 0.7}
          backgroundColor={colors.themeColor}
          backDropColor={'black'}>
          <CountBottomSheet handleCountClose={handleCountClose} countID={accountID} />
        </BottomSheet>
        <BottomSheet
          ref={targetBottomSheetRef}
          activeHeight={height * 0.9}
          backgroundColor={colors.themeColor}
          backDropColor={'black'}>
          <TargetBottomSheet handleTargetClose={handleTargetClose} targetID={accountID} />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Accounts;
