import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonScreen from '../screens/Pokemon';
import PokemonInfoScreen from '../screens/PokemonInfo';
import type { MainTabParamList } from './MainTab';

const PokemonStack = createNativeStackNavigator({
  initialRouteName: 'Pokemon',
  screens: {
    /**
     * Pokémon list screen.
     */
    Pokemon: {
      screen: PokemonScreen,
      options: { title: 'Pokémon' },
    },

    /**
     * Pokémon info screen.
     */
    PokemonInfo: {
      screen: PokemonInfoScreen,
      options: { title: 'Pokémon info' },
    },
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

export type PokemonStackParamList = StaticParamList<typeof PokemonStack>;

export type PokemonStackNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'PokemonStack'
>;

export default PokemonStack;
