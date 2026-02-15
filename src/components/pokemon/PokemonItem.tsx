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
import type { PokemonScreenNavigationProp } from '@/screens/Pokemon';
import { shadow3 } from '@/styles/common';

import { PokemonTypeBadge } from './PokemonTypeBadge';

/**
 * Pokémon - List item component props.
 */
export interface PokemonItemProps {
  pokemon: Pokemon;
}

/**
 * Pokémon - List item component.
 *
 * @param props - Component props.
 */
export const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  /**
   * Window dimensions.
   */
  const layout = useWindowDimensions();

  /**
   * Navigation prop.
   */
  const navigation = useNavigation<PokemonScreenNavigationProp>();

  /**
   * Item - onPress event handler.
   *
   * Redirects to the information screen of the pressed Pokémon item.
   */
  const onPress = useCallback(() => {
    navigation.navigate('PokemonInfo', { id: pokemon.id });
  }, [navigation, pokemon]);

  const imageSize = layout.width * 0.25;

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.row, { opacity: pressed ? 0.75 : 1 }]}>
          {/* Pokémon image */}
          <Image
            accessibilityLabel={pokemon.name}
            resizeMode="contain"
            source={{ uri: pokemon.sprites.front_default! }}
            style={{ height: imageSize, width: imageSize }}
          />

          <View style={styles.info}>
            {/* Pokémon name */}
            <Text style={styles.name} variant="titleMedium">
              {pokemon.name}
            </Text>

            {/* Pokémon types */}
            <View style={styles.typesRow}>
              {pokemon.types.map((item, index) => (
                <PokemonTypeBadge key={`type-${index}`} item={item} />
              ))}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 6,
    paddingHorizontal: 4,
    ...shadow3,
  },
  info: {
    alignItems: 'flex-start',
    flex: 1,
    gap: 8,
    paddingRight: 4,
    paddingVertical: 6,
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
