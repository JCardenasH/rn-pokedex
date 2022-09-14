import { selectAllItems } from '../store/slices/items';
import { useAppSelector } from './store';

/**
 * useItemsState.
 *
 * Returns the state of the Items reducer.
 */
export const useItemsState = () => useAppSelector(state => state.items);

/**
 * useAllItems hook.
 *
 * Returns all the items stored in the EntityAdapter.
 */
export const useAllItems = () => useAppSelector(selectAllItems);
