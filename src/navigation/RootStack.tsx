import { StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Welcome';
import MainTab from './MainTab';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Welcome',
  screens: {
    /**
     * Welcome screen.
     */
    Welcome: WelcomeScreen,

    /**
     * Main tab navigator.
     */
    MainTab: MainTab,
  },
  screenOptions: {
    // Hide header
    headerShown: false,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

export default RootStack;
