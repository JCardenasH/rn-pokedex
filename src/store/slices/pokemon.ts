import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import pokemonEntityAdapter from '../entities/pokemon';
import { getPokemon } from '../thunks/pokemon';

/**
 * Pokémon slice - State.
 */
export interface PokemonState {
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
 * Pokémon slice.
 */
const slice = createSlice({
  /**
   * Slice name.
   */
  name: 'pokemon',

  /**
   * Initial state.
   */
  initialState: pokemonEntityAdapter.getInitialState<PokemonState>({
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
      // Remove all Pokémon from list
      pokemonEntityAdapter.removeAll(state);
    },
  },

  /**
   * Pokémon slice - Extra reducers.
   *
   * @param builder
   */
  extraReducers: builder => {
    /**
     * Get Pokémon - Pending case
     */
    builder.addCase(getPokemon.pending, state => {
      // Start loading
      state.loading = true;
    });

    /**
     * Get Pokémon - Rejected case
     */
    builder.addCase(getPokemon.rejected, state => {
      // Stop loading
      state.loading = false;
    });

    /**
     * Get Pokémon - Fulfilled case
     */
    builder.addCase(getPokemon.fulfilled, (state, action) => {
      // Insert/update new items
      pokemonEntityAdapter.upsertMany(state, action.payload.data);
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
 * Pokémon Slice - Actions.
 */
export const { removeAll: removeAllPokemon } = slice.actions;

/**
 * Pokémon Slice - Thunks.
 */
export const getPokemonThunk = getPokemon;

/**
 * Pokémon Slice - Selectors
 */
export const { selectAll: selectAllPokemon, selectById: selectPokemonById } =
  pokemonEntityAdapter.getSelectors<RootState>(state => state.pokemon);

export default slice.reducer;
