import { useNavigation, useTheme } from '@react-navigation/native';
import Analytics from 'appcenter-analytics';
import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';

import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { getGraphHistory } from '../../lib/helpers/getGraphHistory';
import AnalyticHistoryList from '../AnalyticHistoryList/AnalyticHistoryList';
import DataGraph from '../DataGraph/DataGraph';

import type { IGraphData } from '../../lib/types/interfaces';
import type { FC } from 'react';

const AnalyticsScreen: FC = () => {
  const colors = useTheme().colors;
  const navigation = useNavigation();

  const category = useTypedSelector((state) => state.category.data);
  const [graphData, setGraphData] = useState<IGraphData>({
    labels: ['0'],
    datasets: [{ data: [0] }],
  });

  useEffect(() => {
    void Analytics.trackEvent('Analytic/History opened');
    const data = getGraphHistory(category);
    setGraphData(data);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('ChartTab', {});
      return true;
    });

    return () => backHandler.remove();
  }, [category]);

  return (
    <View style={[styles.container, { backgroundColor: colors.themeColor }]}>
      <DataGraph data={graphData} />
      <AnalyticHistoryList />
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
  },
});
