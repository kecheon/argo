module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "\\.(gif|jpg|jpeg|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    '\\.(css|less|scss)$': '<rootDir>__mocks__/styleMock.js',
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  // transformIgnorePatterns: [
  //   '/node_modules/argo_ui/*'
  // ]
  transformIgnorePatterns: ['node_modules/(?!(argo-ui)/)'],
  verbose: true,
  silent: false
}
