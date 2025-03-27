import { theme as baseTheme } from '@chakra-ui/react';

const fonts = {
  heading: 'Work Sans',
  body: 'Work Sans'
};

// 1rem = 10px
const fontSizes = {
  ...baseTheme.fontSizes,
  xxs: '1.2rem',
  xs: '1.5rem',
  sm: '1.6rem',
  base: '1.8rem',
  md: '2rem',
  lg: '2.4rem',
  xl: '2.8rem'
};

const fontWeights = {
  ...baseTheme.fontWeights,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};

const lineHeights = {
  ...baseTheme.lineHeights,
  xxl: '32px',
  xl: '26px',
  md: '25px',
  sm: '22px',
  xs: '16px',
  xxs: '14px'
};

export { fontSizes, fontWeights, lineHeights, fonts };
