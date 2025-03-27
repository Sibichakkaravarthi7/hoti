import { Box, Flex, Grid, GridItem, TextProps } from '@chakra-ui/react';
import React from 'react';
import AppText from './chakraOverrides/AppText';
import AppImage from './chakraOverrides/AppImage';

export type AppStatsGridType = {
  stats: {
    head: string;
    value: string;
  }[];
  columns?: string[];
  gap?: number | string;
  childrenStyles?: {
    head?: {
      variant?: string;
      size?: string;
      color?: string;
    };
    value?: {
      variant?: string;
      size?: string;
      color?: string;
    };
  };
};

const AppStatsGrid: React.FC<AppStatsGridType> = ({
  stats,
  columns = 'repeat(2, 1fr)',
  gap = 6,
  childrenStyles
}) => {
  return (
    <Grid templateColumns={columns} gap={gap} width="100%">
      {stats.map((each) => (
        <GridItem key={each.value} w="100%">
          <AppText {...childrenStyles?.head}>{each.head}</AppText>
          <AppText {...childrenStyles?.value} customStyles={{ mt: "0.2em" }}>{each.value}</AppText>
        </GridItem>
      ))}
    </Grid>
  );
};

export default AppStatsGrid;
