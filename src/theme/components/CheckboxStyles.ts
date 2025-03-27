import { appColors } from '../foundations/appColor';
import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  checkboxAnatomy.keys
);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderRadius: "md", // change the border radius
    borderColor: "blue.500", // change the border color
    height: "27px",
    width: "27px",
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
  blackOulined: definePartsStyle({
    control: defineStyle({
      height: '27px',
      width: '27px',
      borderRadius: '5px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: appColors.appBlack[600],

      _checked: {
        background: appColors.appPrimary[600],
        borderColor: appColors.appPrimary[600],

        _hover: {
          bg: appColors.appPrimary[600],
          border: appColors.appPrimary[600]
        }
      }
    }),
    icon: defineStyle({
        fontSize: "10px"
    })
  }),
  filter: definePartsStyle({
    control: defineStyle({
      height: '18px',
      width: '18px',
      borderRadius: '5px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: appColors.appBlack[600],

      _checked: {
        background: "#585858",
        borderColor: "#585858",

        _hover: {
          bg: "#585858",
          border: "#585858"
        }
      }
    }),
    icon: defineStyle({
        fontSize: "10px"
    })
  }),
  blackOulined_17: definePartsStyle({
    control: defineStyle({
      height: '27px',
      width: '27px',
      borderRadius: '5px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: appColors.appBlack[600],

      _checked: {
        background: appColors.appPrimary[600],
        borderColor: appColors.appPrimary[600],

        _hover: {
          bg: appColors.appPrimary[600],
          border: appColors.appPrimary[600]
        }
      }
    }),
    icon: defineStyle({
        fontSize: "10px"
    })
  })
};

// export the component theme
export const checkBoxTheme = defineMultiStyleConfig({
    baseStyle,
    sizes,
  variants
});
