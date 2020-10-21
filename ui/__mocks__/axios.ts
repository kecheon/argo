const userInfo = {
    "loggedIn": true,
    "username": "devstack",
    "iss": "some_iss",
    "groups": ["devstack1", "devstack2"]
};

export default {
    get: jest.fn(() => Promise.resolve({data: userInfo}))
};
