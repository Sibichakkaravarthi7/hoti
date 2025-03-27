import React from 'react';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  ButtonProps
} from '@chakra-ui/react';

type AppTagType = {
  children: React.ReactNode;
  size?: string;
  variant?: string;
  customStyles?: ButtonProps;
  isClosable?: boolean;
};
function AppTag({ children, size, variant, customStyles, isClosable }: AppTagType) {
  if (isClosable) {
    return (
      <Tag size={size} variant={variant} {...customStyles}>
        <TagLabel>{children}</TagLabel>
        <TagCloseButton />
      </Tag>
    );
  }

  return (
    <Tag size={size} variant={variant} {...customStyles}>
      {children}
    </Tag>
  );
}

export default AppTag;
