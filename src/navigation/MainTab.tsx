import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Octicons from '@react-native-vector-icons/octicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { StaticParamList } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon, Image } from 'native-base';
import { Images } from '../constants/assets';
import HomeStack from './HomeStack';
import ItemsStack from './ItemsStack';
import PokemonStack from './PokemonStack';
import type { RootStackParamList } from './RootStack';
import { StatusBar } from 'react-native';

const MainTab = createBottomTabNavigator({
  initialRouteName: 'HomeStack',
  screenLayout(props) {
    return (
      <>
        {/* Status bar */}
        <StatusBar backgroundColor="#222224" barStyle="light-content" />

        {props.children}
      </>
    );
  },
  screens: {
    /**
     * Items stack navigator.
     */
    ItemsStack: {
      screen: ItemsStack,
      options: {
        tabBarIcon({ color, size }) {
          return (
            <Icon
              as={MaterialDesignIcons}
              color={color}
              name="bag-personal"
              size={size}
            />
          );
        },
      },
    },

    /**
     * Home stack navigator.
     */
    HomeStack: {
      screen: HomeStack,
      options: {
        tabBarIcon({ color, size }) {
          return <Icon as={Octicons} color={color} name="home" size={size} />;
        },
      },
    },

    /**
     * Pokémon stack navigator.
     */
    PokemonStack: {
      screen: PokemonStack,
      options: {
        tabBarIcon({ color, size }) {
          return (
            <Image
              alt="Pokeball"
              h={`${size}px`}
              tintColor={color}
              source={Images.Pokeball}
              w={`${size}px`}
            />
          );
        },
      },
    },
  },
  screenOptions: {
    // Hide header
    headerShown: false,

    // Hide tab bar labels
    tabBarShowLabel: false,

    // Tab bar - Active background color
    tabBarActiveBackgroundColor: '#f00000',
    // Tab bar - Active tint color
    tabBarActiveTintColor: '#f0f0f0',

    // Tab bar - Inactive background color
    tabBarInactiveBackgroundColor: '#f00000',
    // Tab bar - Inactive tint color
    tabBarInactiveTintColor: '#222224',

    // Tab bar - Styles.
    tabBarStyle: { backgroundColor: '#f00000' },
  },
});

export type MainTabParamList = StaticParamList<typeof MainTab>;

export type MainTabNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTab'
>;

export default MainTab;
