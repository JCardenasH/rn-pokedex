import { URL } from 'react-native-url-polyfill';
import { PokemonQueryArgs } from '../interfaces/pokemon';

/**
 * Get Pokémon query params from args.
 *
 * Validates if a URL is sent as an argument to the request to get its parameters,
 * otherwise it will return the arguments as they are.
 *
 * @param args - Args.
 */
export const getParamsFromArgs = (args: PokemonQueryArgs) => {
  // Check if args contains a URL param.
  if ('url' in args) {
    // Parse URL
    const url = new URL(args.url);

    return {
      limit: parseInt(url.searchParams.get('limit')!, 10),
      offset: parseInt(url.searchParams.get('offset')!, 10),
    };
  } else {
    return args;
  }
};
