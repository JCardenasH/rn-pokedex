import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { Icon, Image, StatusBar } from 'native-base';
import React, { Fragment, type FC } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Images } from '../constants/assets';
import Routes from '../constants/routes';
import HomeStack, { type HomeStackParamList } from './HomeStack';
import PokemonStack, { type PokemonStackParamList } from './PokemonStack';

/**
 * Main tab navigator - Params list.
 */
export type MainTabParamList = {
  /**
   * Home stack navigator params.
   */
  [Routes.HomeStack]: NavigatorScreenParams<HomeStackParamList>;

  /**
   * Pokémon stack navigator params.
   */
  [Routes.PokemonStack]: NavigatorScreenParams<PokemonStackParamList>;
};

/**
 * Main tab navigator.
 */
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main tab navigator - Navigation options.
 */
const screenOptions: BottomTabNavigationOptions = {
  // Hide header
  headerShown: false,

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

  // Tab bar - Styles.
  tabBarStyle: { backgroundColor: '#f00000' },
};

/**
 * Main tab navigator component.
 */
const MainTab: FC = () => {
  return (
    <Fragment>
      {/* Status bar */}
      <StatusBar backgroundColor="#222224" barStyle="light-content" />

      {/* Tab navigator */}
      <Tab.Navigator screenOptions={screenOptions}>
        {/* Home stack navigator */}
        <Tab.Screen
          name={Routes.HomeStack}
          component={HomeStack}
          options={{
            // Tab bar icon
            tabBarIcon: ({ color, size }) => (
              <Icon as={Octicons} color={color} name="home" size={size} />
            ),
          }}
        />

        {/* Pokémon stack navigator */}
        <Tab.Screen
          name={Routes.PokemonStack}
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
          }}
        />
      </Tab.Navigator>
    </Fragment>
  );
};

export default MainTab;
