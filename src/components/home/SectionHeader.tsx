import FontAwesome from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { brand300 } from '@/constants/colors';

export interface SectionHeaderProps {
  onPressMore: () => void;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  onPressMore,
  title,
}) => (
  <View style={styles.container}>
    {/* Header title */}
    <Text variant="titleLarge">{title}</Text>

    <Button
      mode="text"
      onPress={onPressMore}
      textColor={brand300}
      contentStyle={styles.button}
      icon={({ size, color }) => (
        <FontAwesome
          name="chevron-right"
          iconStyle="solid"
          size={size}
          color={color}
        />
      )}
    >
      See more
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row-reverse',
  },
});
