import type { AxiosRequestConfig } from 'axios';
import type { Ability } from 'pokenode-ts';
import type { IdOrName } from '../interfaces/pokemon';
import api from '../utils/api';

/**
 * Abilities API module.
 */
export default class AbilitiesApi {
  /**
   * Get Ability info endpoint.
   *
   * @param id - Ability ID or Name.
   * @param config - (Optional) Axios request config.
   * @returns - Ability info.
   */
  public static getAbilityInfo(id: IdOrName, config?: AxiosRequestConfig) {
    return api.get<Ability>(`/ability/${id}`, { ...config });
  }
}
