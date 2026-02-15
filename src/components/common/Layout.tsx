import React from 'react';
import { StyleSheet, View } from 'react-native';

import { brand400 } from '@/constants/colors';

/**
 * Layout component.
 *
 * Base layout for screen components.
 *
 * @param props
 */
export const Layout: React.FC<React.PropsWithChildren> = props => (
  <View style={styles.container}>{props.children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: brand400,
    flex: 1,
  },
});
