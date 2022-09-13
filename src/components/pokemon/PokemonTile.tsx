import { Box, Heading, Image } from 'native-base';
import { type Pokemon } from 'pokenode-ts';
import React, { memo, type FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { getTypeColor } from '../../constants/pokemon';

type Props = {
  pokemon: Pokemon;
};

const PokemonTile: FC<Props> = ({ pokemon }) => {
  const layout = useWindowDimensions();

  const [mainType] = pokemon.types;

  return (
    <Box
      bgColor={getTypeColor(mainType.type.name)}
      borderRadius="lg"
      flex={1}
      p="2">
      <Image
        alt={pokemon.name}
        h={layout.width * 0.33}
        resizeMode="contain"
        source={{ uri: pokemon.sprites.front_default! }}
        w={layout.width * 0.33}
      />

      {/* Pokemon name */}
      <Heading
        color="brand.300"
        fontSize="lg"
        textAlign="center"
        textTransform="capitalize">
        {pokemon.name}
      </Heading>
    </Box>
  );
};

export default memo(PokemonTile);
