import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { Icon, Image, StatusBar } from 'native-base';
import React, { Fragment, type FC } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Images } from '../constants/assets';
import Routes from '../constants/routes';
import HomeStack, { type HomeStackParamList } from './HomeStack';
import ItemsStack, { type ItemsStackParamList } from './ItemsStack';
import PokemonStack, { type PokemonStackParamList } from './PokemonStack';

/**
 * Main tab navigator - Params list.
 */
export type MainTabParamList = {
  /**
   * Items stack navigator params.
   */
  [Routes.ItemsStack]: NavigatorScreenParams<ItemsStackParamList>;

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
      <Tab.Navigator
        initialRouteName={Routes.HomeStack}
        screenOptions={screenOptions}>
        {/* Items stack navigator */}
        <Tab.Screen
          name={Routes.ItemsStack}
          component={ItemsStack}
          options={{
            // Tab bar icon
            tabBarIcon: ({ color, size }) => (
              <Icon
                as={MaterialCommunityIcons}
                color={color}
                name="bag-personal"
                size={size}
              />
            ),
          }}
        />

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
