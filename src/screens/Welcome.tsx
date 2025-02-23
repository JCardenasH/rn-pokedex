import {
  useNavigation,
  type StaticScreenProps,
} from '@react-navigation/native';
import { Box, Button, Image, Stack, StatusBar } from 'native-base';
import React, { useCallback, type FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { Images } from '../constants/assets';

type Props = StaticScreenProps<undefined>;

/**
 * Welcome screen - Component.
 */
const WelcomeScreen: FC<Props> = () => {
  /**
   * Window dimensions.
   */
  const layout = useWindowDimensions();

  /**
   * Navigation prop.
   */
  const navigation = useNavigation();

  /**
   * Start button - onPress event handler.
   *
   * Navigates to Main tab navigator on press.
   */
  const onPress = useCallback(() => {
    // Navigate to Main tab navigator
    navigation.navigate('MainTab');
  }, [navigation]);

  return (
    <Box bgColor="brand.400" justifyContent="center" safeArea flex={1}>
      <StatusBar barStyle="dark-content" backgroundColor="#222224" />

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
