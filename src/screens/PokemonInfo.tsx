import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Heading, Image, Stack, Text } from 'native-base';
import React, { useEffect, type FC } from 'react';
import Layout from '../components/common/Layout';
import Routes from '../constants/routes';
import { useSinglePokemon } from '../hooks/pokemon';
import type { PokemonStackParamList } from '../navigation/PokemonStack';
import { capitalizeName, getTypeColor } from '../utils/pokemon';

/**
 * Pokémon info screen - Navigation prop.
 */
export type PokemonInfoScreenNavigationProp = NativeStackNavigationProp<
  PokemonStackParamList,
  Routes.PokemonInfoScreen
>;

/**
 * Pokémon info screen - Route prop.
 */
export type PokemonInfoScreenRoute = RouteProp<
  PokemonStackParamList,
  Routes.PokemonInfoScreen
>;

/**
 * Pokémon info screen component.
 */
const PokemonInfoScreen: FC = () => {
  /**
   * Navigation prop.
   */
  const navigation = useNavigation<PokemonInfoScreenNavigationProp>();

  /**
   * Route prop.
   */
  const { params } = useRoute<PokemonInfoScreenRoute>();

  /**
   * Selected Pokémon.
   */
  const pokemon = useSinglePokemon(params.id);

  /**
   * Selected Pokémon side effect.
   */
  useEffect(() => {
    // Check if the selected Pokémon exists.
    if (pokemon) {
      // Set Pokémon name as the header title text
      navigation.setOptions({ title: capitalizeName(pokemon.name, true) });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  // If the selected Pokémon doesn't exist or an error occurred, it will display an error text
  if (!pokemon) {
    return (
      <Text mx="2">There was a problem getting the Pokémon information</Text>
    );
  }

  // Get first Pokémon type
  const [firstType] = pokemon.types;

  return (
    <Layout>
      <Box bgColor={getTypeColor(firstType.type.name)} p="4" w="100%">
        <Image
          alt={pokemon.name}
          h="200px"
          resizeMode="contain"
          source={{ uri: pokemon.sprites.front_default! }}
          w="100%"
        />

        <Heading textTransform="capitalize">{pokemon.name}</Heading>
      </Box>

      <Stack p="4" space={4}>
        <Heading color="brand.200" fontSize="lg">
          About
        </Heading>

        <Stack space={1}>
          <Heading fontSize="sm">Height</Heading>

          <Text>{pokemon.height} dm</Text>
        </Stack>

        <Stack space={1}>
          <Heading fontSize="sm">Weight</Heading>

          <Text>{pokemon.weight} hg</Text>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default PokemonInfoScreen;
