import { fontSizes, fontWeights } from '../foundations/fonts';
import { defineStyleConfig } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { TextStyle } from './TextStyle';
import { appColors } from '../foundations/appColor';

export const TagStyle = defineStyleConfig({
  baseStyle: {
    container: {
      borderRadius: 0,
      color: '#3A3939',
      backgroundColor: '#E7E8EA',
      fontWeight: 400,
      p: '0.1em 0.5em'
    }
  },
  sizes: {
    sm: {
      container: {
        ...TextStyle.sizes.textlight3
      }
    },
    base: {
      container: {
        ...TextStyle.sizes.textlight1
      }
    }
  },
  variants: {
    simple: {
      container: {
        color: appColors.appBlack['600'],
        backgroundColor: appColors.appGrey['400']
      }
    },
    colored: {
      container: {
        color: appColors.appBlack['600'],
        backgroundColor: appColors.appTag['200']
      }
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'simple'
  }
});
