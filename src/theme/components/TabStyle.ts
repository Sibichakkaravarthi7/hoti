import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'; // import utility for setting light and dark mode props
import { appColors } from '../foundations/appColor';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  tabsAnatomy.keys
);

// // define custom variants
const colorfulVariant = definePartsStyle((props) => {
  const { colorScheme } = props; // add colorScheme as a prop

  return {
    tab: {
      fontWeight: '600',
      fontSize: '14px',
      color: 'appGrey.600',
      borderBottom: `3px solid ${appColors.appGrey['600']}`,
      _selected: {
        borderBottom: `3px solid ${appColors.appPrimary['600']}`,
        color: 'appBlack.500'
      }
    },
    tablist: {},
    tabpanel: {
      p: '0'
    }
  };
});

const variants = {
  elegant: colorfulVariant,
  OrangeUnderlined: definePartsStyle({
      tab: {
        fontWeight: '600',
        fontSize: '18px',
        color: appColors.appBlack[600],
        borderBottom: `3px solid transparent`,
        padding: "8px 0px",
        _selected: {
          color: appColors.appPrimary['600'],
          borderBottom: `3px solid ${appColors.appPrimary['600']}`,
        }
      },
      tablist: {
        gap: "38px"
      },
      tabpanel: {
        p: '0'
      }
  })
};

// define which sizes, variants, and color schemes are applied by default
const defaultProps = {
  variant: variants.OrangeUnderlined
};

// export the component theme
export const TabStyle = defineMultiStyleConfig({
  // sizes,
  variants,
  // defaultProps
});
