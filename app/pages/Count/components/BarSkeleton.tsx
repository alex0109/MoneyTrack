import React from 'react';
import { Dimensions, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const windowWidth = Dimensions.get('window').width;

const BarSkeleton = () => (
  <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 30 }}>
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection='row' alignItems='center'>
        <SkeletonPlaceholder.Item width={windowWidth / 1.2} height={50} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
);

export default BarSkeleton;
