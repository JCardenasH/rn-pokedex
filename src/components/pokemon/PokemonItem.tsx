import { useNavigation } from '@react-navigation/native';
import { Badge, Heading, HStack, Image, VStack } from 'native-base';
import type { Pokemon } from 'pokenode-ts';
import React, { memo, useCallback, type FC } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import Routes from '../../constants/routes';
import { type PokemonScreenNavigationProp } from '../../screens/Pokemon';
import { getTypeColor } from '../../utils/pokemon';

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
    navigation.navigate(Routes.PokemonInfoScreen, { id: pokemon.id });
  }, [navigation, pokemon]);

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        bgColor="white"
        borderRadius="lg"
        mx={2}
        my={1.5}
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
          <Heading fontSize="xl" textTransform="capitalize">
            {pokemon.name}
          </Heading>

          {/* Pokémon types */}
          <HStack space={2}>
            {pokemon.types.map((item, index) => (
              <Badge
                _text={{ color: 'brand.300', textTransform: 'capitalize' }}
                bgColor={getTypeColor(item.type.name)}
                key={`type-${index}`}
                rounded="full">
                {item.type.name}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default memo(PokemonItem);
