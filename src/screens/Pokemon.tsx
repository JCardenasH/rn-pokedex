import {
  useNavigation,
  type StaticScreenProps,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Pokemon } from 'pokenode-ts';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, type ListRenderItem } from 'react-native';

import { Layout, Loader } from '@/components/common';
import { PokemonItem } from '@/components/pokemon';
import { useAllPokemon, useAppDispatch, usePokemonState } from '@/hooks';
import type { PokemonStackParamList } from '@/navigation/PokemonStack';
import { getPokemonThunk } from '@/store/slices/pokemon';

export type PokemonScreenNavigationProp = NativeStackNavigationProp<
  PokemonStackParamList,
  'Pokemon'
>;

type PokemonScreenProps = StaticScreenProps<undefined>;

/**
 * Pokémon screen component.
 */
export const PokemonScreen: React.FC<PokemonScreenProps> = () => {
  /**
   * Navigation prop.
   */
  const navigation = useNavigation();

  /**
   * App dispatch.
   */
  const dispatch = useAppDispatch();

  /**
   * Pokémon state.
   */
  const { loading, next, offset } = usePokemonState();

  /**
   * Pokémon list.
   */
  const pokemon = useAllPokemon();

  /**
   * Navigation - onDidFocus event side effect.
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(getPokemonThunk({ limit: 5, offset }));
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  /**
   * FlatList - onEndReached event handler.
   */
  const onEndReached = useCallback(() => {
    // Validates if there's a next URL stored in state
    if (next) {
      // Fetch next Pokémon page
      dispatch(getPokemonThunk({ url: next }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  /**
   * Render Pokémon item.
   */
  const renderItem: ListRenderItem<Pokemon> = useCallback(
    ({ item }) => <PokemonItem pokemon={item} />,
    [],
  );

  return (
    <Layout>
      <FlatList
        contentContainerStyle={styles.list}
        data={pokemon}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={<Loader isLoading={loading} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 5,
  },
});
