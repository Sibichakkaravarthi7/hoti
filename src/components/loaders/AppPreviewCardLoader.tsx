import React from 'react';
import {
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import AppCard from '../chakraOverrides/AppCard';
import { skeletonProps } from './AppCardLoader';

function AppPreviewCardLoader({ variant }: { variant: string }) {
  return (
    <AppCard variant={variant}>
      {variant === 'profilePreview' ? (
        <Stack>
          <Skeleton height="250px" width="100%" {...skeletonProps} />
          <Skeleton height="15px" width="50%" {...skeletonProps} />
          <Skeleton height="10px" width="30%" {...skeletonProps} />
        </Stack>
      ) : (
        <Stack>
          <Skeleton height="250px" width="100%" {...skeletonProps} />
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="4" />
          <Flex flexWrap="wrap" alignItems="center" gap="3em" pb="6em" pt="1em">
            <SkeletonText mt="4" w="40%" h="20px" noOfLines={2} spacing="4" skeletonHeight="4" />
            <SkeletonText mt="4" w="40%" h="20px" noOfLines={2} spacing="4" skeletonHeight="4" />
            <SkeletonText mt="4" w="40%" h="20px" noOfLines={2} spacing="4" skeletonHeight="4" />
            <SkeletonText mt="4" w="40%" h="20px" noOfLines={2} spacing="4" skeletonHeight="4" />
          </Flex>
          <Flex flexWrap="wrap" alignItems="center" gap="2em">
            <Skeleton w="40%" h="20px" {...skeletonProps} />
            <Skeleton w="40%" h="20px" {...skeletonProps} />
            <Skeleton w="40%" h="20px" {...skeletonProps} />
          </Flex>
        </Stack>
      )}
    </AppCard>
  );
}

export default AppPreviewCardLoader;
