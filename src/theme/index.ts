import { extendTheme } from 'native-base';

/**
 * App theme.
 *
 * Extend default NativeBase theme with app branding.
 */
const theme = extendTheme({
  colors: {
    brand: {
      // Darker red
      100: '#ee1515',
      // Red
      200: '#f00000',
      // Black
      300: '#222224',
      // White
      400: '#f0f0f0',
    },
  },
});

export default theme;
