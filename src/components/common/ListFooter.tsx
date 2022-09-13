import { Spinner } from 'native-base';
import React, { memo, type FC } from 'react';

type Props = {
  isLoading: boolean;
};

const ListFooter: FC<Props> = ({ isLoading }) => {
  if (isLoading) {
    return <Spinner color="red.600" my="4" size="large" />;
  }

  return null;
};

export default memo(ListFooter);
