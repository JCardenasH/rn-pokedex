import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  ScrollView,
  SimpleGrid,
} from 'native-base';
import React, { useEffect, type FC } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PokemonTile from '../components/pokemon/PokemonTile';
import Routes from '../constants/routes';
import { useAllPokemon } from '../hooks/pokemon';
import { useAppDispatch } from '../hooks/store';
import { MainTabParamList } from '../navigation/MainTab';
import { getPokemon } from '../store/thunks/pokemon';

export type HomeScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  Routes.HOME_SCREEN
>;

const HomeScreen: FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const pokemon = useAllPokemon();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getPokemon({ limit: 4, offset: 0 }));
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  // const onPressItem = React.useCallback(() => {}, []);

  const items = React.useMemo(() => pokemon.slice(0, 4), [pokemon]);

  return (
    <Box bgColor="brand.400" flex={1}>
      <ScrollView _contentContainerStyle={{ p: 4 }} flex={1}>
        <HStack alignItems="center" justifyContent="space-between">
          <Heading>Pokedex</Heading>

          <Button
            _text={{ color: 'brand.300' }}
            colorScheme="black"
            rightIcon={<Icon as={FontAwesome} name="chevron-right" />}
            variant="ghost">
            See more
          </Button>
        </HStack>

        <SimpleGrid alignItems="center" columns={2} py="4" space={4}>
          {items.map((item, index) => (
            <PokemonTile key={`pokemon-${index}`} pokemon={item} />
          ))}
        </SimpleGrid>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
