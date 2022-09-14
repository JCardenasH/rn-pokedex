import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type FC } from 'react';
import Routes from '../constants/routes';
import PokemonScreen from '../screens/Pokemon';
import PokemonInfoScreen from '../screens/PokemonInfo';

/**
 * Pokémon stack navigator - Param list.
 */
export type PokemonStackParamList = {
  /**
   * Pokémon list screen params.
   */
  [Routes.PokemonScreen]: undefined;

  /**
   * Pokémon info screen params.
   */
  [Routes.PokemonInfoScreen]: {
    // Pokémon name
    id: number;
  };
};

/**
 * Pokémon stack navigator.
 */
const Stack = createNativeStackNavigator<PokemonStackParamList>();

/**
 * Pokémon stack navigator component.
 */
const PokemonStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // Hide back title
        headerBackTitleVisible: false,
        // Header background style
        headerStyle: { backgroundColor: '#222224' },
        // Header tint color
        headerTintColor: '#f0f0f0',
      }}>
      {/* Pokémon list screen */}
      <Stack.Screen
        name={Routes.PokemonScreen}
        component={PokemonScreen}
        options={{ title: 'Pokémon' }}
      />

      {/* Pokémon info screen */}
      <Stack.Screen
        name={Routes.PokemonInfoScreen}
        component={PokemonInfoScreen}
        options={{ title: 'Pokémon info' }}
      />
    </Stack.Navigator>
  );
};

export default PokemonStack;
