import type { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type FC } from 'react';
import Routes from '../constants/routes';
import WelcomeScreen from '../screens/Welcome';
import MainTab, { type MainTabParamList } from './MainTab';

/**
 * Root stack navigator - Param list.
 */
export type RootStackParamList = {
  /**
   * Welcome screen params.
   */
  [Routes.WelcomeScreen]: undefined;

  /**
   * Main tab navigator params.
   */
  [Routes.MainTab]: NavigatorScreenParams<MainTabParamList>;
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
      <Stack.Screen name={Routes.WelcomeScreen} component={WelcomeScreen} />

      {/* Main tab navigator */}
      <Stack.Screen name={Routes.MainTab} component={MainTab} />
    </Stack.Navigator>
  );
};

export default RootStack;
