import axios from 'axios';

/**
 * Axios instance module.
 */
export const api = axios.create({
  // Base URL
  baseURL: 'https://pokeapi.co/api/v2/',
});
