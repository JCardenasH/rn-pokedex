import { selectAllPokemon, selectPokemonById } from '../store/slices/pokemon';
import { useAppSelector } from './store';

/**
 * usePokemonState.
 *
 * Returns the state of the Pokémon reducer.
 */
export const usePokemonState = () => useAppSelector(state => state.pokemon);

/**
 * useAllPokemon hook.
 *
 * Returns all the Pokémon stored in the EntityAdapter.
 */
export const useAllPokemon = () => useAppSelector(selectAllPokemon);

/**
 * useSinglePokemon hook.
 *
 * @param id - Pokémon ID.
 * @returns - Pokémon named resource from list.
 */
export const useSinglePokemon = (id: number) =>
  useAppSelector(state => selectPokemonById(state, id));
