import type { StaticScreenProps } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { Item } from 'pokenode-ts';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, type ListRenderItemInfo } from 'react-native';

import { Layout, Loader } from '@/components/common';
import { ItemTile } from '@/components/items';
import { useAllItems, useAppDispatch, useItemsState } from '@/hooks';
import { getItemsThunk } from '@/store/slices/items';

export type ItemsScreenProps = StaticScreenProps<undefined>;

/**
 * Items screen component.
 */
export const ItemsScreen: React.FC<ItemsScreenProps> = () => {
  /**
   * Navigation prop.
   */
  const navigation = useNavigation();

  /**
   * App dispatch.
   */
  const dispatch = useAppDispatch();

  /**
   * Items state.
   */
  const { loading, next, offset } = useItemsState();

  /**
   * Items list.
   */
  const items = useAllItems();

  /**
   * Navigation - onDidFocus event side effect.
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(getItemsThunk({ limit: 5, offset }));
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  /**
   * FlatList - onEndReached event handler.
   */
  const onEndReached = useCallback(() => {
    // Validates if there's a next URL stored in state
    if (next) {
      // Fetch next Item page
      dispatch(getItemsThunk({ url: next }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  /**
   * Render item.
   */
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Item>) => <ItemTile item={info.item} />,
    [],
  );

  return (
    <Layout>
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={2}
        data={items}
        ListFooterComponent={<Loader isLoading={loading} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    paddingVertical: 5,
  },
});
