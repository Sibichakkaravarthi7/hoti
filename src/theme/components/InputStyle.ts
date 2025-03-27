import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';
import { appColors } from '../foundations/appColor';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

// common to all inputs
const baseStyle = definePartsStyle({
  field: {
    color: '#3A3939',
    paddingBlock: '21.5px'
    // opacity: "0.75",
  }
});


// size one
const xl = defineStyle({
    fontSize: 'lg',
    px: '4',
    h: '12',
});

// size two
const xs = defineStyle({
  fontSize: 'xs',
  py:"1.25em",
});

const sizes = {
  xl: definePartsStyle({ field: xl, addon: xl }),
  xs: definePartsStyle({field: xs, addon: xs})
};

// INPUT field variant
const filled = definePartsStyle({
  field: {
    backgroundColor: '#EDEEEF',
    borderRadius: '0',
    fontSize: '1.7rem',
    fontWeight: 'sm',
    color: '#3A3939'
  },
  addon: {}
});

// SEARCH field  variant 
const searchOutline = definePartsStyle({
  field: {
    backgroundColor: 'transparent',
    border: "1px solid",
    borderRadius: '0',
    color: 'appBlack.600',
    borderColor:"appBlack.600"
  },
  addon:{}
});

export const InputStyle = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: { searchOutline , filled},
  defaultProps: {
    size: 'xl',
    variant: 'filled'
  }
});
