import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from '../../../modules/BottomSheet/BottomSheet';
import CountBottomSheet from '../../Count/components/CountBottomSheet/CountBottomSheet';
import CountList from '../../Count/components/CountList/CountList';
import TargetBottomSheet from '../../Target/components/TargetBottomSheet/TargetBottomSheet';
import TargetList from '../../Target/components/TargetList/TargetList';

import type { BottomSheetRefProps } from '../../../modules/BottomSheet/BottomSheet';
import type { FC } from 'react';

const Accounts: FC = () => {
  const [accountID, setAccountID] = useState<string>('');

  const colors = useTheme().colors;

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={[{ backgroundColor: colors.themeColor }]} alwaysBounceVertical={false}>
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
          activeHeight={height * 0.8}
          backgroundColor={colors.themeColor}
          backDropColor={'black'}>
          <TargetBottomSheet handleTargetClose={handleTargetClose} targetID={accountID} />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Accounts;