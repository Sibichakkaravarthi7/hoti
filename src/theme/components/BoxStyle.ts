import { appColors } from "../foundations/appColor";

export const BoxStyle = {
  baseStyle: {},
  variants: {
    profilePreview: {
      maxW: '155px',
      height: '13vw',
      maxH: '185px',
      minH: ['155px', '185px'],
      bg: 'lightgray'
    },
    profilePreviewWithStats: {
      height: '13vw',
      maxW: '297px',
      maxH: '300px',
      minH: ['155px', '250px'],
      bg: 'blackAlpha.100'
    },
  },
  defaultProps: {
    variant: ''
  }
};
