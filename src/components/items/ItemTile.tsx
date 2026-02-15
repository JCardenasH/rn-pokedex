import { type Item } from 'pokenode-ts';
import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';

import { brand300 } from '@/constants/colors';
import { shadow3 } from '@/styles/common';

/**
 * Item - Tile component.
 */
export interface ItemTileProps {
  item: Item;
}

/**
 * Item - Tile component.
 *
 * @param props - Component props.
 */
export const ItemTile: React.FC<ItemTileProps> = ({ item }) => {
  /**
   * Window dimensions.
   */
  const layout = useWindowDimensions();

  const imageSize = layout.width * 0.33;

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Item image */}
        <Image
          accessibilityLabel={item.name}
          resizeMode="contain"
          source={{ uri: item.sprites.default! }}
          style={{ height: imageSize, width: imageSize }}
        />

        {/* Item name */}
        <Text variant="titleMedium" style={styles.name}>
          {item.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    ...shadow3,
  },
  content: {
    gap: 8,
    padding: 12,
  },
  name: {
    color: brand300,
    textTransform: 'capitalize',
  },
});
