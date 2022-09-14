import { Box } from 'native-base';
import React, { memo, type FC, type PropsWithChildren } from 'react';

/**
 * Layout component.
 *
 * Base layout for screen components.
 *
 * @param props
 */
const Layout: FC<PropsWithChildren> = props => {
  return (
    <Box bgColor="brand.400" flex={1}>
      {props.children}
    </Box>
  );
};

export default memo(Layout);
