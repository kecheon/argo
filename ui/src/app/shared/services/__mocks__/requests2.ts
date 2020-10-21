const userInfo = {
      "loggedIn": true,
      "username": "devstack",
      "iss": "some_iss",
      "groups": ["devstack1", "devstack2"]
}
const requests = {
  get: jest.fn((url) => Promise.resolve({ data: userInfo }))
};
module.exports = requests;