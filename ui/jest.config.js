module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "\\.(gif|jpg|jpeg|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    '\\.(css|less|scss)$': '<rootDir>/styleMock.js'
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    '/node_modules/argo_ui/*'
  ]
}
