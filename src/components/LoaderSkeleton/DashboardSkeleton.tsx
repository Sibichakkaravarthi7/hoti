import { Box } from '@chakra-ui/layout';
import React from 'react';
import AppListsContainer from '../AppListsContainer';
import AppProfilePreviewCard from '../influencer/AppProfilePreviewCard';

const DashboardSkeleton = () => {
  return (
    <Box width={'100%'}>
      {[1, 2, 3, 4].map((val) => <AppListsContainer
        key={val}
        isLoading={true}
        gridColumns={7}
        heading="Lorem ipsum dolor sit amet consectetur adipisicing ">
        <AppProfilePreviewCard
          profile_id={val}
          //@ts-ignore
          cardData={''}
          key={''}
          variant={'profilePreview'}
          link={''}
        />
      </AppListsContainer>)}

    </Box>
  );
};

export default DashboardSkeleton;
