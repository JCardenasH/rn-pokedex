import { ApiQueryParams, ApiQueryUrl } from './common';

export type PokemonQueryArgs = ApiQueryParams | ApiQueryUrl;

export type IdOrName = number | string;
