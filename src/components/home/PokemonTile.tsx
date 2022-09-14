import { useNavigation } from '@react-navigation/native';
import { Box, Heading, Image } from 'native-base';
import type { Pokemon } from 'pokenode-ts';
import React, { memo, useCallback, type FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Routes from '../../constants/routes';
import { HomeScreenNavigationProp } from '../../screens/Home';
import { getTypeColor } from '../../utils/pokemon';

type Props = {
  pokemon: Pokemon;
};

const PokemonTile: FC<Props> = ({ pokemon }) => {
  const layout = useWindowDimensions();

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [mainType] = pokemon.types;

  const onPress = useCallback(() => {
    navigation.navigate(Routes.PokemonStack, {
      screen: Routes.PokemonInfoScreen,
      params: { id: pokemon.id },
      initial: false,
    });
  }, [navigation, pokemon]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.pressable}>
      <Box
        bgColor={getTypeColor(mainType.type.name)}
        borderRadius="lg"
        flex={1}
        m="2"
        p="2">
        <Image
          alt={pokemon.name}
          h={layout.width * 0.33}
          resizeMode="contain"
          source={{ uri: pokemon.sprites.front_default! }}
          w={layout.width * 0.33}
        />

        {/* Pokémon name */}
        <Heading
          color="brand.300"
          fontSize="lg"
          textAlign="center"
          textTransform="capitalize">
          {pokemon.name}
        </Heading>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressable: { flex: 1 },
});

export default memo(PokemonTile);
