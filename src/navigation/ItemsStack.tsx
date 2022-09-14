import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React, { type FC } from 'react';
import Routes from '../constants/routes';
import ItemsScreen from '../screens/Items';

/**
 * Items stack navigator - Param list.
 */
export type ItemsStackParamList = {
  /**
   * Items screen params.
   */
  [Routes.ItemsScreen]: undefined;
};

/**
 * Items stack navigator.
 */
const Stack = createNativeStackNavigator<ItemsStackParamList>();

/**
 * Items stack navigator - Screen options.
 */
const screenOptions: NativeStackNavigationOptions = {
  // Hide back title
  headerBackTitleVisible: false,
  // Header background style
  headerStyle: { backgroundColor: '#222224' },
  // Header tint color
  headerTintColor: '#f0f0f0',
};

/**
 * Items stack navigator component.
 */
const ItemsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* Items list screen */}
      <Stack.Screen
        name={Routes.ItemsScreen}
        component={ItemsScreen}
        options={{ title: 'Items' }}
      />
    </Stack.Navigator>
  );
};

export default ItemsStack;
