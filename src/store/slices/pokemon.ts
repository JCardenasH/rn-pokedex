import { createSlice, EntityState } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import { type RootState } from '..';
import { pokemonEntityAdapter } from '../entities/pokemon';
import { getPokemon } from '../thunks/pokemon';

export interface PokemonState {
  loading: boolean;

  data: EntityState<Pokemon>;

  limit: number;

  offset: number;

  next: string | null;
}

const initialState: PokemonState = {
  loading: true,

  data: pokemonEntityAdapter.getInitialState(),

  limit: 10,

  offset: 0,

  next: null,
};

const slice = createSlice({
  name: 'pokemon',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(getPokemon.pending, state => {
      // Start loading
      state.loading = true;
    });

    builder.addCase(getPokemon.rejected, state => {
      state.loading = false;
      state.limit = 10;
      state.offset = 0;
      state.next = null;
    });

    builder.addCase(getPokemon.fulfilled, (state, action) => {
      pokemonEntityAdapter.upsertMany(state.data, action.payload.data);
      state.loading = false;
      state.limit = action.payload.limit;
      state.next = action.payload.next;
      state.offset = action.payload.offset;
    });
  },
});

export const actions = { ...slice.actions, getPokemon };

export const selectors = pokemonEntityAdapter.getSelectors(
  (state: RootState) => state.pokemon.data,
);

export default slice.reducer;
