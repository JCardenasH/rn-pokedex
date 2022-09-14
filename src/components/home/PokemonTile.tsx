import { useNavigation } from '@react-navigation/native';
import { Box, Heading, HStack, Image, Pressable, Stack } from 'native-base';
import type { Pokemon } from 'pokenode-ts';
import React, { memo, useCallback, type FC } from 'react';
import { useWindowDimensions } from 'react-native';
import Routes from '../../constants/routes';
import type { HomeScreenNavigationProp } from '../../screens/Home';
import PokemonTypeBadge from '../pokemon/PokemonTypeBadge';

/**
 * Pokémon - Home screen tile component.
 */
type Props = {
  pokemon: Pokemon;
};

/**
 * Pokémon - Home screen tile component.
 *
 * @param props - Component props.
 */
const PokemonTile: FC<Props> = ({ pokemon }) => {
  /**
   * Window dimensions.
   */
  const layout = useWindowDimensions();

  /**
   * Home screen navigation prop.
   */
  const navigation = useNavigation<HomeScreenNavigationProp>();

  /**
   * Tile - onPress event handler.
   */
  const onPress = useCallback(() => {
    navigation.navigate(Routes.PokemonStack, {
      // Set route name
      screen: Routes.PokemonInfoScreen,
      // Set Pokémon info screen params
      params: { id: pokemon.id },
      // Set the screen not to be the initial one in case there are no screens in the stack
      initial: false,
    });
  }, [navigation, pokemon]);

  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <Box
          bgColor="white"
          borderRadius="lg"
          m="2"
          opacity={isPressed ? 0.75 : 1}
          shadow="3">
          <Stack p="3" space={2}>
            <Image
              alt={pokemon.name}
              h={layout.width * 0.33}
              resizeMode="contain"
              source={{ uri: pokemon.sprites.front_default! }}
              w={layout.width * 0.33}
            />

            {/* Pokémon types */}
            <HStack space={2}>
              {pokemon.types.map((item, index) => (
                <PokemonTypeBadge key={`type-${index}`} item={item} />
              ))}
            </HStack>

            {/* Pokémon name */}
            <Heading color="brand.300" fontSize="lg" textTransform="capitalize">
              {pokemon.name}
            </Heading>
          </Stack>
        </Box>
      )}
    </Pressable>
  );
};

export default memo(PokemonTile);
