import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  testEnvironment: 'jsdom',
  verbose: true,
  silent: true,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  setupFilesAfterEnv: ['./tests/setup-jest.ts'],
}

export default config