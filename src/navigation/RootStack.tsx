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
  [Routes.WelcomeScreen]: undefined;

  /**
   * Main tab navigator params.
   */
  [Routes.MainTab]: undefined;
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
