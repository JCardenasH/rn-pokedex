import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type FC } from 'react';
import Routes from '../constants/routes';
import HomeScreen from '../screens/Home';

/**
 * Home stack navigator - Param list.
 */
export type HomeStackParamList = {
  /**
   * Home screen params.
   */
  [Routes.HomeScreen]: undefined;
};

/**
 * Home stack navigator.
 */
const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Home stack navigator component.
 */
const HomeStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // Hide back title
        headerBackTitleVisible: false,
        // Header background style
        headerStyle: { backgroundColor: '#222224' },
        // Header tint color
        headerTintColor: '#f0f0f0',
      }}>
      {/* Home list screen */}
      <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
