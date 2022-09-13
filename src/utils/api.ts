import axios from 'axios';

/**
 * Axios instance module.
 */
const api = axios.create({
  // Base URL
  baseURL: 'https://pokeapi.co/api/v2/',
});

export default api;
