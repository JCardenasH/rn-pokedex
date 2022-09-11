import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { type FC } from 'react';
import Routes from '../constants/routes';
import HomeScreen from '../screens/Home';

/**
 * Main tab navigator - Params list.
 */
export type MainTabParamList = {
  /**
   * Home screen params.
   */
  [Routes.HOME_SCREEN]: undefined;
};

/**
 * Main tab navigator.
 */
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main tab navigator component.
 */
const MainTab: FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainTab;
