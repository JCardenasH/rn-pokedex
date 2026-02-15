import type { Ability } from 'pokenode-ts';
import React, { useMemo, type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { capitalizeName } from '@/utils/pokemon';

export interface PokemonAbilityInfoProps {
  ability: Ability;
  language?: string;
}

export const PokemonAbilityInfo: FC<PokemonAbilityInfoProps> = ({
  ability,
  language = 'en',
}) => {
  /**
   * Name.
   *
   * Searches the name based on the selected language.
   * If not exists, it will return the entity name
   */
  const name = useMemo(() => {
    const match = ability.names.find(item => item.language.name === language);

    return match ? match.name : capitalizeName(ability.name);
  }, [ability, language]);

  /**
   * Effect description.
   *
   * Searches the effect entry based on the selected language.
   * If not exists, it will return the first entry.
   */
  const description = useMemo(() => {
    const match = ability.effect_entries.find(
      item => item.language.name === language,
    );

    return match ? match.effect : ability.effect_entries[0].effect;
  }, [ability, language]);

  return (
    <View style={styles.container}>
      <Text variant="labelLarge">{name}</Text>
      <Text variant="bodyMedium">{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
