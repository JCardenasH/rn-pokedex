import { type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Center, HStack, ScrollView, Stack } from 'native-base';
import React, { useCallback, useEffect, type FC } from 'react';
import Layout from '../components/common/Layout';
import Spinner from '../components/common/Spinner';
import PokemonTile from '../components/home/PokemonTile';
import SectionHeader from '../components/home/SectionHeader';
import ItemTile from '../components/items/ItemTile';
import Routes from '../constants/routes';
import { useAllItems, useItemsState } from '../hooks/items';
import { useAllPokemon, usePokemonState } from '../hooks/pokemon';
import { useAppDispatch } from '../hooks/store';
import { type HomeStackParamList } from '../navigation/HomeStack';
import { type MainTabParamList } from '../navigation/MainTab';
import { getItemsThunk } from '../store/slices/items';
import { getPokemonThunk } from '../store/slices/pokemon';

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, Routes.HomeStack>,
  NativeStackNavigationProp<HomeStackParamList, Routes.HomeScreen>
>;

const HomeScreen: FC = () => {
  /**
   * Navigation prop.
   */
  const navigation = useNavigation<HomeScreenNavigationProp>();

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

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  /**
   * Pokémon section header - See more button - onPress event handler.
   */
  const onPressPokemon = useCallback(() => {
    navigation.navigate(Routes.PokemonStack, {
      screen: Routes.PokemonScreen,
    });
  }, [navigation]);

  /**
   * Items section header - See more button - onPress event handler.
   */
  const onPressItems = useCallback(() => {
    navigation.navigate(Routes.ItemsStack, {
      screen: Routes.ItemsScreen,
    });
  }, [navigation]);

  return (
    <Layout>
      <ScrollView _contentContainerStyle={{ p: 4 }} nestedScrollEnabled>
        <Stack space={2}>
          <Box>
            <SectionHeader title="Pokedex" onPressMore={onPressPokemon} />

            <Spinner isLoading={isLoadingPokemons} />

            {!isLoadingPokemons && (
              <HStack flexWrap="wrap" justifyContent="space-around">
                {pokemon.slice(0, 4).map((item, index) => (
                  <Center key={`pokemon-${index}`} w="50%">
                    <PokemonTile pokemon={item} />
                  </Center>
                ))}
              </HStack>
            )}
          </Box>

          <Box>
            <SectionHeader title="Items" onPressMore={onPressItems} />

            <Spinner isLoading={isLoadingItems} />

            {!isLoadingItems && (
              <HStack flexWrap="wrap" justifyContent="space-around">
                {items.slice(0, 4).map((item, index) => (
                  <Center key={`item-${index}`} w="50%">
                    <ItemTile item={item} />
                  </Center>
                ))}
              </HStack>
            )}
          </Box>
        </Stack>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
