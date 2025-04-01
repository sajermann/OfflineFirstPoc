module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/main.ts',
    '!**/*module.ts',
    '!**/*entity.ts',
    '!**/*model.ts',
    '!**/*enum.ts',
    '!**/type-orm-entities**',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  silent: false,
};
