import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Pokemon } from 'pokenode-ts';

/**
 * Pokémon entity adapter.
 */
const pokemonEntityAdapter = createEntityAdapter<Pokemon>();

export default pokemonEntityAdapter;
