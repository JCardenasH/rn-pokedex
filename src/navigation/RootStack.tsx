import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type FC } from 'react';
import Routes from '../constants/routes';
import WelcomeScreen from '../screens/Welcome';
import MainTab from './MainTab';

/**
 * Root stack navigator - Param list.
 */
export type RootStackParamList = {
  /**
   * Welcome screen params.
   */
  [Routes.WELCOME_SCREEN]: undefined;

  /**
   * Main tab navigator params.
   */
  [Routes.MAIN_TAB]: undefined;
};

/**
 * Root stack navigator.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root stack navigator component.
 */
const RootStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Welcome screen */}
      <Stack.Screen name={Routes.WELCOME_SCREEN} component={WelcomeScreen} />

      {/* Main tab navigator */}
      <Stack.Screen name={Routes.MAIN_TAB} component={MainTab} />
    </Stack.Navigator>
  );
};

export default RootStack;
