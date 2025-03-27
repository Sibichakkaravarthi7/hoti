import { IconProps } from '@chakra-ui/react';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import AppIcon from './chakraOverrides/AppIcon';

function AppArrowIcon({ customStyles, boxSize, color }: { customStyles?: IconProps, boxSize?: number, color?: string }) {
  return <AppIcon icon={BiRightArrowAlt} customStyles={customStyles} boxSize={boxSize} color={color} />;
}

export default AppArrowIcon;
