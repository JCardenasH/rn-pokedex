import MockAdapter from 'axios-mock-adapter';

import { api } from '../../utils/api';

describe('Pokémon API test', () => {
  it('Fetch Pokémon names', async () => {
    const mock = new MockAdapter(api);

    mock
      .onGet('/pokemon', {
        params: {
          limit: 10,
          offset: 0,
        },
      })
      .reply(200);
  });
});
