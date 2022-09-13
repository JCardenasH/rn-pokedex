import { selectors } from '../store/slices/pokemon';
import { useAppSelector } from './store';

/**
 * useAllPokemon hook.
 *
 * Returns all the Pokemon names stored in the EntityAdapter.
 */
export const useAllPokemon = () => useAppSelector(selectors.selectAll);

/**
 * useSinglePokemon hook.
 *
 * @param name - Pokemon name.
 * @returns - Pokemon named resource from list.
 */
export const useSinglePokemon = (name: string) =>
  useAppSelector(state => selectors.selectById(state, name));

/**
 * usePokemonState.
 *
 * Returns the state of the Pokemon reducer.
 */
export const usePokemonState = () => useAppSelector(state => state.pokemon);
