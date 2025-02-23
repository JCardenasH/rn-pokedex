import { Spinner } from 'native-base';
import React, { memo, type FC } from 'react';

/**
 * Loader component props.
 */
type Props = {
  isLoading: boolean;
};

/**
 * Loader component.
 *
 * @param props - Component props.
 */
const Loader: FC<Props> = ({ isLoading }) => {
  if (isLoading) {
    return <Spinner color="red.600" my="4" size="large" />;
  }

  return null;
};

export default memo(Loader);
