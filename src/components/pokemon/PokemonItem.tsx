import { Badge, Heading, HStack, Image, VStack } from 'native-base';
import { type Pokemon } from 'pokenode-ts';
import React, { memo, type FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { getTypeColor } from '../../constants/pokemon';

type Props = {
  pokemon: Pokemon;
};

const PokemonItem: FC<Props> = ({ pokemon }) => {
  const layout = useWindowDimensions();

  return (
    <HStack
      bgColor="white"
      borderRadius="lg"
      mx={2}
      my={1.5}
      px="1"
      shadow="3"
      space={2}>
      <Image
        alt={pokemon.name}
        h={layout.width * 0.25}
        resizeMode="contain"
        source={{ uri: pokemon.sprites.front_default! }}
        w={layout.width * 0.25}
      />

      <VStack alignItems="flex-start" flex={1} pr={1} py={1.5} space={2}>
        {/* Pokemon name */}
        <Heading fontSize="xl" textTransform="capitalize">
          {pokemon.name}
        </Heading>

        {/* Pokemon types */}
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
  );
};

export default memo(PokemonItem);
