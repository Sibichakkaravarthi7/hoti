import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import ComponentStyles from './components';
import { appColors } from './foundations/appColor';
import { globalStyles } from './foundations/globalstyles';
import { fontSizes, fonts, lineHeights, fontWeights } from './foundations/fonts';

const customTheme = extendTheme({
  styles: globalStyles,
  colors: appColors,
  components: ComponentStyles,
  fonts,
  fontSizes,
  lineHeights,
  fontWeights,
  baseTheme
});

export default customTheme;
