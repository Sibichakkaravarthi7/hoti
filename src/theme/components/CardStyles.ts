import { defineStyleConfig } from '@chakra-ui/react';
import { appColors } from '../foundations/appColor';

const CardStyles = defineStyleConfig({
  baseStyle: {
    border: '1px solid #E9E9E9',
    padding: '1.25em 1em',
    borderRadius: '8px',
    width: '100%'
  },

  variants: {
    basic: {
      maxWidth: '310px'
    },
    basicShadow: {
      maxWidth: '310px',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important',
    },
    profilePreview: {
      maxWidth: '175px',
      height: "100%",
      // maxHeight: '255px'
    },
    profilePreviewWithStats: {
      border: " 2px solid #EAE8E9",
      background: "white",
      maxWidth: '333px',
      px: ['1em', '2em']
    },
    removeDefault: {
      border: 'none',
      p: '0'
    }
  },
  defaultProps: {
    variant: 'basic'
  }
});

export default CardStyles;
