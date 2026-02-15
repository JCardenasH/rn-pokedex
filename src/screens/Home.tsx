import {
  useNavigation,
  type StaticScreenProps,
} from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Layout, Loader } from '@/components/common';
import { PokemonTile, SectionHeader } from '@/components/home';
import { ItemTile } from '@/components/items';
import { useAllItems, useItemsState } from '@/hooks/items';
import { useAllPokemon, usePokemonState } from '@/hooks/pokemon';
import { useAppDispatch } from '@/hooks/store';
import type { HomeStackNavigationProp } from '@/navigation/HomeStack';
import { getItemsThunk } from '@/store/slices/items';
import { getPokemonThunk } from '@/store/slices/pokemon';

export type HomeScreenProps = StaticScreenProps<undefined>;

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  /**
   * Navigation prop.
   */
  const navigation = useNavigation<HomeStackNavigationProp>();

  /**
   * Dispatch.
   */
  const dispatch = useAppDispatch();

  /**
   * Pokémon state.
   */
  const { loading: isLoadingPokemons } = usePokemonState();

  /**
   * Items state.
   */
  const { loading: isLoadingItems } = useItemsState();

  /**
   * Pokémon list.
   */
  const pokemon = useAllPokemon();

  /**
   * Items list.
   */
  const items = useAllItems();

  /**
   * Navigation onDidFocus event side effect.
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (pokemon.length === 0) {
        // Get first 10 Pokémon
        dispatch(getPokemonThunk({ limit: 4, offset: 0 }));
      }

      if (items.length === 0) {
        // Get first 10 items
        dispatch(getItemsThunk({ limit: 4, offset: 0 }));
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  /**
   * Pokémon section header - See more button - onPress event handler.
   */
  const onPressPokemon = useCallback(() => {
    navigation.navigate('PokemonStack', {
      screen: 'Pokemon',
    });
  }, [navigation]);

  /**
   * Items section header - See more button - onPress event handler.
   */
  const onPressItems = useCallback(() => {
    navigation.navigate('ItemsStack', {
      screen: 'Items',
    });
  }, [navigation]);

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
      >
        <View style={styles.sections}>
          <View>
            <SectionHeader title="Pokedex" onPressMore={onPressPokemon} />

            <Loader isLoading={isLoadingPokemons} />

            {!isLoadingPokemons && (
              <View style={styles.grid}>
                {pokemon.slice(0, 4).map((item, index) => (
                  <View key={`pokemon-${index}`} style={styles.gridItem}>
                    <PokemonTile pokemon={item} />
                  </View>
                ))}
              </View>
            )}
          </View>

          <View>
            <SectionHeader title="Items" onPressMore={onPressItems} />

            <Loader isLoading={isLoadingItems} />

            {!isLoadingItems && (
              <View style={styles.grid}>
                {items.slice(0, 4).map((item, index) => (
                  <View key={`item-${index}`} style={styles.gridItem}>
                    <ItemTile item={item} />
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  sections: {
    gap: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    width: '50%',
    alignItems: 'center',
  },
});
