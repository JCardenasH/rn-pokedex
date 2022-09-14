import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Center, HStack, ScrollView } from 'native-base';
import React, { useCallback, useEffect, type FC } from 'react';
import Layout from '../components/common/Layout';
import Spinner from '../components/common/Spinner';
import PokemonTile from '../components/home/PokemonTile';
import SectionHeader from '../components/home/SectionHeader';
import Routes from '../constants/routes';
import { useAllPokemon, usePokemonState } from '../hooks/pokemon';
import { useAppDispatch } from '../hooks/store';
import { type HomeStackParamList } from '../navigation/HomeStack';
import { type MainTabParamList } from '../navigation/MainTab';
import { actions as pokemonActions } from '../store/slices/pokemon';

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, Routes.HomeStack>,
  NativeStackNavigationProp<HomeStackParamList, Routes.HomeScreen>
>;

const HomeScreen: FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const { loading } = usePokemonState();

  const pokemon = useAllPokemon();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(pokemonActions.getPokemon({ limit: 10, offset: 0 }));
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  const onPressPokemon = useCallback(() => {
    navigation.navigate(Routes.PokemonStack, {
      screen: Routes.PokemonScreen,
    });
  }, [navigation]);

  return (
    <Layout>
      <ScrollView _contentContainerStyle={{ p: 4 }} nestedScrollEnabled>
        <SectionHeader title="Pokedex" onPressMore={onPressPokemon} />

        <Spinner isLoading={loading} />

        {!loading && (
          <HStack flexWrap="wrap" justifyContent="space-around">
            {pokemon.slice(0, 4).map((item, index) => (
              <Center key={`pokemon-${index}`} w="50%">
                <PokemonTile pokemon={item} />
              </Center>
            ))}
          </HStack>
        )}
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
