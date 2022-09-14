import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import pokemon from './slices/pokemon';

/**
 * App store.
 */
const store = configureStore({
  // Store middleware
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  // Store reducers
  reducer: {
    // Pokémon list reducer
    pokemon,
  },
});

/**
 * Root state type.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App dispatch type.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * App thunk type.
 */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
