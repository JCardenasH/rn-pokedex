import type { PokemonType } from 'pokenode-ts';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { brand300 } from '@/constants/colors';
import { getTypeColor } from '@/utils/pokemon';

export interface PokemonTypeBadgeProps {
  item: PokemonType;
}

export const PokemonTypeBadge: React.FC<PokemonTypeBadgeProps> = ({ item }) => (
  <View
    style={[styles.badge, { backgroundColor: getTypeColor(item.type.name) }]}
  >
    <Text style={styles.text}>{item.type.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  text: {
    color: brand300,
    fontSize: 10,
    textTransform: 'capitalize',
  },
});
