import { createStaticNavigation } from '@react-navigation/native';

import RootStack, { type RootStackParamList } from './RootStack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
