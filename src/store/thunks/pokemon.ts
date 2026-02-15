import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Pokemon } from 'pokenode-ts';

import { PokemonApi } from '@/api/pokemon';
import type { ApiQueryArgs } from '@/interfaces/pokemon';
import { getParamsFromArgs } from '@/utils/url';

import type { RootState } from '..';
import type { PokemonState } from '../slices/pokemon';

/**
 * Get Pokémon async thunk - Return type.
 */
type Returns = Pick<PokemonState, 'limit' | 'offset' | 'next'> & {
  data: Pokemon[];
};

/**
 * Get Pokémon async thunk - Args.
 */
type Args = ApiQueryArgs;

/**
 * Get Pokémon async thunk - APIConfig.
 */
type Config = { state: RootState };

/**
 * Get Pokémon async thunk.
 */
export const getPokemon = createAsyncThunk<Returns, Args, Config>(
  'pokemon/getPokemon',
  async (args, { rejectWithValue, signal }) => {
    // Get request params from args
    const { limit, offset } = getParamsFromArgs(args);

    try {
      // Get Pokémon list
      const { data: names } = await PokemonApi.getPokemonList(
        { limit, offset },
        { signal },
      );

      const pokemon: Pokemon[] = [];

      for (const item of names.results) {
        const response = await PokemonApi.getPokemonInfo(item.name);

        pokemon.push(response.data);
      }

      return {
        data: pokemon,
        next: names.next,
        limit,
        offset,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
