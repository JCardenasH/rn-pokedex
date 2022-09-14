import { Badge } from 'native-base';
import type { PokemonType } from 'pokenode-ts';
import React, { memo, type FC } from 'react';
import { getTypeColor } from '../../utils/pokemon';

type Props = {
  item: PokemonType;
};

const PokemonTypeBadge: FC<Props> = ({ item }) => {
  return (
    <Badge
      _text={{
        color: 'brand.300',
        fontSize: '2xs',
        textTransform: 'capitalize',
      }}
      bgColor={getTypeColor(item.type.name)}
      rounded="full">
      {item.type.name}
    </Badge>
  );
};

export default memo(PokemonTypeBadge);
