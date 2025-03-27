import React from 'react';
import { Avatar, AvatarGroup, Box, Flex, HStack } from '@chakra-ui/react';
import AppAvatar, { AppAvatarType } from './chakraOverrides/AppAvatar';

export type AppAvatarGroupType = {
  allAvatardata: AppAvatarType[];
  size?: string;
  maxCount?: number;
};
function AppAvatarGroup({ allAvatardata, size = 'sm', maxCount = 4 }: AppAvatarGroupType) {
  return (
    <AvatarGroup max={maxCount} spacing="-5" size={size}>
      {allAvatardata.map((each) => (
        <Avatar name={each.name} src={each.src} />
      ))}
    </AvatarGroup>
  );
}

export default AppAvatarGroup;
