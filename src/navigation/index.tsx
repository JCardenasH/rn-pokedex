import {createStaticNavigation} from '@react-navigation/native';
import type {RootStackParamList} from './RootStack';
import RootStack from './RootStack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
