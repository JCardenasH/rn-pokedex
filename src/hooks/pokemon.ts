import { selectors } from '../store/slices/pokemon';
import { useAppSelector } from './store';

/**
 * useAllPokemon hook.
 *
 * Returns all the Pokémon names stored in the EntityAdapter.
 */
export const useAllPokemon = () => useAppSelector(selectors.selectAll);

/**
 * useSinglePokemon hook.
 *
 * @param id - Pokémon ID.
 * @returns - Pokémon named resource from list.
 */
export const useSinglePokemon = (id: number) =>
  useAppSelector(state => selectors.selectById(state, id));

/**
 * usePokemonState.
 *
 * Returns the state of the Pokémon reducer.
 */
export const usePokemonState = () => useAppSelector(state => state.pokemon);
