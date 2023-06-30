import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import type { IGraphData } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface DataGraphProps {
  data: IGraphData;
}

const DataGraph: FC<DataGraphProps> = ({ data }) => {
  const colors = useTheme().colors;
  const chartConfig = {
    backgroundGradientFrom: colors.textColor,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.textColor,
    backgroundGradientToOpacity: 0,
    color: () => colors.textColor,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={{ marginTop: 10 }}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 20}
        height={210}
        yAxisLabel=''
        yAxisSuffix=''
        yAxisInterval={10}
        hidePointsAtIndex={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
          27, 28,
        ]}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default DataGraph;