import axios from 'axios';

describe('API access', () => {
  const endpoint = 'http://183.111.177.141/identity/v3';
  it('get unscoped token by username and password', async (done) => {
      const data = JSON.stringify({auth: {identity: {methods: ['password'], password: {user: {name: 'admin', domain: {id: 'default'}, password: 'devstack'}}}}});

      const config = {
          method: 'post',
          url: 'http://183.111.177.141/identity/v3/auth/tokens',
          headers: {
              'Content-Type': 'application/json'
          },
          data
      };

      const response = await axios(config);
      expect(response.status).toEqual(201)

  });
});