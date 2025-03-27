import { fontSizes, fontWeights } from '../foundations/fonts';
import { defineStyleConfig } from '@chakra-ui/react';
import { TextStyle } from './TextStyle';
import { appColors } from '../foundations/appColor';

export const ButtonStyle = defineStyleConfig({
  baseStyle: {
    borderRadius: 0
  },
  sizes: {
    md: {
      p: '1.35em 1.25em',
      w: 'fit-content',
      ...TextStyle.sizes.btn1
    },
    sm: {
      p: '0.9em 0.25em',
      w: 'fit-content',
      ...TextStyle.sizes.textlight3
    }
  },
  variants: {
    fillBrandColor: {
      bg: 'appPrimary.600',
      color: '#fff',
      border: '1px solid appPrimary.600',
      fontSize: '17px'
    },
    onlyBorderPrimary: {
      border: `1px solid ${appColors.appPrimary['600']}`,
      color: 'appPrimary.600',
      fontSize: '17px'
    },
    onlyBorderBlack: {
      border: `1px solid ${appColors.appBlack['800']}`,
      color: 'appBlack.800',
      fontSize: '17px'
    },
    onlyThickBorderBlack: {
      border: `2px solid ${appColors.appBlack['800']}`,
      color: 'appBlack.800',
      fontSize: '17px'
    },
    onlyBorderGreen: {
      border: '1px solid #285538',
      color: '#151515',
      fontSize: '17px'
    },
    fillBrandGreen: {
      bg: '#285538',
      color: '#fff',
      border: '1px solid #285538',
      fontSize: '17px'
    },
    seeMore: {
      border: '1px solid #1A1818',
      color: '#030504',
      fontSize: '17px'
    },
    noBgButton: {
      background: "transparent",
      fontSize: '17px',
       _hover: {
         background: "none",
       }
    },
    warningButton: {
      background: "#d64545",
      fontSize: "17px",
      color: "white",
    },
    warningButtonOutlined: {
      border: "2px solid #d64545",
      bg:"white",
      fontSize: "17px",
      color: "#d64545",
    }
  },
  defaultProps: {
    variant: 'fillBrandColor',
    size: 'md'
  }
});
