import { createEntityAdapter } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';

/**
 * Pokemon entity adapter.
 */
export const pokemonEntityAdapter = createEntityAdapter<Pokemon>();
