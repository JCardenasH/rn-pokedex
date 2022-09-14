import { createEntityAdapter } from '@reduxjs/toolkit';
import { type Pokemon } from 'pokenode-ts';

/**
 * Pokémon entity adapter.
 */
export const pokemonEntityAdapter = createEntityAdapter<Pokemon>();
