import { Platform, type ViewStyle } from 'react-native';

export const shadow3: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  default: {
    elevation: 3,
  },
});
