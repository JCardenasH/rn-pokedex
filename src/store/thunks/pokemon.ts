import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import { RootState } from '..';
import PokemonApi from '../../api/pokemon';
import { PokemonQueryArgs } from '../../interfaces/pokemon';
import { getParamsFromArgs } from '../../utils/url';
import { PokemonState } from '../slices/pokemon';

/**
 * Get Pokemon async thunk - Return type.
 */
type Returns = Pick<PokemonState, 'limit' | 'offset' | 'next'> & {
  data: Pokemon[];
};

/**
 * Get Pokemon async thunk - Args.
 */
type Args = PokemonQueryArgs;

/**
 * Get Pokemon async thunk - APIConfig.
 */
type Config = { state: RootState };

/**
 * Get Pokemon async thunk.
 */
export const getPokemon = createAsyncThunk<Returns, Args, Config>(
  'pokemon/getPokemon',
  async (args, { rejectWithValue, signal }) => {
    // Get request params from args
    const { limit, offset } = getParamsFromArgs(args);

    try {
      // Get Pokemon list
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
