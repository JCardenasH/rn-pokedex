import {
  MD3LightTheme as DefaultTheme,
  type MD3Theme,
} from 'react-native-paper';

/**
 * App theme.
 *
 * Extend default NativeBase theme with app branding.
 */

const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default theme;
