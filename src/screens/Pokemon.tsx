import {
  useNavigation,
  type StaticScreenProps,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Pokemon } from 'pokenode-ts';
import React, { useCallback, useEffect, type FC } from 'react';
import { FlatList, StyleSheet, type ListRenderItem } from 'react-native';
import Layout from '../components/common/Layout';
import Loader from '../components/common/Loader';
import PokemonItem from '../components/pokemon/PokemonItem';
import { useAllPokemon, usePokemonState } from '../hooks/pokemon';
import { useAppDispatch } from '../hooks/store';
import type { PokemonStackParamList } from '../navigation/PokemonStack';
import { getPokemonThunk } from '../store/slices/pokemon';

export type PokemonScreenNavigationProp = NativeStackNavigationProp<
  PokemonStackParamList,
  'Pokemon'
>;

type Props = StaticScreenProps<undefined>;

/**
 * Pokémon screen component.
 */
const PokemonScreen: FC<Props> = () => {
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

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  /**
   * Flatlist - onEndReached event handler.
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

export default PokemonScreen;
