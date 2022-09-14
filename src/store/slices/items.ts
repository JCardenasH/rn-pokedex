import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import itemsEntityAdapter from '../entities/items';
import { getItems } from '../thunks/items';

/**
 * Items slice - State.
 */
export interface ItemsState {
  /**
   * Is loading?
   */
  loading: boolean;

  /**
   * Limit.
   */
  limit: number;

  /**
   * Offset.
   */
  offset: number;

  /**
   * Next URL.
   */
  next: string | null;
}

/**
 * Items slice.
 */
const slice = createSlice({
  /**
   * Slice name.
   */
  name: 'items',

  /**
   * Initial state.
   */
  initialState: itemsEntityAdapter.getInitialState<ItemsState>({
    loading: true,
    limit: 10,
    offset: 0,
    next: null,
  }),

  /**
   * Reducers.
   */
  reducers: {
    /**
     * Remove all items.
     */
    removeAll(state) {
      // Reset current page/offset
      state.offset = 0;
      // Reset count limit
      state.limit = 10;
      // Reset next URL
      state.next = null;
      // Remove all items from list
      itemsEntityAdapter.removeAll(state);
    },
  },

  /**
   * Items slice - Extra reducers.
   *
   * @param builder
   */
  extraReducers: builder => {
    /**
     * Get Items - Pending case
     */
    builder.addCase(getItems.pending, state => {
      // Start loading
      state.loading = true;
    });

    /**
     * Get Items - Rejected case
     */
    builder.addCase(getItems.rejected, state => {
      // Stop loading
      state.loading = false;
    });

    /**
     * Get Items - Fulfilled case
     */
    builder.addCase(getItems.fulfilled, (state, action) => {
      // Insert/update new items
      itemsEntityAdapter.upsertMany(state, action.payload.data);
      // Stop loading
      state.loading = false;
      // Update limit
      state.limit = action.payload.limit;
      // Update next URL
      state.next = action.payload.next;
      // Update current page/offset
      state.offset = action.payload.offset;
    });
  },
});

/**
 * Items slice - Actions.
 */
export const { removeAll: removeAllItems } = slice.actions;

/**
 * Items slice - Thunks.
 */
export const getItemsThunk = getItems;

/**
 * Items slice - Selectors
 */
export const { selectAll: selectAllItems, selectById: selectItemById } =
  itemsEntityAdapter.getSelectors<RootState>(state => state.items);

export default slice.reducer;
