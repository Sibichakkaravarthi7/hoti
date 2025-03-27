import React from 'react';
import { Flex } from '@chakra-ui/react';
import AppAvatar, { AppAvatarType } from './chakraOverrides/AppAvatar';

interface CustomAvatarGroupType {
  allAvatardata: AppAvatarType[];
  size?: string;
  maxCount?: number;
}
function AppCustomAvatarGroup({ allAvatardata, size = 'sm', maxCount = 4 }: CustomAvatarGroupType) {
  return (
    <Flex>
      {allAvatardata.map((each, index) => {
        if (index < maxCount) {
          return (
            <AppAvatar
              size={size}
              name={each.name}
              src={each.src}
              customStyles={index >= 1 ? { marginLeft: '-1em' } : {}}
            />
          );
        }

        if (maxCount === index) {
          return (
            <AppAvatar
              size={size}
              name={''}
              src={''}
              customStyles={{ bg: 'gray.300', marginLeft: '-1em' }}
            />
          );
        }

        return null;
      })}
    </Flex>
  );
}

export default AppCustomAvatarGroup;
