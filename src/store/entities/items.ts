import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Item } from 'pokenode-ts';

/**
 * Items entity adapter.
 */
const itemsEntityAdapter = createEntityAdapter<Item>();

export default itemsEntityAdapter;
