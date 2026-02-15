import {
  type StaticScreenProps,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Images } from '@/constants/assets';

export type WelcomeScreenProps = StaticScreenProps<undefined>;

/**
 * Welcome screen - Component.
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
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
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#222224" />

      <View>
        <Image
          alt="Logo"
          resizeMode="contain"
          source={Images.Pokeball}
          style={styles.image}
        />

        <Button onPress={onPress}>Start</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%' },
});
