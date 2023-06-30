import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { monthsShortUA, monthsUA } from '../../../../shared/config/moment/months';
import { weekdaysShortUA, weekdaysUA } from '../../../../shared/config/moment/weekdays';
import { useTypedSelector } from '../../../../shared/lib/hooks/useTypedSelector';
import { getGraphHistory } from '../../lib/helpers/getGraphHistory';
import AnalyticHistoryList from '../AnalyticHistoryList/AnalyticHistoryList';
import DataGraph from '../DataGraph/DataGraph';

import type { IGraphData } from '../../lib/types/interfaces';
import type { FC } from 'react';

const AnalyticsScreen: FC = () => {
  const colors = useTheme().colors;
  const { category } = useTypedSelector((state) => state);
  const { i18n } = useTranslation();
  const [graphData, setGraphData] = useState<IGraphData>({
    labels: ['0'],
    datasets: [{ data: [0] }],
  });

  useEffect(() => {
    if (i18n.language == 'ua') {
      moment.updateLocale('ua', {
        months: monthsUA,
        monthsShort: monthsShortUA,
        weekdays: weekdaysUA,
        weekdaysShort: weekdaysShortUA,
      });
      moment().locale('ua');
    } else {
      moment().locale('en');
    }
    const data = getGraphHistory(category);
    setGraphData(data);
  }, [category, i18n]);

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
