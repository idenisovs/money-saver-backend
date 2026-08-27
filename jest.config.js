module.exports = {
  globalSetup: './jest.setup.js',
  setupFiles: [],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { noEmitOnError: false } }],
  },
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
};
