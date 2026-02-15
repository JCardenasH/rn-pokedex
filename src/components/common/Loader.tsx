import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

/**
 * Loader component props.
 */
export interface LoaderProps {
  isLoading: boolean;
}

/**
 * Loader component.
 *
 * @param props - Component props.
 */
export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <ActivityIndicator color="#dc2626" size="large" style={styles.spinner} />
    );
  }

  return null;
};

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 16,
  },
});
