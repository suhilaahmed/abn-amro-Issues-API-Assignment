module.exports = {
  watchPlugins: ['jest-runner-eslint/watch-fix'],
  projects: [
    {
      displayName: 'test',
      rootDir: './',
      moduleFileExtensions: ['js', 'json', 'ts'],
      testMatch: ['<rootDir>/test/flows/*test.ts'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
      },
      testEnvironment: 'node'
    },
    {
      rootDir: './',
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/test/**/*.ts', '<rootDir>/lib/**/*.ts'],
      watchPlugins: ['jest-runner-eslint/watch-fix']
    },
  ],
  collectCoverageFrom: ['test/resources/**/*.ts'],
  collectCoverage: false,
  coverageDirectory: './coverage'
};
