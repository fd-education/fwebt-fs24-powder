import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  testEnvironment: 'jsdom',
  verbose: true,
  silent: false,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['./tests/setup-jest.ts'],
  coveragePathIgnorePatterns: [
    './node_modules',
    '.config.ts',
    './src/fonts/*',
    './src/index.tsx',
  ],
  modulePathIgnorePatterns: ['./tests/cypress-tests']
};

export default config;
