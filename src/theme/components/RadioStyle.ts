import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { appColors } from '../foundations/appColor';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderRadius: "md", // change the border radius
    borderColor: "blue.500" // change the border color
  }
});

const sizes = {
  // define custom styles for xl size
  xl: definePartsStyle({
    control: { w: "6", h: "6" },
    label: { fontSize: "xl" }
  })
};


// define custom variant
const variants = {
  orangeBox: definePartsStyle({
    control: {
      height: "27px",
      width: "27px",
      borderRadius: "5px",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: appColors.appBlack[400],
      display: "none",
      zIndex: -1,

      _checked: {
        background: appColors.appPrimary[600],
        borderColor: appColors.appPrimary[600],

        _hover: {
          bg: appColors.appPrimary[600],
          border: appColors.appPrimary[600],
        }
      },
    }
  }),
  simpleBlue: definePartsStyle({
    control: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: appColors.appBlack[400],
      background: appColors.appBlack[400],

      _checked: {
        background: "#1365B8",
        borderColor: appColors.appBlack[400],

      },
    }
  })
};

// export the component theme
export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
});