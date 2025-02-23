import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemsScreen from '../screens/Items';
import type { MainTabParamList } from './MainTab';

const ItemsStack = createNativeStackNavigator({
  screens: {
    Items: {
      screen: ItemsScreen,
      options: { title: 'Items' },
    },
  },

  /**
   * Items stack navigator - Screen options.
   */
  screenOptions: {
    // Hide back title
    headerBackButtonDisplayMode: 'minimal',
    // Header background style
    headerStyle: { backgroundColor: '#222224' },
    // Header tint color
    headerTintColor: '#f0f0f0',
  },
});

export type ItemsStackParamList = StaticParamList<typeof ItemsStack>;

export type ItemsStackNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'ItemsStack'
>;

export default ItemsStack;
