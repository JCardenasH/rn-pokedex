import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import React, { type FC } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
 * Main tab navigator component.
 */
const MainTab: FC = () => {
  return (
    <Tab.Navigator>
      {/* Home screen */}
      <Tab.Screen
        name={Routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          // Tab bar icon
          tabBarIcon: ({ color, size }) => (
            <Icon as={FontAwesome} color={color} name="home" size={size} />
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
            <Icon as={FontAwesome} color={color} name="circle" size={size} />
          ),
          // Screen title
          title: 'Pokemon',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
