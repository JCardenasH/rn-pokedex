import { Heading, Stack, Text } from 'native-base';
import type { Ability } from 'pokenode-ts';
import React, { useMemo, type FC } from 'react';
import { capitalizeName } from '../../utils/pokemon';

type Props = {
  ability: Ability;
  language?: string;
};

const PokemonAbilityInfo: FC<Props> = ({ ability, language = 'en' }) => {
  /**
   * Name.
   *
   * Searchs the name based on the selected language.
   * If not exists, it will return the entity name
   */
  const name = useMemo(() => {
    const match = ability.names.find(item => item.language.name === language);

    return match ? match.name : capitalizeName(ability.name);
  }, [ability, language]);

  /**
   * Effect description.
   *
   * Searchs the effect entry based on the selected language.
   * If not exists, it will return the first entry.
   */
  const description = useMemo(() => {
    const match = ability.effect_entries.find(
      item => item.language.name === language,
    );

    return match ? match.effect : ability.effect_entries[0].effect;
  }, [ability, language]);

  return (
    <Stack space={2}>
      <Heading fontSize="sm">{name}</Heading>

      <Text>{description}</Text>
    </Stack>
  );
};

export default PokemonAbilityInfo;
