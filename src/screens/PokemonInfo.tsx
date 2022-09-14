import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Heading, Image, Stack, Text } from 'native-base';
import React, { useEffect, type FC } from 'react';
import Layout from '../components/common/Layout';
import Routes from '../constants/routes';
import { useSinglePokemon } from '../hooks/pokemon';
import { PokemonStackParamList } from '../navigation/PokemonStack';
import { capitalizeName, getTypeColor } from '../utils/pokemon';

export type PokemonInfoScreenNavigationProp = NativeStackNavigationProp<
  PokemonStackParamList,
  Routes.PokemonInfoScreen
>;

export type PokemonInfoScreenRoute = RouteProp<
  PokemonStackParamList,
  Routes.PokemonInfoScreen
>;

const PokemonInfoScreen: FC = () => {
  const navigation = useNavigation<PokemonInfoScreenNavigationProp>();

  const { params } = useRoute<PokemonInfoScreenRoute>();

  const pokemon = useSinglePokemon(params.id);

  useEffect(() => {
    if (pokemon) {
      navigation.setOptions({ title: capitalizeName(pokemon.name, true) });
    }
  }, [pokemon, navigation]);

  if (!pokemon) {
    return <Text>There was a problem getting the Pokémon information</Text>;
  }

  // Main Pokémon type
  const [pokemonType] = pokemon.types;

  return (
    <Layout>
      <Box bgColor={getTypeColor(pokemonType.type.name)} p="4" w="100%">
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

          <Text>{pokemon.height} hg</Text>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default PokemonInfoScreen;
