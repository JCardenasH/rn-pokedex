import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type FC } from 'react';
import Routes from '../constants/routes';
import PokemonInfoScreen from '../screens/PokemonInfo';
import PokemonListScreen from '../screens/PokemonList';

/**
 * Pokemon stack navigator - Param list.
 */
export type PokemonStackParamList = {
  /**
   * Pokemon list screen params.
   */
  [Routes.POKEMON_LIST_SCREEN]: undefined;

  /**
   * Pokemon info screen params.
   */
  [Routes.POKEMON_INFO_SCREEN]: {
    // Pokemon name
    name: string;
  };
};

/**
 * Pokemon stack navigator.
 */
const Stack = createNativeStackNavigator<PokemonStackParamList>();

/**
 * Pokemon stack navigator component.
 */
const PokemonStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Pokemon list screen */}
      <Stack.Screen
        name={Routes.POKEMON_LIST_SCREEN}
        component={PokemonListScreen}
      />

      {/* Pokemon info screen */}
      <Stack.Screen
        name={Routes.POKEMON_INFO_SCREEN}
        component={PokemonInfoScreen}
      />
    </Stack.Navigator>
  );
};

export default PokemonStack;