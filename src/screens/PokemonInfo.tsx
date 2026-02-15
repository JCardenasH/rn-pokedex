import {
  useNavigation,
  type StaticScreenProps,
} from '@react-navigation/native';
import type { Ability } from 'pokenode-ts';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { AbilitiesApi } from '@/api';
import { Layout, Loader } from '@/components/common';
import { PokemonAbilityInfo, PokemonTypeBadge } from '@/components/pokemon';
import { brand200 } from '@/constants/colors';
import { useSinglePokemon } from '@/hooks';
import { capitalizeName, getTypeColor } from '@/utils/pokemon';

export type PokemonInfoScreenProps = StaticScreenProps<{
  id: number;
}>;

/**
 * Pokémon info screen component.
 */
export const PokemonInfoScreen: React.FC<PokemonInfoScreenProps> = ({
  route,
}) => {
  /**
   * Navigation prop.
   */
  const navigation = useNavigation();

  /**
   * Selected Pokémon.
   */
  const pokemon = useSinglePokemon(route.params.id);

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
      } catch {
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
      <Text style={styles.errorText}>
        There was a problem getting the Pokémon information
      </Text>
    );
  }

  // Get first Pokémon type
  const [firstType] = pokemon.types;

  return (
    <Layout>
      <ScrollView
        style={{ backgroundColor: getTypeColor(firstType.type.name) }}
      >
        <View style={styles.header}>
          <Image
            accessibilityLabel={pokemon.name}
            resizeMode="contain"
            source={{ uri: pokemon.sprites.front_default! }}
            style={styles.heroImage}
          />

          <Text variant="headlineMedium" style={styles.pokemonName}>
            {pokemon.name}
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            About
          </Text>

          <Divider />

          {/* Pokémon height */}
          <View style={styles.fieldGroup}>
            <Text variant="labelLarge">Height</Text>
            <Text variant="bodyMedium">{pokemon.height} dm</Text>
          </View>

          {/* Pokémon weight */}
          <View style={styles.fieldGroup}>
            <Text variant="labelLarge">Weight</Text>
            <Text variant="bodyMedium">{pokemon.weight} hg</Text>
          </View>

          {/* Pokémon types */}
          <View style={styles.fieldGroupTypes}>
            <Text variant="labelLarge">Types</Text>

            <View style={styles.typesRow}>
              {pokemon.types.map((item, index) => (
                <PokemonTypeBadge key={`type-${index}`} item={item} />
              ))}
            </View>
          </View>

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Abilities
          </Text>

          <Divider />

          {loading ? (
            <Loader isLoading={loading} />
          ) : (
            <>
              {abilities.map((item, index) => (
                <PokemonAbilityInfo key={`ability-${index}`} ability={item} />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginHorizontal: 8,
  },
  header: {
    padding: 16,
    width: '100%',
  },
  heroImage: {
    height: 200,
    width: '100%',
  },
  pokemonName: {
    textTransform: 'capitalize',
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    color: brand200,
  },
  fieldGroup: {
    gap: 4,
  },
  fieldGroupTypes: {
    gap: 8,
  },
  typesRow: {
    flexDirection: 'row',
    gap: 8,
  },
});
