import { Spinner as NBSpinner } from 'native-base';
import React, { memo, type FC } from 'react';

type Props = {
  isLoading: boolean;
};

const Spinner: FC<Props> = ({ isLoading }) => {
  if (isLoading) {
    return <NBSpinner color="red.600" my="4" size="large" />;
  }

  return null;
};

export default memo(Spinner);
