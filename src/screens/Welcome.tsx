import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Image, Stack, StatusBar } from 'native-base';
import React, { useCallback, type FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { Images } from '../constants/assets';
import Routes from '../constants/routes';
import type { RootStackParamList } from '../navigation/RootStack';

/**
 * Welcome screen - Navigation prop.
 */
type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Routes.WelcomeScreen
>;

/**
 * Welcome screen - Component.
 */
const WelcomeScreen: FC = () => {
  /**
   * Window dimensions.
   */
  const layout = useWindowDimensions();

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
    navigation.navigate(Routes.MainTab);
  }, [navigation]);

  return (
    <Box bgColor="brand.400" justifyContent="center" safeArea flex={1}>
      <StatusBar backgroundColor="#222224" />

      <Stack space={16}>
        <Image
          alt="Logo"
          alignSelf="center"
          h={layout.width * 0.8}
          resizeMode="contain"
          source={Images.Pokeball}
          w={layout.width * 0.8}
        />

        <Button
          _text={{ textTransform: 'uppercase' }}
          alignSelf="center"
          bgColor="brand.200"
          colorScheme="red"
          onPress={onPress}
          mx="16"
          w="80%">
          Start
        </Button>
      </Stack>
    </Box>
  );
};

export default WelcomeScreen;
