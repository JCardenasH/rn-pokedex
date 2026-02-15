import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import type { AppDispatch, RootState } from '@/store';

/**
 * useAppDispatch hook.
 *
 * Extends Redux useDispatch hook with RootState typings.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * useAppSelector hook.
 *
 * Extends Redux useSelector hook with RootState typings.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
