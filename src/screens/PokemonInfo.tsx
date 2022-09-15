import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import type { Ability } from 'pokenode-ts';
import React, { useCallback, useEffect, useState, type FC } from 'react';
import { Alert } from 'react-native';
import AbilitiesApi from '../api/abilities';
import Layout from '../components/common/Layout';
import Spinner from '../components/common/Spinner';
import PokemonAbilityInfo from '../components/pokemon/PokemonAbilityInfo';
import PokemonTypeBadge from '../components/pokemon/PokemonTypeBadge';
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
   * Is loading abilities? state.
   */
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Pokémon abilities list state.
   */
  const [abilities, setAbilities] = useState<Ability[]>([]);

  /**
   * Selected Pokémon side effect.
   */
  useEffect(() => {
    // Check if the selected Pokémon exists.
    if (pokemon) {
      // Set Pokémon name as the header title text
      navigation.setOptions({ title: capitalizeName(pokemon.name, true) });
      // Get abilities
      getAbilities();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  /**
   * Get Pokémon abilities.
   */
  const getAbilities = useCallback(async () => {
    if (pokemon) {
      try {
        const items: Ability[] = [];

        for (const item of pokemon.abilities) {
          const response = await AbilitiesApi.getAbilityInfo(item.ability.name);

          items.push(response.data);
        }

        setAbilities(items);
      } catch (error) {
        Alert.alert(
          'Abilities',
          'There was an error while fetching the Pokémon abilities',
        );
      } finally {
        setLoading(false);
      }
    }
  }, [pokemon]);

  // If the selected Pokémon doesn't exist or an error occurred, it will display an error text
  if (!pokemon) {
    return (
      <Text mx="2">There was a problem getting the Pokémon information</Text>
    );
  }

  console.log(abilities);

  // Get first Pokémon type
  const [firstType] = pokemon.types;

  return (
    <Layout>
      <ScrollView>
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

          <Divider />

          <Stack space={1}>
            <Heading fontSize="sm">Height</Heading>

            <Text>{pokemon.height} dm</Text>
          </Stack>

          <Stack space={1}>
            <Heading fontSize="sm">Weight</Heading>

            <Text>{pokemon.weight} hg</Text>
          </Stack>

          <Stack space={2}>
            <Heading fontSize="sm">Types</Heading>

            {/* Pokémon types */}
            <HStack space={2}>
              {pokemon.types.map((item, index) => (
                <PokemonTypeBadge key={`type-${index}`} item={item} />
              ))}
            </HStack>
          </Stack>

          <Heading color="brand.200" fontSize="lg">
            Abilities
          </Heading>

          <Divider />

          {loading ? (
            <Spinner isLoading={loading} />
          ) : (
            <>
              {abilities.map((item, index) => (
                <PokemonAbilityInfo key={`ability-${index}`} ability={item} />
              ))}
            </>
          )}
        </Stack>
      </ScrollView>
    </Layout>
  );
};

export default PokemonInfoScreen;
