import React from 'react';
import { Flex, FlexProps, Wrap, WrapItem } from '@chakra-ui/react';
import AppFlex from './chakraOverrides/AppFlex';

function AppTagWrapper({
  children,
  customStyles
}: {
  children: React.ReactNode;
  customStyles?: FlexProps;
}) {
  return (
    <AppFlex gap="1em" customStyles={{ ...customStyles, flexWrap: 'wrap' }}>
      {children}
    </AppFlex>
  );
}

export default AppTagWrapper;
