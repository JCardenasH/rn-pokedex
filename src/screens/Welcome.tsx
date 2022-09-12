import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button } from 'native-base';
import React, { useCallback, type FC } from 'react';
import Routes from '../constants/routes';
import { RootStackParamList } from '../navigation/RootStack';

/**
 * Welcome screen - Navigation prop.
 */
type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Routes.WELCOME_SCREEN
>;

/**
 * Welcome screen - Component.
 */
const WelcomeScreen: FC = () => {
  /**
   * Navigation prop.
   */
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  /**
   * Start button - onPress event handler.
   *
   * Navigates to Main tab navigator on press.
   */
  const onPress = useCallback(() => {
    // Navigate to Main tab navigator
    navigation.navigate(Routes.MAIN_TAB);
  }, [navigation]);

  return (
    <Box bgColor="white" safeArea flex={1}>
      <Button alignSelf="center" onPress={onPress}>
        Iniciar
      </Button>
    </Box>
  );
};

export default WelcomeScreen;
