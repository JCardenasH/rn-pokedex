import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import type { MainTabParamList } from './MainTab';

/**
 * Home stack navigator.
 */
const HomeStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
  screenOptions: {
    // Hide back title
    headerBackButtonDisplayMode: 'minimal',
    // Header background style
    headerStyle: { backgroundColor: '#222224' },
    // Header tint color
    headerTintColor: '#f0f0f0',
  },
});

export type HomeStackParamList = StaticParamList<typeof HomeStack>;

export type HomeStackNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'HomeStack'
>;

export default HomeStack;
