import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Icon, Image } from 'native-base';
import React, { type FC } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Images } from '../constants/assets';
import Routes from '../constants/routes';
import HomeScreen from '../screens/Home';
import PokemonStack from './PokemonStack';

/**
 * Main tab navigator - Params list.
 */
export type MainTabParamList = {
  /**
   * Home screen params.
   */
  [Routes.HOME_SCREEN]: undefined;

  /**
   * Pokemon stack navigator params.
   */
  [Routes.POKEMON_STACK]: undefined;
};

/**
 * Main tab navigator.
 */
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main tab navigator - Navigation options.
 */
const screenOptions: BottomTabNavigationOptions = {
  // Header background style
  headerStyle: { backgroundColor: '#222224' },

  // Header tint color
  headerTintColor: '#f0f0f0',

  // Hide tab bar labels
  tabBarShowLabel: false,

  // Tab bar - Active background color
  tabBarActiveBackgroundColor: '#f00000',

  // Tab bar - Active tint color
  tabBarActiveTintColor: '#f0f0f0',

  // Tab bar - Inactive background color
  tabBarInactiveBackgroundColor: '#f00000',

  // Tab bar - Inactive tint color
  tabBarInactiveTintColor: '#222224',
};

/**
 * Main tab navigator component.
 */
const MainTab: FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {/* Home screen */}
      <Tab.Screen
        name={Routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          // Tab bar icon
          tabBarIcon: ({ color, size }) => (
            <Icon as={Octicons} color={color} name="home" size={size} />
          ),
        }}
      />

      {/* Pokemon stack */}
      <Tab.Screen
        name={Routes.POKEMON_STACK}
        component={PokemonStack}
        options={{
          // Tab bar icon
          tabBarIcon: ({ color, size }) => (
            <Image
              alt="Pokeball"
              h={`${size}px`}
              tintColor={color}
              source={Images.Pokeball}
              w={`${size}px`}
            />
          ),
          // Screen title
          title: 'Pokemon',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
