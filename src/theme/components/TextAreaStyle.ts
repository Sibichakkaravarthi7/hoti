import { defineStyleConfig } from '@chakra-ui/react';

export const TextAreaTheme = defineStyleConfig({
  baseStyle: {
    paddingBlock: '0.5em'
  },
  sizes: {},
  variants: {
    simple: {
      backgroundColor: '#EDEEEF',
      borderRadius: '0',
      fontSize: '1.8em',
      fontWeight: 'sm',
      color: '#3A3939'
    }
  },
  defaultProps: {
    // size: 'lg',
    variant: 'simple'
  }
});
