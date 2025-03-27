/* eslint-disable import/named */
import * as React from 'react';
import { Flex, FlexProps, useStyleConfig } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
  size?: string;
  variant?: string;
  customStyles?: FlexProps;
  alignItems?: FlexProps['alignItems'];
  justifyContent?: FlexProps['justifyContent'];
  gap?: FlexProps['gap'];
  flexFlow?: FlexProps['flexFlow'];
  onClick?: () => any;
};

function AppFlex({
  size,
  variant,
  children,
  customStyles,
  alignItems,
  justifyContent,
  onClick,
  flexFlow,
  gap
}: Props) {
  const styles = useStyleConfig('AppFlex', { size, variant });
  return (
    <Flex
      sx={styles}
      alignItems={alignItems}
      justifyContent={justifyContent}
      onClick={onClick}
      flexFlow={flexFlow}
      gap={gap}
      {...customStyles}
    >
      {children}
    </Flex>
  );
}

export default AppFlex;
