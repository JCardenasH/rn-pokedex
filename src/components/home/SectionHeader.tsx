import { Button, Heading, HStack, Icon } from 'native-base';
import React, { FC, memo } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  onPressMore: () => void;
  title: string;
};

const SectionHeader: FC<Props> = ({ onPressMore, title }) => {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Heading>{title}</Heading>

      <Button
        _text={{ color: 'brand.300' }}
        colorScheme="black"
        onPress={onPressMore}
        rightIcon={<Icon as={FontAwesome} name="chevron-right" />}
        variant="ghost">
        See more
      </Button>
    </HStack>
  );
};

export default memo(SectionHeader);
