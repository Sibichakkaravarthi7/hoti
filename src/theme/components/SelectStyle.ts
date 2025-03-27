import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';
import { appColors } from '../foundations/appColor';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  selectAnatomy.keys
);

// baseStyle
const baseStyle = definePartsStyle({
  field: {
    color: appColors.appBlack[600],
    padding: "11.5px 12px"

    // height: "58.5px",
  },
  icon: {
    color: '#3A3939',
    fontSize: '10px',
  }
});

// size
const xl = defineStyle({
  fontSize: 'lg',
})

const sizes = {
  xl: definePartsStyle({ field: xl, icon: xl }),
}

// variant one
const filled = definePartsStyle({
  field: {
    backgroundColor: 'appGrey.400',
    borderRadius: '0',
    fontSize: '1.8rem',
    fontWeight: 'sm',
    color: appColors.appBlack[600],
    _focus: {
      borderColor: "transparent",
      boxShadow: "none",
      background: "appGrey.400",
      color: appColors.appBlack[600],
    },
    _hover: {
      backgroundColor: "appGrey.400"
    },

  },
  icon: {
    color: '#3A3939',
    fontSize: '2em'
  }
});

const orangeBox = definePartsStyle({
  field: {
    backgroundColor: appColors.appPrimary[600],
    // border: "1px solid red",
    padding: "25px 4px 25px 20px",
    borderRadius: '0',
    fontSize: '1.8rem',
    fontWeight: 600,
    color: "white",
    _focus: {
      color: "white",
    },
  },
  icon: {
    color: 'white',
    fontSize: '10px',

  }
});

// variant two
// const f = definePartsStyle({
//   field: {
//     backgroundColor: '#EDEEEF',
//     borderRadius: '0',
//     fontSize: '1.8em',
//     fontWeight: 'sm',
//     color: '#3A3939',
//       _focus: {
//         borderColor: "transparent",
//         boxShadow: "none"
//     },
//     _active: {
//       color: "blue"
//     }
//   },
//   icon: {
//     color: '#3A3939',
//     fontSize: '2em'
//   }
// });



export const SelectTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    filled,
    orangeBox,
  },
  sizes,
  defaultProps: {
      size: 'xl',
    variant: 'filled'
  }
});
