import store from '../../store';
import { getPokemonThunk } from '../../store/slices/pokemon';

describe('Pokémon screen test', () => {
  it('Should be able to fetch the Pokémon list', async () => {
    const result = await store.dispatch(
      getPokemonThunk({ limit: 10, offset: 0 }),
    );

    expect(result.type).toBe('pokemon/getPokemon/fulfilled');

    const state = store.getState();

    expect(state.pokemon.ids.length).toBe(10);
  });
});
