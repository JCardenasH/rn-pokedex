import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Item } from 'pokenode-ts';

import { ItemsApi } from '@/api/items';
import type { ApiQueryArgs } from '@/interfaces/pokemon';
import { getParamsFromArgs } from '@/utils/url';

import type { RootState } from '..';
import type { ItemsState } from '../slices/items';

/**
 * Get Items async thunk - Return type.
 */
type Returns = Pick<ItemsState, 'limit' | 'offset' | 'next'> & {
  data: Item[];
};

/**
 * Get Items async thunk - Args.
 */
type Args = ApiQueryArgs;

/**
 * Get Items async thunk - APIConfig.
 */
type Config = { state: RootState };

/**
 * Get Items async thunk.
 */
export const getItems = createAsyncThunk<Returns, Args, Config>(
  'items/getItems',
  async (args, { rejectWithValue, signal }) => {
    // Get request params from args
    const { limit, offset } = getParamsFromArgs(args);

    try {
      // Get Items list
      const { data: names } = await ItemsApi.getItems(
        { limit, offset },
        { signal },
      );

      const items: Item[] = [];

      for (const item of names.results) {
        const response = await ItemsApi.getItemInfo(item.name);

        items.push(response.data);
      }

      return {
        data: items,
        next: names.next,
        limit,
        offset,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
