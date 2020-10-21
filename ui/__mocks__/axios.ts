const userInfo = {
    "loggedIn": true,
    "username": "devstack",
    "iss": "some_iss",
    "groups": ["devstack1", "devstack2"]
};

export default {
    get: jest.fn(() => Promise.resolve({data: userInfo})),
    post: jest.fn(() => Promise.resolve({data: {token: 'token_string'}})),
    delete: jest.fn(() => Promise.resolve({data: {message: 'logout ok'}}))
};
