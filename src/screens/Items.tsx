import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList } from 'native-base';
import type { Item } from 'pokenode-ts';
import React, { useCallback, useEffect, type FC } from 'react';
import { StyleSheet, type ListRenderItemInfo } from 'react-native';
import Layout from '../components/common/Layout';
import Spinner from '../components/common/Spinner';
import ItemTile from '../components/items/ItemTile';
import Routes from '../constants/routes';
import { useAllItems, useItemsState } from '../hooks/items';
import { useAppDispatch } from '../hooks/store';
import type { ItemsStackParamList } from '../navigation/ItemsStack';
import { getItemsThunk, removeAllItems } from '../store/slices/items';

/**
 * Items screen navigation prop.
 */
export type ItemsScreenNavigationProp = NativeStackNavigationProp<
  ItemsStackParamList,
  Routes.ItemsScreen
>;

/**
 * Items screen component.
 */
const ItemsScreen: FC = () => {
  /**
   * Navigation prop.
   */
  const navigation = useNavigation<ItemsScreenNavigationProp>();

  /**
   * App dispatch.
   */
  const dispatch = useAppDispatch();

  /**
   * Items state.
   */
  const { loading, next, limit, offset } = useItemsState();

  /**
   * Items list.
   */
  const items = useAllItems();

  /**
   * Navigation - onDidFocus event side effect.
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(removeAllItems());
      dispatch(getItemsThunk({ limit, offset }));
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
    ({ item }: ListRenderItemInfo<Item>) => <ItemTile item={item} />,
    [],
  );

  return (
    <Layout>
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={2}
        data={items}
        ListFooterComponent={<Spinner isLoading={loading} />}
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
