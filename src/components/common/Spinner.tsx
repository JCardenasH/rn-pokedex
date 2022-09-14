import { Spinner as NBSpinner } from 'native-base';
import React, { memo, type FC } from 'react';

/**
 * Custom spinner component props.
 */
type Props = {
  isLoading: boolean;
};

/**
 * Custom spinner component.
 *
 * @param props - Component props.
 */
const Spinner: FC<Props> = ({ isLoading }) => {
  if (isLoading) {
    return <NBSpinner color="red.600" my="4" size="large" />;
  }

  return null;
};

export default memo(Spinner);
