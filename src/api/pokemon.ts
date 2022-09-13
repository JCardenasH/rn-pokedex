import { AxiosRequestConfig } from 'axios';
import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';
import { ApiQueryParams } from '../interfaces/common';
import { IdOrName } from '../interfaces/pokemon';
import api from '../utils/api';

/**
 * Pokemon API module.
 */
export default class PokemonApi {
  /**
   * Get pokemon list endpoint.
   *
   * @param params - Query params.
   * @param config - (Optional) Axios request config.
   *
   * @returns - Pokemon named resource list.
   */
  public static getPokemonList(
    params: ApiQueryParams,
    config?: AxiosRequestConfig,
  ) {
    return api.get<NamedAPIResourceList>('/pokemon', { ...config, params });
  }

  /**
   * Get pokemon info endpoint.
   *
   * @param idOrName - Pokemon ID or Name.
   * @param config - (Optional) Axios request config.
   * @returns - Pokemon info.
   */
  public static getPokemonInfo(
    idOrName: IdOrName,
    config?: AxiosRequestConfig,
  ) {
    return api.get<Pokemon>(`/pokemon/${idOrName}`, { ...config });
  }
}
