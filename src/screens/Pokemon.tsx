import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, FlatList } from 'native-base';
import { type Pokemon } from 'pokenode-ts';
import React, { useCallback, useEffect, type FC } from 'react';
import { ListRenderItemInfo, RefreshControl, StyleSheet } from 'react-native';
import ListFooter from '../components/common/ListFooter';
import PokemonItem from '../components/pokemon/PokemonItem';
import Routes from '../constants/routes';
import { useAllPokemon, usePokemonState } from '../hooks/pokemon';
import { useAppDispatch } from '../hooks/store';
import { PokemonStackParamList } from '../navigation/PokemonStack';
import { getPokemon } from '../store/thunks/pokemon';

export type PokemonScreenNavigationProp = NativeStackNavigationProp<
  PokemonStackParamList,
  Routes.POKEMON_SCREEN
>;

/**
 * Pokemon screen component
 */
const PokemonScreen: FC = () => {
  const navigation = useNavigation<PokemonScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const { loading, next, limit, offset } = usePokemonState();

  const pokemon = useAllPokemon();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getPokemon({ limit, offset }));
    });

    return unsubscribe;
  }, [dispatch, navigation, limit, offset]);

  /**
   * Flatlist - onEndReached event handler.
   */
  const onEndReached = useCallback(() => {
    // Validates if there's a next URL stored in state
    if (next) {
      // Fetch next page Pokemon
      dispatch(getPokemon({ url: next }));
    }
  }, [dispatch, next]);

  /**
   * Render Pokemon item.
   */
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Pokemon>) => <PokemonItem pokemon={item} />,
    [],
  );

  return (
    <Box bgColor="brand.400" flex={1} safeArea>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#f00000']}
            enabled={false}
            refreshing={loading}
          />
        }
        contentContainerStyle={styles.list}
        data={pokemon}
        keyExtractor={item => `${item.id}`}
        ListFooterComponent={<ListFooter isLoading={loading} />}
        onEndReached={onEndReached}
        renderItem={renderItem}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
});

export default PokemonScreen;
