import type { StaticScreenProps } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { Item } from 'pokenode-ts';
import React, { useCallback, useEffect, type FC } from 'react';
import { FlatList, StyleSheet, type ListRenderItemInfo } from 'react-native';
import Layout from '../components/common/Layout';
import Loader from '../components/common/Loader';
import ItemTile from '../components/items/ItemTile';
import { useAllItems, useItemsState } from '../hooks/items';
import { useAppDispatch } from '../hooks/store';
import { getItemsThunk } from '../store/slices/items';

type Props = StaticScreenProps<undefined>;

/**
 * Items screen component.
 */
const ItemsScreen: FC<Props> = () => {
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

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  /**
   * Flatlist - onEndReached event handler.
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

export default ItemsScreen;
