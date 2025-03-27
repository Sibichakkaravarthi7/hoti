import React from 'react';
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';
import AppCard from '../chakraOverrides/AppCard';

export const skeletonProps = {
  startColor: 'gray.200',
  endColor: 'gray.300'
};

function AppCardLoader() {
  return (
    <AppCard variant={undefined}>
      <Stack>
        <Skeleton height="20px" width="50%" {...skeletonProps} />
        <Skeleton height="15px" width="30%" {...skeletonProps} />
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="4" />
        <Skeleton height="30px" width="120px" {...skeletonProps} />
      </Stack>
    </AppCard>
  );
}

export default AppCardLoader;
