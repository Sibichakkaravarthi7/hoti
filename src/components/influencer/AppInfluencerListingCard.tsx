import { Box, Stack } from '@chakra-ui/react';
import React from 'react';
import AppArrowIcon from '../AppArrowIcon';
import AppAvatarGroup from '../AppAvatarGroup';
import { AppAvatarType } from '../chakraOverrides/AppAvatar';
import AppButton from '../chakraOverrides/AppButton';
import AppCard from '../chakraOverrides/AppCard';
import AppTag from '../chakraOverrides/AppTag';
import AppText from '../chakraOverrides/AppText';

interface ListingCardType {
  tag: string;
  title: string;
  description: string;
  allAvatarData: AppAvatarType[];
}

function AppInfluencerListingCard({ tag, title, description, allAvatarData }: ListingCardType) {
  return (
    <AppCard variant={undefined}>
      <Stack gap={1}>
        <Box>
          <AppTag variant="colored" customStyles={{ py: '0.4em' }}>
            {tag}
          </AppTag>
        </Box>
        <AppText color={'appBlack.800'} size={'textmedium2'}>
          {title}
        </AppText>
        <AppText size={'body3'} color={'appBlack.600'}>
          {description}
        </AppText>
        <AppAvatarGroup allAvatardata={allAvatarData} size="md" />
        <AppButton variant="onlyBorderBlack" size="sm" rightIcon={<AppArrowIcon />}>
          Explore
        </AppButton>
      </Stack>
    </AppCard>
  );
}

export default AppInfluencerListingCard;
