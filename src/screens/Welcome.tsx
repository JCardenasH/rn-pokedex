import { type StaticScreenProps } from '@react-navigation/native';
import React, { useCallback, type FC } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Images } from '@/constants/assets';

type Props = StaticScreenProps<undefined>;

/**
 * Welcome screen - Component.
 */
const WelcomeScreen: FC<Props> = () => {
  /**
   * Start button - onPress event handler.
   *
   * Navigates to Main tab navigator on press.
   */
  const onPress = useCallback(() => {
    // Navigate to Main tab navigator
    // navigation.navigate('MainTab');
  }, []);

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#222224" />

      <View>
        <Image alt="Logo" resizeMode="contain" source={Images.Pokeball} />

        <Button onPress={onPress}>Start</Button>
      </View>
    </View>
  );
};

export default WelcomeScreen;
