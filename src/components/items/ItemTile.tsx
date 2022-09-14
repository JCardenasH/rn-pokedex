import { Box, Heading, Image, Stack } from 'native-base';
import { type Item } from 'pokenode-ts';
import React, { memo, type FC } from 'react';
import { useWindowDimensions } from 'react-native';

/**
 * Item - Tile component.
 */
type Props = {
  item: Item;
};

/**
 * Item - Tile component.
 *
 * @param props - Component props.
 */
const ItemTile: FC<Props> = ({ item }) => {
  /**
   * Window dimensions.
   */
  const layout = useWindowDimensions();

  return (
    <Box bgColor="white" borderRadius="lg" m="2" shadow="3">
      <Stack p="3" space={2}>
        {/* Item image */}
        <Image
          alt={item.name}
          h={layout.width * 0.33}
          resizeMode="contain"
          source={{ uri: item.sprites.default! }}
          w={layout.width * 0.33}
        />

        {/* Item name */}
        <Heading color="brand.300" fontSize="lg" textTransform="capitalize">
          {item.name}
        </Heading>
      </Stack>
    </Box>
  );
};

export default memo(ItemTile);
