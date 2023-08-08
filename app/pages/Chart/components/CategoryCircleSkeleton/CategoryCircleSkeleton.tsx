import React from 'react';
import { View } from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import type { FC } from 'react';

interface CategoryCircleSkeletonProps {
  x: number;
  y: number;
}

const CategoryCircleSkeleton: FC<CategoryCircleSkeletonProps> = ({ x, y }) => (
  <View
    style={{
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      left: x,
      top: y,
    }}>
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection='row' alignItems='center'>
        <SkeletonPlaceholder.Item width={45} height={45} borderRadius={40} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
);

export default CategoryCircleSkeleton;
