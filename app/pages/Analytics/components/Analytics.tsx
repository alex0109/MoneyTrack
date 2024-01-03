import { useNavigation } from '@react-navigation/native';
import Analytics from 'appcenter-analytics';
import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';

import { useTypedSelector } from '../../../shared/lib/hooks/useTypedSelector';
import { getGraphHistory } from '../lib/helpers/getGraphHistory';

import AnalyticHistory from './AnalyticHistory';
import DataGraph from './DataGraph';

import type { IGraphData } from '../lib/types/interfaces';
import type { FC } from 'react';

const AnalyticsScreen: FC = () => {
  const navigation = useNavigation();

  const { history } = useTypedSelector((state) => state);
  const [graphData, setGraphData] = useState<IGraphData>({
    labels: ['0'],
    datasets: [{ data: [0] }],
  });

  const data = useMemo(() => getGraphHistory(history.categories), [history]);

  useEffect(() => {
    void Analytics.trackEvent('Analytic/History opened');
    setGraphData(data);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('ChartTab', {});
      return true;
    });

    return () => backHandler.remove();
  }, [history]);

  return (
    <View style={[styles.container]}>
      <DataGraph data={graphData} />
      <AnalyticHistory />
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
