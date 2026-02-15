import { useNavigation } from '@react-navigation/native';
import type { Pokemon } from 'pokenode-ts';
import React, { useCallback } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

import { brand300 } from '@/constants/colors';
import type { HomeStackNavigationProp } from '@/navigation/HomeStack';
import { shadow3 } from '@/styles/common';

import { PokemonTypeBadge } from '../pokemon';

/**
 * Pokémon - Home screen tile component.
 */
export interface PokemonTileProps {
  pokemon: Pokemon;
}

/**
 * Pokémon - Home screen tile component.
 *
 * @param props - Component props.
 */
export const PokemonTile: React.FC<PokemonTileProps> = ({ pokemon }) => {
  /**
   * Window dimensions.
   */
  const layout = useWindowDimensions();

  /**
   * Home screen navigation prop.
   */
  const navigation = useNavigation<HomeStackNavigationProp>();

  /**
   * Tile - onPress event handler.
   */
  const onPress = useCallback(() => {
    navigation.navigate('PokemonStack', {
      // Set route name
      screen: 'PokemonInfo',
      // Set Pokémon info screen params
      params: { id: pokemon.id },
      // Set the screen not to be the initial one in case there are no screens in the stack
      initial: false,
    });
  }, [navigation, pokemon]);

  const imageSize = layout.width * 0.33;

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.card, { opacity: pressed ? 0.75 : 1 }]}>
          <View style={styles.content}>
            <Image
              accessibilityLabel={pokemon.name}
              resizeMode="contain"
              source={{ uri: pokemon.sprites.front_default! }}
              style={{ height: imageSize, width: imageSize }}
            />

            {/* Pokémon types */}
            <View style={styles.typesRow}>
              {pokemon.types.map((item, index) => (
                <PokemonTypeBadge key={`type-${index}`} item={item} />
              ))}
            </View>

            {/* Pokémon name */}
            <Text style={styles.name} variant="titleMedium">
              {pokemon.name}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    ...shadow3,
  },
  content: {
    gap: 8,
    padding: 12,
  },
  typesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  name: {
    color: brand300,
    textTransform: 'capitalize',
  },
});
