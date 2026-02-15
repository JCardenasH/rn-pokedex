import type { AxiosRequestConfig } from 'axios';
import type { Item, NamedAPIResourceList } from 'pokenode-ts';

import type { ApiQueryParams } from '../interfaces/common';
import type { IdOrName } from '../interfaces/pokemon';
import { api } from '../utils/api';

/**
 * Items API module.
 */
export class ItemsApi {
  public static getItems(params: ApiQueryParams, config?: AxiosRequestConfig) {
    return api.get<NamedAPIResourceList>('/item', { ...config, params });
  }

  public static getItemInfo(id: IdOrName, config?: AxiosRequestConfig) {
    return api.get<Item>(`/item/${id}`, { ...config });
  }
}
