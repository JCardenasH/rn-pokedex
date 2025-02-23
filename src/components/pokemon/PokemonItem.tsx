import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, Image, Pressable, VStack } from 'native-base';
import type { Pokemon } from 'pokenode-ts';
import React, { memo, useCallback, type FC } from 'react';
import { useWindowDimensions } from 'react-native';
import type { PokemonScreenNavigationProp } from '../../screens/Pokemon';
import PokemonTypeBadge from './PokemonTypeBadge';

/**
 * Pokémon - List item component props.
 */
type Props = {
  pokemon: Pokemon;
};

/**
 * Pokémon - List item component.
 *
 * @param props - Component props.
 */
const PokemonItem: FC<Props> = ({ pokemon }) => {
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

  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <HStack
          bgColor="white"
          borderRadius="lg"
          mx={4}
          my={1.5}
          opacity={isPressed ? 0.75 : 1}
          px="1"
          shadow="3"
          space={2}>
          {/* Pokémon image */}
          <Image
            alt={pokemon.name}
            h={layout.width * 0.25}
            resizeMode="contain"
            source={{ uri: pokemon.sprites.front_default! }}
            w={layout.width * 0.25}
          />

          <VStack alignItems="flex-start" flex={1} pr={1} py={1.5} space={2}>
            {/* Pokémon name */}
            <Heading color="brand.300" fontSize="xl" textTransform="capitalize">
              {pokemon.name}
            </Heading>

            {/* Pokémon types */}
            <HStack space={2}>
              {pokemon.types.map((item, index) => (
                <PokemonTypeBadge key={`type-${index}`} item={item} />
              ))}
            </HStack>
          </VStack>
        </HStack>
      )}
    </Pressable>
  );
};

export default memo(PokemonItem);
